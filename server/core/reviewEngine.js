// import {runPipeline} from "./pipeline.js"

import { ApiError } from "../utils/ApiError"

const review = async (sourceCode) => {

    try {
        if (!sourceCode || typeof sourceCode !== "string") {
        throw new ApiError(404, "Invalid source code provided")
    }

    if (sourceCode.trim().length === 0) {
        throw new ApiError(404, "Empty source code provided")
    }

    // const report = => Call Pipeline 
    return report

    } catch (error) {
        throw new ApiError(400, error.message || "Review Failed")
    }
}

export { review }