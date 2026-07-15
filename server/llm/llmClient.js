import OpenAi, { APIError } from "openai";
import { ApiError } from "./utils/ApiError.js";
import { ApiResponse } from "./utils/ApiResponse.js";
import { logger } from "./utils/logger.js";


const client = new OpenAi({
    apikey: process.env.OPENAI_API_KEY
})

const MAX_RETRIES = 3;

const getLLMReview = async (prompt) => {

    try {
        let lastError;

        for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
            try {
                const response = await client.response.create({
                    model: "gpt-5.5",
                    input: prompt
                })
                return response;
            } catch (error) {
                lastError = error;

                if (attemp === MAX_RETRIES) {
                    break;
                }

                await logger(`Attempt ${attempt} failed with error: ${error.message}. Retrying in 1 second...}`)

                await delay(1000 * attempt);
            }
        }
    } catch (error) {
        throw new ApiError(400, "LLM request failed", error.message)
        
        await logger(`LLM request failed with error: ${error.message}`)
    }
}

function delay(ms){
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export { getLLMReview }