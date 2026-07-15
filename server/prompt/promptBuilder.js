import { SYSTEM_PROMPT } from "./systemPrompt.js";
import { ApiError } from "../utils/ApiError.js";
import { logger } from "../utils/logger.js";



const buildPrompt = ({ sourceCode, language, staticAnalysis }) => {

    try {
        let prompt = "";

        prompt += `${SYSTEM_PROMPT}\n\n`;

        prompt += `Programming Language:\n${language}\n\n`;

        prompt += "Static Analysis Summary:\n";
        prompt += `- Total Lines: ${staticAnalysis.totalLines}\n`;
        prompt += `- Blank Lines: ${staticAnalysis.blankLines}\n`;
        prompt += `- Comment Lines: ${staticAnalysis.commentLines}\n`;
        prompt += `- Imports: ${staticAnalysis.imports}\n`;
        prompt += `- Functions: ${staticAnalysis.functions}\n`;
        prompt += `- Classes: ${staticAnalysis.classes}\n`;
        prompt += `- Variables: ${staticAnalysis.variables}\n`;
        prompt += `- Loops: ${staticAnalysis.loops}\n`;
        prompt += `- Return Statements: ${staticAnalysis.returns}\n`;
        prompt += `- Try/Catch Blocks: ${staticAnalysis.tryCatch}\n\n`;

        prompt += "Source Code:\n";
        prompt += "```";
        prompt += `${language}\n`;
        prompt += sourceCode;
        prompt += "\n```\n\n";

        return prompt;
    } catch (error) {
        throw new ApiError(400, error.message || "Prompt building failed")
        await logger(`Prompt building failed with error: ${error.message}`)
    }

}

export { buildPrompt }