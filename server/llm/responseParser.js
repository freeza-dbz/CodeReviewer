import { ApiError } from "../utils/ApiError.js"
import { logger } from "../utils/logger.js"
 

const parseResponse = function (response) {

    try {
        if (!response) {
            throw new ApiError(404, "No response provided by the LLM")

            await logger("No response provided by the LLM")
        }

        let content = ""

        if (response.output_text) {
            content = response.output_text;
        } else if (
            response.output && response.output.length > 0 &&
            response.output[0].content && response.output[0].content.length > 0
        ) {
            content = response.output[0].content[0].text;
        } else {
            throw new ApiError(400, "Invalid response format from the LLM")
            await logger("Invalid response format from the LLM")
        }

        const issues = [];

        const categories = [
            "security",
            "performance",
            "bugs",
            "maintainability"
        ];

        for (const category of categories) {
            const findings = parsed[category] || [];

            for (const finding of findings) {
                issues.push({
                    category,
                    severity: finding.severity || "medium",
                    title: finding.title || "",
                    description: finding.description || ""
                });
            }
        }

        return {
            issues,
            suggestions: parsed.recommendations || [],
            summary: parsed.summary || ""
        };
    } catch (error) {
        throw new ApiError(400, "Error occured during parsing ", error.message)
        await logger(`Parsing failed with error: ${error.message}`)
    }

}

export { parseResponse }