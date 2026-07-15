import { ApiError } from "../utils/ApiError";
import { logger } from "../utils/logger";

const staticAnalyzer = function (sourceCode, language = "") {

    try {
        const lines = sourceCode.split("\n");

        const analysis = {
            language,
            totalLines: lines.length,
            blankLines: 0,
            commentLines: 0,
            imports: 0,
            functions: 0,
            classes: 0,
            variables: 0,
            loops: 0,
            returns: 0,
            tryCatch: 0,
        }

        for (const line of lines) {

            const current = line.trim();

            // Blank line
            if (current === "") {
                analysis.blankLines++;
                continue;
            }

            // Comments
            if (
                current.startsWith("//") || current.startsWith("#") ||
                current.startsWith("/*") || current.startsWith("*")
            ) {
                analysis.commentLines++;
            }

            // Imports
            if (
                current.startsWith("import ") || current.startsWith("from ") ||
                current.startsWith("#include") || current.startsWith("using ") || current.startsWith("require(")
            ) {
                analysis.imports++;
            }

            // Functions
            if (
                current.includes("function ") || current.includes("def ") ||
                current.includes("func ") || current.includes("=>") ||
                current.includes("(") && current.includes(")") && current.includes("{")
            ) {
                analysis.functions++;
            }

            // Classes
            if (current.includes("class ")) {
                analysis.classes++;
            }

            // Variables
            if (
                current.includes("const ") || current.includes("let ") ||
                current.includes("var ") || current.includes("=")
            ) {
                analysis.variables++;
            }

            // Loops
            if (
                current.includes("for ") || current.includes("while ") || current.includes("foreach")
            ) {
                analysis.loops++;
            }

            // Return statements
            if (current.includes("return ")) {
                analysis.returns++;
            }

            // Try / Catch
            if (
                current.includes("try") || current.includes("catch")
            ) {
                analysis.tryCatch++;
            }
        }

        
        return analysis;
    } catch (error) {
        throw new ApiError(400, error.message || "Static analysis failed")

        await logger(`Static analysis failed with error: ${error.message}`)
    }

}

export { staticAnalyzer }