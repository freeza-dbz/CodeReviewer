import { ApiError } from "../utils/ApiError.js";
import { detectLanguage } from "./language/detectLanguage.js"
import { buildMetadata } from "./metaBuilder.js";
import { classifyFile } from "./fileClassifier.js";



const scanProject = async (filePaths) => {

    try {
        const project = {
            files: [],
            languages: new Set(),
            statistics: {}
        }

        for (const filePath of filePaths) {
            const metadata = await buildMetadata(filePath) 

            const language = detectLanguage(
                metadata.content,
                metadata.path
            )

            const category = classifyFile(metadata.path);

            project.files.push({
                path: metadata.path,
                name: metadata.name,
                extension: metadata.extension,
                size: metadata.size,
                content: metadata.content,
                language,
                category
            });

            if (language !== "unknown") {
                project.languages.add(language);
            }
        }

        // project.statistics = buildProjectSummary(project.files); => Call summary here

        project.languages = [...project.languages];

        return project;
    } catch (error) {
        throw new ApiError(500, "Error scanning project", error.message);
    }
}

export { scanProject };