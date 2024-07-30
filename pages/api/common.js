// pages/api/common.js
import { promises as fs } from 'fs';
import sharp from 'sharp';

export async function getFileContent(filePath) {
    return await fs.readFile(filePath, 'utf8');
}

export function fileToGenerativePart(buffer, mimeType) {
    return {
        inlineData: {
            data: buffer.toString("base64"),
            mimeType
        },
    };
}

export async function processImage(image) {
    image = image.replace(/^data:image\/\w+;base64,/, "");
    const decodedImage = Buffer.from(image, 'base64');

    const data = await sharp(decodedImage)
        .flatten({ background: { r: 255, g: 255, b: 255 } })
        .jpeg()
        .toBuffer();

    return data;
}
