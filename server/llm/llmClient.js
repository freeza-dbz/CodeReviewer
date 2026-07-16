import { GoogleGenerativeAI } from "@google/generative-ai";
import { ApiError } from "../utils/ApiError.js";
import { logger } from "../utils/logger.js"; 


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });

const MAX_RETRIES = 3;

const getLLMReview = async (prompt) => {

    try {
        let lastError;

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