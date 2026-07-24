import path from "path";
import { ApiError } from "../utils/ApiError.js";

const IGNORED_FOLDERS = new Set([
    "node_modules",
    ".git",
    "dist",
    "build",
    "coverage",
    ".next",
    "out",
    ".cache"
]);

const IGNORED_FILES = new Set([
    "package-lock.json",
    "yarn.lock",
    "pnpm-lock.yaml"
]);

const shouldIgnore = function (filePath) {

    try {
        const normalizedPath = path.normalize(filePath);

        const parts = normalizedPath.split(path.sep);

        for (const part of parts) {
            if (IGNORED_FOLDERS.has(part)) {
                return true;
            }
        }

        const fileName = path.basename(normalizedPath);

        if (IGNORED_FILES.has(fileName)) {
            return true;
        }

        return false;
    } catch (error) {
        throw new ApiError(500, "Error checking if file should be ignored", error.message); 
    }

}

export { shouldIgnore };