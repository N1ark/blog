import Markdown from "@/components/Markdown";
import { Article, getArticle, getArticleContent } from "@/helpers/ArticleHelper";
import { FunctionalComponent } from "preact";
import { route } from "preact-router";
import { useEffect, useState } from "preact/hooks";

type ArticlePageProps = {
    id?: string;
};

const ArticlePage: FunctionalComponent<ArticlePageProps> = ({ id = "" }) => {
    const [article, setArticle] = useState<Article | null>(null);
    const [articleContent, setArticleContent] = useState<string | null>(null);

    useEffect(() => {
        if (id === "") return;

        getArticle(id)
            .then(setArticle)
            .catch(() => route("/", true));
        getArticleContent(id)
            .then(setArticleContent)
            .catch(() => route("/", true));
    }, [id]);

    return (
        <>
            {articleContent === null || article === null ? (
                <p>Loading...</p>
            ) : (
                <>
                    <h1>
                        {article.title} <span class="h1-sub">{article.date}</span>
                    </h1>
                    <Markdown markdown={articleContent} />
                </>
            )}
        </>
    );
};

export default ArticlePage;
