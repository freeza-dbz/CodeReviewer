import path from "path";

const buildProjectSummary = function (files) {

    const summary = {

        totalFiles: files.length,

        totalDirectories: 0,

        totalSize: 0,

        dominantLanguage: "unknown",

        largestFolder: null,

        languages: {},

        extensions: {},

        categories: {

            source: 0,
            configuration: 0,
            documentation: 0,
            assets: 0,
            test: 0,
            build: 0,
            unknown: 0

        }

    };

    const directories = new Set();

    const folderStats = {};

    // Loop Files

    for (const file of files) {

        // Total Size

        summary.totalSize += file.size || 0;

        // Languages

        if (file.language && file.language !== "unknown") {

            summary.languages[file.language] =
                (summary.languages[file.language] || 0) + 1;

        }

        // Extensions

        if (file.extension) {

            summary.extensions[file.extension] =
                (summary.extensions[file.extension] || 0) + 1;

        }

        // Categories

        if (summary.categories[file.category] !== undefined) {

            summary.categories[file.category]++;

        }
        else {

            summary.categories.unknown++;

        }

        // Directories

        const directory = path.dirname(file.path);

        directories.add(directory);

        folderStats[directory] =
            (folderStats[directory] || 0) + 1;

    }

    summary.totalDirectories = directories.size;

    // Dominant Language
  
    let maxLanguageFiles = 0;

    for (const language in summary.languages) {

        if (summary.languages[language] > maxLanguageFiles) {

            maxLanguageFiles = summary.languages[language];

            summary.dominantLanguage = language;

        }

    }

    // Largest Folder

    let maxFolderFiles = 0;

    for (const folder in folderStats) {

        if (folderStats[folder] > maxFolderFiles) {

            maxFolderFiles = folderStats[folder];

            summary.largestFolder = folder;

        }

    }

    return summary;

};

export { buildProjectSummary };