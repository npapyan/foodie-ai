// pages/api/upload.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';
const API_KEY= "";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(API_KEY);

// For text-only input, use the gemini-pro model
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

function bufferToGenerativePart(buffer, mimeType) {
    return {
        inlineData: {
            data: buffer,
            mimeType: mimeType
        },
    };
}

async function getFileContent(path) {
    return await fs.readFile(path, 'utf8')
}

function fileToGenerativePart(path, mimeType) {
    return {
        inlineData: {
            data: path.toString("base64"),
            mimeType
        },
    };
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            let image = req.body.image;
            console.log("Received image data");

            const filePath = path.join(process.cwd(), 'pages', 'api' ,'nutritionPrompt.txt'); // Adjust 'file.txt' to your actual file name
            const promptConfiguration = await getFileContent(filePath);

            // Check if image data is provided
            if (!image) {
                return res.status(400).json({ message: "No image data provided." });
            }

            image = image.replace(/^data:image\/\w+;base64,/, "");

            // Decode the base64 image
            const decodedImage = Buffer.from(image, 'base64');

                // Convert the image and save it as a JPEG file
            const data = await sharp(decodedImage)
                .flatten({ background: { r: 255, g: 255, b: 255 } }) // Add white background
                .jpeg() // Convert to JPEG
                .toBuffer(); // Convert to buffer

            const buffer = Buffer.from(image).toString('base64');

            const prompt = "You will receive an image with nutrition fact data and a list of ingredients. Return in a clean json format a deep analysis of the nutritional facts along with an analysis of each individual ingredient. The analysis should include whether the item is healthy or not and why.";

            const imageParts = [
                fileToGenerativePart(data, "image/png"),
            ];

            const result = await model.generateContent([promptConfiguration, ...imageParts]);

            // Generate content using the combined prompt and image data
            const response = await result.response;
            const text = response.text();
            console.log(text);

            // Respond with the generated content
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





