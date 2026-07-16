import { promises as fs } from "fs";
import { logger } from "../utils/logger.js"; 
import { ApiError } from "../utils/ApiError.js"; 

const readFileContent = async (filePath) => {

    try {

        await fs.access(filePath, fs.constants.F_OK)

    } catch (error) {

        throw new ApiError(404, "File not found")

    }

    try {
        const fileBuffer = await fs.readFile(filePath)

        await logger(`Reading File ${filePath}`)

        const sourceCode = fileBuffer.toString()

        await logger(`File read successfully`)

        return sourceCode

    } catch (error) {

        await logger(`File not found: ${filePath}`, {
            level: "ERROR",
            writeToFile: true
        });

        throw new ApiError(500, "Error reading file")

    }
}

export { readFileContent }