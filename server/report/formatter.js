import { ApiError } from "../utils/ApiError.js";
import { logger } from "../utils/logger.js";

const formatResult = function ({ language, staticAnalysis, parsedReview }) {

    try {
        let output = "";
 
        output += "\n";
        output += "====================================================\n";
        output += "               AI CODE REVIEW REPORT\n";
        output += "====================================================\n\n";


        output += `Language : ${language}\n\n`;


        output += "Static Analysis\n";
        output += "---------------\n";
        output += `Total Lines      : ${staticAnalysis.totalLines}\n`;
        output += `Blank Lines      : ${staticAnalysis.blankLines}\n`;
        output += `Comment Lines    : ${staticAnalysis.commentLines}\n`;
        output += `Imports          : ${staticAnalysis.imports}\n`;
        output += `Functions        : ${staticAnalysis.functions}\n`;
        output += `Classes          : ${staticAnalysis.classes}\n`;
        output += `Variables        : ${staticAnalysis.variables}\n`;
        output += `Loops            : ${staticAnalysis.loops}\n`;
        output += `Return Statements: ${staticAnalysis.returns}\n`;
        output += `Try/Catch Blocks : ${staticAnalysis.tryCatch}\n\n`;


        output += "AI Findings\n";
        output += "-----------\n";

        if (!parsedReview.issues || parsedReview.issues.length === 0) {

            output += "No issues detected.\n\n";

        } else {

            parsedReview.issues.forEach((issue, index) => {

                output += `Issue ${index + 1}\n`;
                output += `Severity    : ${issue.severity.toUpperCase()}\n`;
                output += `Category    : ${issue.category}\n`;
                output += `Title       : ${issue.title}\n`;
                output += `Description : ${issue.description}\n`;

                if (issue.suggestion) {
                    output += `Suggestion  : ${issue.suggestion}\n`;
                }

                output += "\n";

            });

        }


        output += "Recommendations\n";
        output += "---------------\n";

        if (
            parsedReview.suggestions &&
            parsedReview.suggestions.length > 0
        ) {

            parsedReview.suggestions.forEach((suggestion, index) => {
                output += `${index + 1}. ${suggestion}\n`;
            });

        } else {

            output += "No recommendations available.\n";

        }

        output += "\n";


        output += "Summary\n";
        output += "-------\n";
        output += `${parsedReview.summary || "No summary available."}\n`;

        output += "\n";
        output += "====================================================\n";

        return output;
    } catch (error) {
        throw new ApiError(400, error.message || "Report formatting failed")

        await logger(`Report formatting failed with error: ${error.message}`)
    }

}

export { formatResult }