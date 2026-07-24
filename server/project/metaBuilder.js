import { promises as fs } from "fs";
import path from "path";

const buildMetadata = async function (filePath) {

    const stats = await fs.stat(filePath);

    const content = await fs.readFile(filePath, "utf8");

    return {

        path: filePath,

        name: path.basename(filePath),

        extension: path.extname(filePath).toLowerCase(),

        size: stats.size,

        createdAt: stats.birthtime,

        modifiedAt: stats.mtime,

        content

    };

};

export { buildMetadata };