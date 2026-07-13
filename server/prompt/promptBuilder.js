import { SYSTEM_PROMPT } from "./systemPrompt.js";

const buildPrompt = ({ sourceCode, language, staticAnalysis }) => {

    try {
        let prompt = "";

        // Append System Prompt
        prompt += `${SYSTEM_PROMPT}\n\n`;

        // Append Language
        prompt += `Programming Language:\n${language}\n\n`;

        // Append Static Analysis Summary
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

        // Append Source Code
        prompt += "Source Code:\n";
        prompt += "```";
        prompt += `${language}\n`;
        prompt += sourceCode;
        prompt += "\n```\n\n";

        return prompt;
    } catch (error) {
        throw new ApiError(400, error.message || "Prompt building failed")
    }

}

export { buildPrompt }