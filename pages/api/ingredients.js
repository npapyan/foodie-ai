// pages/api/ingredients.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import path from 'path';
import { getFileContent, fileToGenerativePart, processImage } from './common';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: { responseMimeType: "application/json" }
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            let { image } = req.body;
            const filePath = path.join(process.cwd(), 'pages', 'api', 'ingredientsPrompt.txt');
            const promptConfiguration = await getFileContent(filePath);

            if (!image) {
                return res.status(400).json({ message: "No image data provided." });
            }

            const data = await processImage(image);
            const imageParts = [fileToGenerativePart(data, "image/png")];

            const result = await model.generateContent([promptConfiguration, ...imageParts]);
            const response = await result.response;
            const text = await response.json();

            // Assuming the response contains a field 'ingredients' with the list
            const ingredients = text.ingredients;
            console.log(ingredients);

            res.status(200).json({ ingredients });
        } catch (error) {
            console.error("Error processing request:", error);
            res.status(500).json({ message: "Error processing your request" });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
