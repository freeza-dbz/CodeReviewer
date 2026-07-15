import { appendFile } from "fs/promises";

const LOG_FILE = "review.log";

const logger = async(message, options = {}) => {
    const {
        level = "INFO",
        writeToFile = false
    } = options;


    const timestamp = new Date().toISOString();


    const logEntry = `[${timestamp}] [${level}] ${message}`;


    console.log(logEntry);


    if (writeToFile) {
        try {
            await appendFile(LOG_FILE, logEntry + "\n", "utf8");
        } catch (error) {
            console.error(
                `[${timestamp}] [ERROR] Failed to write log file: ${error.message}`
            );
        }
    }
}

export { logger }