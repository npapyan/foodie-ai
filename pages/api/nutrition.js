// pages/api/nutrition.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    // Set the `responseMimeType` to output JSON
    generationConfig: { responseMimeType: "application/json" }
});

async function getFileContent(filePath) {
    return await fs.readFile(filePath, 'utf8');
}

function fileToGenerativePart(buffer, mimeType) {
    return {
        inlineData: {
            data: buffer.toString("base64"),
            mimeType
        },
    };
}

export default async function handler(req, res) {
    const requestId = uuidv4();
    const requestStartTime = new Date().toISOString();
    console.log(`[${requestId}] [${requestStartTime}] Incoming request: ${req.method} ${req.url}`);

    // Log request headers for session tracking
    const sourceIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];
    console.log(`[${requestId}] Source IP: ${sourceIP}`);
    console.log(`[${requestId}] User-Agent: ${userAgent}`);

    if (req.method === 'POST') {
        try {
            let { image } = req.body;
            const filePath = path.join(process.cwd(), 'pages', 'api', 'nutritionPrompt.txt');
            const promptConfiguration = await getFileContent(filePath);

            if (!image) {
                return res.status(400).json({ message: "No image data provided." });
            }

            image = image.replace(/^data:image\/\w+;base64,/, "");
            const decodedImage = Buffer.from(image, 'base64');

            const data = await sharp(decodedImage)
                .flatten({ background: { r: 255, g: 255, b: 255 } })
                .jpeg()
                .toBuffer();

            const imageParts = [
                fileToGenerativePart(data, "image/jpeg"),
            ];

            const result = await model.generateContent([promptConfiguration, ...imageParts]);
            const text = result.response.text();
            console.log("Generated Response Text:", text);
            let parsedJson;
            try {
                parsedJson = JSON.parse(text);
            } catch (parseError) {
                console.error("Error parsing JSON:", parseError);
                return res.status(500).json({ message: "Invalid JSON format received from Generative AI." });
            }

            res.status(200).json(parsedJson);
        } catch (error) {
            console.error("Error processing request:", error);
            res.status(500).json({ message: "Error processing your request" });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '3mb', // Default body sizeLimit for Next.js is 1mb. Increasing for use in iOS App.
        },
    },
};
