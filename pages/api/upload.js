// pages/api/upload.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
                fileToGenerativePart(data, "image/png"),
            ];

            const result = await model.generateContent([promptConfiguration, ...imageParts]);

            const response = await result.response;
            const text = response.text();
            console.log(text);

            res.status(200).json({ result: response });
        } catch (error) {
            console.error("Error processing request:", error);
            res.status(500).json({ message: "Error processing your request" });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
