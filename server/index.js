import fs, { read, readFile } from "fs"
import path from "path"

import { ApiError } from "./utils/ApiError.js";
import { ApiResponse } from "./utils/ApiResponse.js";
import { review } from "./core/reviewEngine.js";


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
            // sourceCode = await => Read source code
        } else {
            // sourceCode = => Read pasted code 
        }

        const reviewResult = await review(sourceCode)

        // const report = => Format report 

        throw new ApiResponse(200, "Review Successful", report)

        process.exit(0);

    } catch (error) {
        throw new ApiError(400, error.message || "Review Failed")
        process.exit(1)
    }
}