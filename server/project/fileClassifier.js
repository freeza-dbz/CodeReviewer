import path from "path";
import { ApiError } from "../utils/ApiError.js";


const SOURCE_EXTENSIONS = new Set([
    ".js", ".jsx",
    ".ts", ".tsx",
    ".java",
    ".py",
    ".cpp", ".cc", ".cxx",
    ".c",
    ".cs",
    ".go",
    ".php",
    ".rb",
    ".rs",
    ".swift",
    ".kt",
    ".kts"
]);

const CONFIG_EXTENSIONS = new Set([
    ".json",
    ".yaml",
    ".yml",
    ".toml",
    ".ini",
    ".env"
]);

const DOCUMENTATION_EXTENSIONS = new Set([
    ".md",
    ".txt",
    ".rst"
]);

const ASSET_EXTENSIONS = new Set([
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".svg",
    ".ico",
    ".webp",
    ".bmp",
    ".mp3",
    ".wav",
    ".mp4",
    ".mov",
    ".pdf"
]);

const classifyFile = function (filePath) {

    try {
        const fileName = path.basename(filePath).toLowerCase();
        const extension = path.extname(fileName).toLowerCase();

        // Source Code

        if (SOURCE_EXTENSIONS.has(extension)) {
            return "source";
        }

        // Configuration

        if (
            CONFIG_EXTENSIONS.has(extension) ||
            fileName === "package.json" ||
            fileName === "tsconfig.json" ||
            fileName === "vite.config.js" ||
            fileName === "webpack.config.js" ||
            fileName === "eslint.config.js"
        ) {
            return "configuration";
        }

        // Documentation

        if (
            DOCUMENTATION_EXTENSIONS.has(extension) ||
            fileName.startsWith("readme") ||
            fileName.startsWith("license") ||
            fileName.startsWith("changelog")
        ) {
            return "documentation";
        }

        // Assets

        if (ASSET_EXTENSIONS.has(extension)) {
            return "assets";
        }

        // Test Files

        if (
            fileName.includes(".test.") ||
            fileName.includes(".spec.") ||
            fileName.includes("__tests__")
        ) {
            return "test";
        }

        // Build Files

        if (
            fileName.includes("dist") ||
            fileName.includes("build") ||
            fileName.includes(".min.")
        ) {
            return "build";
        }

        return "unknown";
    } catch (error) {
        throw new ApiError(500, "Error classifying file", error.message);
    }
}

export { classifyFile }