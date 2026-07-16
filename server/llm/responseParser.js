import { ApiError } from "../utils/ApiError.js"
import { logger } from "../utils/logger.js"
 

const parseResponse = async function (responseText) {

    try {
        if (!responseText) {
            await logger("No response provided by the LLM")
            throw new ApiError(404, "No response provided by the LLM")
        }

        // responseText is now a plain string from Gemini
        let cleanedContent = responseText.trim();

        // Strip markdown code fences if present
        if (cleanedContent.startsWith("```")) {
            cleanedContent = cleanedContent.replace(/^```[a-zA-Z]*\n?/, "").replace(/```$/, "").trim();
        }

        let parsed;
        try {
            parsed = JSON.parse(cleanedContent);
        } catch (e) {
            await logger(`Failed to parse LLM response JSON: ${e.message}`)
            throw new ApiError(400, "Invalid JSON structure in LLM response: " + e.message)
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
        await logger(`Parsing failed with error: ${error.message}`)
        throw new ApiError(400, "Error occured during parsing: " + error.message)
    }

}

export { parseResponse }