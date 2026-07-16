import {runPipeline} from "./pipeline.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { logger } from "../utils/logger.js" 


const review = async (sourceCode) => {

    await logger("Review engine starting....")

    try {
        if (!sourceCode || typeof sourceCode !== "string") {
            await logger("Invalid source code provided")
            throw new ApiError(404, "Invalid source code provided")
        }

        if (sourceCode.trim().length === 0) {
            await logger("Empty source code provided")
            throw new ApiError(404, "Empty source code provided")
        }

        const report = await runPipeline(sourceCode)

        await logger("Review engine stopped....")

        return new ApiResponse(200, report, "Review Successful")

    } catch (error) {
        // If it's already an ApiResponse, pass it through
        if (error instanceof ApiResponse) {
            return error;
        }
        await logger(`Review Failed with error: ${error.message}`)
        throw new ApiError(400, error.message || "Review Failed")
    }
}

export { review }