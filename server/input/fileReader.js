import { promises as fs } from "fs";

const readFileContent = async (filePath) => {

    try {

        await fs.access(filePath, fs.constants.F_OK)

    } catch (error) {

        throw new ApiError(404, "File not found")

    }

    try {
        const fileBuffer = await fs.readFile(filePath)

        const sourceCode = fileBuffer.toString()

        return sourceCode

    } catch (error) {

        throw new ApiError(500, "Error reading file")

    }
}

export { readFileContent }