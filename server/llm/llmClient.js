import { GoogleGenerativeAI } from "@google/generative-ai";
import { ApiError } from "../utils/ApiError.js";
import { logger } from "../utils/logger.js"; 




const MAX_RETRIES = 3;

const getLLMReview = async (prompt, userApiKey, modelName) => {

    if (!userApiKey || !modelName) {
        throw new ApiError(400, "API key and Preferred AI Model must be configured in Settings to perform code reviews.");
    }

    try {
        let lastError;

        const key = userApiKey;
        const modelToUse = modelName;
        const genAI = new GoogleGenerativeAI(key);
        const model = genAI.getGenerativeModel({ model: modelToUse });

        for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
            try {
                const result = await model.generateContent(prompt);
                const response = result.response;
                const text = response.text();
                return text;
            } catch (error) {
                lastError = error;

                if (attempt === MAX_RETRIES) {
                    break;
                }

                await logger(`Attempt ${attempt} failed with error: ${error.message}. Retrying in 1 second...`)

                await delay(1000 * attempt);
            }
        }
        throw lastError;
    } catch (error) {
        await logger(`LLM request failed with error: ${error.message}`)
        throw new ApiError(400, "LLM request failed: " + error.message)
    }
}

function delay(ms){
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export { getLLMReview }