class Helper {
    static sanitizeHtmlAllowStrong = (text: string) => {
        text = text || "";
        text = text.replace(/\<br\>/g, '\n');
        return text;
    }

    static fileExtFromString = (filePath: string) => {
        let filePathExploded = filePath.split(".");
        return filePathExploded[filePathExploded.length - 1];
    }

    static fileNameFromString = (filePath: string) => {
        let filePathExploded = filePath.split("/");
        return filePathExploded[filePathExploded.length - 1];
    }

    static limitString = (txt: string, limit = 0) => {
        let resultString = txt;
        if (txt && limit > 0 && txt.length > limit) {
            return `${txt.substring(0, limit)} ...`;
        }

        return resultString;
    }
}

export default Helper;