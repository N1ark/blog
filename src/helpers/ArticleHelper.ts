export type Article = {
    id: string;
    date: string;
    title: string;
    summary: string;
};

export async function getArticles(): Promise<Article[]> {
    const response = await fetch("/article-list.json");
    const articles = await response.json();
    return articles as Article[];
}

export async function getArticle(id: string): Promise<Article> {
    const articles = await getArticles();
    const article = articles.find((article) => article.id === id);
    if (!article) {
        throw new Error(`Article with id '${id}' not found`);
    }
    return article;
}

export async function getArticleContent(id: string): Promise<string> {
    const response = await fetch(`/articles/${id}.md`);
    const article = await response.text();
    return article;
}
