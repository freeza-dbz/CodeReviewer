import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse.js";



const runPipeline = async (sourceCode) => {

    try {
        // const language =  => Call Detect language here

        // const staticAnalyzer = await  => Call static analysis here

        // const prompt = buildPrompt({  => Build prompt
        //     sourceCode,
        //     language,
        //     staticAnalysis
        // })

        // const llmResponse = await => Call LLM review

        // const parsedReview = => Call parse reviewer

        // const formatResult = formatResult({    => Call result formatter  
        //     language,
        //     staticAnalysis,
        //     parsedReview    
        // });

        throw new ApiResponse(200, "Review Successful", formatResult)

    } catch (error) {
        throw new ApiError(400, error.message || "Review Failed")
    }

}

export { runPipeline }