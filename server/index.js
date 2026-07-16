import fs, { read, readFile } from "fs";
import path from "path";
import "dotenv/config";
import readline from "readline";

import { ApiError } from "./utils/ApiError.js";
import { ApiResponse } from "./utils/ApiResponse.js";
import { review } from "./core/reviewEngine.js";
import { readFileContent } from "./input/fileReader.js";
import { readPastedCode } from "./input/pastedCodeReader.js";
import { logger } from "./utils/logger.js";


await logger("AI Code review started");

async function promptUser(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function main() {
    try {
        const cliInput = process.argv[2];
        if (!cliInput) console.log("Please provide a file path or paste code.");

        let sourceCode;
        if (cliInput) {
            if (fs.existsSync(cliInput) && fs.statSync(cliInput).isFile()) {
                const filePath = path.resolve(cliInput);
                sourceCode = await readFileContent(filePath);
            } else {
                // treat cliInput as raw code
                sourceCode = cliInput;
            }
        } else {
            const userInput = await promptUser("Enter file path (or press Enter to paste code): ");
            if (userInput) {
                if (fs.existsSync(userInput) && fs.statSync(userInput).isFile()) {
                    const filePath = path.resolve(userInput);
                    sourceCode = await readFileContent(filePath);
                } else {
                    sourceCode = userInput; // treat as code
                }
            } else {
                // No path provided, read from stdin for pasted code
                sourceCode = await readPastedCode();
            }
        }

        await logger(`Input received`);

        const reviewResult = await review(sourceCode);

        console.log(reviewResult.data);

        await logger("Review completed successfully.");

        process.exit(0);
    } catch (error) {
        console.error("Error:", error.message || "Review Failed");
        process.exit(1);
    }
}

main();