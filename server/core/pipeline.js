import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { detectLanguage } from "../language/detectLanguage.js";
import { staticAnalyzer } from "../analysis/staticAnalyzer.js";
import { buildPrompt } from "../prompt/promptBuilder.js";
import { getLLMReview } from "../llm/llmClient.js";
import { parseResponse } from "../llm/responseParser.js";
import { formatResult } from "../report/formatter.js";
import { logger } from "../utils/logger.js";


const runPipeline = async (sourceCode) => {

    try {
        await logger("Detecting programming language....")
        
        const language = await detectLanguage(sourceCode);

        await logger(`Language detection successfull, Detected language : ${language}`)

        await logger("Running static analysis....")
        
       const staticAnalysis = await staticAnalyzer(sourceCode, language);

       await logger("Building LLM prompt....")

        const prompt = buildPrompt({ 
            sourceCode,
            language,
            staticAnalysis
        })

        await logger("Sending request to LLM....")

        const llmResponse = await getLLMReview(prompt)

        await logger("Parsing LLM response....")

        const parsedReview = await parseResponse(llmResponse)

        await logger("Formatting report....") 

        const formatReport = formatResult({     
            language,
            staticAnalysis,
            parsedReview    
        });

        await logger("Review Successful")

        return formatReport;

    } catch (error) {
        await logger(`Review Failed with error: ${error.message}`)
        throw new ApiError(400, error.message || "Review Failed")
    }

}

export { runPipeline }