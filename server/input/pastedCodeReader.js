import { logger } from "../utils/logger.js";

initialInput = ""

export function readPastedCode()   {
    return new Promise((resolve, reject) => {

        let sourceCode = initialInput;

        process.stdin.setEncoding("utf8");

        if(sourceCode.trim().length > 0){
            return resolve(sourceCode);
        }

        console.log("Paste your source code below.");
        console.log("Press Ctrl+D (Linux/macOS) or Ctrl+Z then Enter (Windows) when finished.\n");

        process.stdin.on("data", (data) => {
            sourceCode += data;
        })

        process.stdin.on("end", () => {

            sourceCode = sourceCode.trim();

            if(!sourceCode){
                return reject(new Error("No source code provided"));
            }

            resolve(sourceCode);
        })

        await logger(`Source Code received ${sourceCode}`)

        process.stdin.on("error", (err) => {
            reject(err);
        })
    

        process.stdin.resume();

    });
}