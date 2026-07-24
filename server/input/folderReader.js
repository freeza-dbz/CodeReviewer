import { promises as fs } from "fs"
import path from "path"
import { ApiError } from "../utils/ApiError.js"

const readFolder = async (folderPath) => {
    try {
        const stats = await fs.stat(folderPath)

        if (!stats.isDirectory()) {
            throw new ApiError(400, "Invalid folder path");
        }

    } catch (error) {
        throw new ApiError(400, "Invalid folder path");
    }

    const files = []

    await traverseFiles(folderPath, files)

    return files;

}

const traverseFiles = async (folderPath, files) => {
    const items = await fs.readdir(folderPath, {
        withFileTypes: true
    });

    for (const item of items) {

        const fullPath = path.join(folderPath, item.name);

        if (item.isDirectory()) {

            await traverseFiles(fullPath, files);

        } else {

            files.push(fullPath);

        }
    }
}

export { readFolder }