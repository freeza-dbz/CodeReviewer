import fs, { read, readFile } from "fs"
import path from "path"
import "dotenv/config";

import { ApiError } from "./utils/ApiError.js";
import { ApiResponse } from "./utils/ApiResponse.js";
import { review } from "./core/reviewEngine.js";
import { readFileContent } from "./input/fileReader.js";
import { readPastedCode } from "./input/pastedCodeReader.js";
import { logger } from "./utils/logger.js";


await logger("AI Code review started")

async function main() {
    try {

        const input = process.argv[2];

        if (!input) {
            ApiError(400, "No input provided")
            process.exit(1);
        }

        let sourceCode

        if (fs.existsSync(input) && fs.statSync(input).isFile()) {
            const filePath = path.resolve(input);
            sourceCode = await readFileContent(filePath)
        } else {
            sourceCode = readPastedCode(input) 
        }

        await logger(`Input received`);

        const reviewResult = await review(sourceCode)

        throw new ApiResponse(200, "Review Successful", report)

        await logger("Review completed successfully.");
        
        process.exit(0);

    } catch (error) {
        throw new ApiError(400, error.message || "Review Failed")
        process.exit(1)
    }
}