import fs, { read, readFile } from "fs"
import path from "path"

import { ApiError } from "./utils/ApiError";

async function main(){
    try {
        
        const input = process.argv[2];

        if(!input){
            ApiError(400, "No input provided")
            process.exit(1);
        }

        let sourceCode

        if(fs.existsSync(input) && fs.statSync(input).isFile()){
            const filePath = path.resolve(input);
            // sourceCode = await => Read source code
        }else{
            // sourceCode = => Read pasted code 
        }

        // const reviewResult = await => Review Engine code

        // const report = => Format report 

        console.log(report)

        process.exit(0);

    } catch (error) {
        ApiError(400, error.message || "Review Failed")
        process.exit(1)
    }
}