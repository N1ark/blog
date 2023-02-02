import { readdirSync, readFileSync } from "fs";
import parseMD from "parse-md";
import { join } from "path";

export type Article = {
    id: string;
    date: string;
    title: string;
    summary: string;
};

export type ArticleContent = Article & {
    content: string;
};

const articleDirectory = join(process.cwd(), "articles");

function getArticle(id: string, full?: false): Article;
function getArticle(id: string, full: true): ArticleContent;

function getArticle(id: string, full: boolean = false) {
    const path = join(articleDirectory, `${id}.md`);
    const rawContent = readFileSync(path, "utf8");
    const { content, metadata } = parseMD(rawContent);
    const metadataObj = metadata as Record<string, string | undefined>;
    const article: Article = {
        id,
        date: (metadataObj.date as Date | undefined)?.toLocaleDateString() ?? "?",
        title: metadataObj.title || "?",
        summary: metadataObj.summary || "?",
    };
    return full ? { ...article, content } : article;
}

function getArticles(): Article[] {
    return readdirSync(articleDirectory)
        .filter((file) => file.endsWith(".md"))
        .map((file) => file.replace(/\.md$/, ""))
        .map((id) => getArticle(id));
}

export { getArticle, getArticles };
