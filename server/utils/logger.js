import { appendFile } from "fs/promises";
import { existsSync } from "fs";

const LOG_FILE = "review.log";
let sessionSeparatorWritten = false;

const logger = async (message, options = {}) => {
    const {
        level = "INFO",
    } = options;

    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] [${level}] ${message}`;

    // Always write to log file
    try {
        // If the file already exists and we haven't written a separator yet for this session
        if (!sessionSeparatorWritten && existsSync(LOG_FILE)) {
            await appendFile(LOG_FILE, "\n" + "#".repeat(40) + "\n", "utf8");
        }
        sessionSeparatorWritten = true;

        await appendFile(LOG_FILE, logEntry + "\n", "utf8");
    } catch (error) {
        console.error(
            `[${timestamp}] [ERROR] Failed to write log file: ${error.message}`
        );
    }
}

export { logger }