import {runPipeline} from "./pipeline.js"
import { ApiError } from "../utils/ApiError"
import { logger } from "../utils/logger.js"


const review = async (sourceCode) => {

    await logger("Review engine starting....")

    try {
        if (!sourceCode || typeof sourceCode !== "string") {
        throw new ApiError(404, "Invalid source code provided")
        await logger("Invalid source code provided")
    }

    if (sourceCode.trim().length === 0) {
        throw new ApiError(404, "Empty source code provided")
        await logger("Empty source code provided")
    }

    const report = await runPipeline(sourceCode)
 
    throw new ApiResponse(200, "Review Successful", report)

    await logger("Review engine stopped....")

    } catch (error) {
        throw new ApiError(400, error.message || "Review Failed")
        await logger(`Review Failed with error: ${error.message}`)
    }
}

export { review }