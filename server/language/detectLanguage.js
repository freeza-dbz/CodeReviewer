const LANGUAGE_KEYWORDS = {
    javascript: [
        "function", "const", "let", "var", "=>", "export", "import", "require(", "module.exports", "console.log",
        "window", "document", "Promise", "async", "await", "prototype", "class", "new", "typeof", "undefined", "JSON.parse"
    ],
    python: [
        "def", "lambda", "yield", "async", "await", "self", "elif", "None", "True", "False", "pass", "nonlocal", "global",
        "with", "import", "from", "except", "try", "finally", "match", "case", "__name__", "__init__", "print("
    ],
    java: [
        "public static void main", "System.out.println", "package", "import java", "extends", "implements", "interface",
        "static", "class", "new", "throws", "catch", "finally", "synchronized", "final", "private", "protected", "public",
        "this", "super"
    ],
    c: [
        "#include", "stdio.h", "stdlib.h", "malloc", "calloc", "free", "printf", "scanf", "gets", "fgets", "FILE", "fopen",
        "fclose", "typedef", "struct", "union", "enum", "NULL", "sizeof"
    ],
    cpp: [
        "iostream", "cout", "cin", "std::", "namespace", "using namespace", "vector", "string", "map", "unordered_map", "set",
        "template", "typename", "auto", "nullptr", "class", "new", "delete", "friend", "virtual", "override", "unique_ptr", "shared_ptr"
    ],
    csharp: [
        "using System", "Console.WriteLine", "namespace", "class", "public", "private", "protected", "internal", "get", "set",
        "delegate", "event", "async", "await", "var", "string", "List<", "Dictionary<", "LINQ", "foreach", "using ("
    ],
    go: [
        "package main", "func", "go", "defer", "chan", "select", "range", "map", "struct", "interface{}", "make", "append",
        "fmt.Println", "import", ":=", "nil"
    ],
    php: [
        "<?php", "$", "echo", "print", "->", "=>", "namespace", "use", "require_once", "include_once", "isset", "empty", "array",
        "function", "class", "public", "private", "protected", "self::", "parent::"
    ],
    ruby: [
        "def", "end", "puts", "gets", "require", "module", "class", "attr_accessor", "attr_reader", "attr_writer", "unless", "elsif",
        "yield", "begin", "rescue", "ensure", "include", "extend", "self", "@", "@@", ":"
    ]
}

const EXTENSION_MAP = {
    js: "javascript", mjs: "javascript", cjs: "javascript", py: "python", java: "java", cpp: "cpp",
    cxx: "cpp", c: "c", c: "cpp", cxx: "cpp", c: "c", cs: "csharp", go: "go", php: "php", rb: "ruby"
}

import { ApiError } from "../utils/ApiError.js"
import { logger } from "../utils/logger.js"


const detectLanguage = (sourceCode, filePath = "") => {

    try {
        if (filePath) {
            const extentsion = filePath.split('.').pop();
            if (EXTENSION_MAP[extentsion]) {
                return EXTENSION_MAP[extentsion];
            }
        } else {
            throw new ApiError(404, "No file found")
            await logger("No file found")
        }

        const scores = {};

        const lowerCode = sourceCode.toLowerCase();

        for (const language in LANGUAGE_KEYWORDS) {
            scores[language] = 0;

            for (const keyword of LANGUAGE_KEYWORDS[language]) {
                if (lowerCode.includes(keyword.toLowerCase())) {
                    scores[language]++;
                }
            }
        }

        let detectLanguage = "unknown"
        let highestScore = 0;

        for (const language in scores) {
            if (scores[language] > highestScore) {
                highestScore = scores[language];
                detectLanguage = language;
            }
        }

        return detectLanguage;

    } catch (error) {
        throw new ApiError(404, "Error occured while detecting language", error.message)
        await logger(`Language detection failed with error : ${error.message}`)
    }

}

export { detectLanguage }