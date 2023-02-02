import Markdown from "@/components/Markdown";
import { Article, getArticle, getArticleContent } from "@/helpers/ArticleHelper";
import { useRouter } from "next/router";
import { FC, useState, useEffect } from "react";
import { redirect } from "react-router-dom";

const ArticlePage: FC = () => {
    const router = useRouter();
    const { articleId } = router.query as { articleId: string };

    const [article, setArticle] = useState<Article | null>(null);
    const [articleContent, setArticleContent] = useState<string | null>(null);

    useEffect(() => {
        if (articleId === "") return;

        getArticle(articleId)
            .then(setArticle)
            .catch(() => redirect("/"));
        getArticleContent(articleId)
            .then(setArticleContent)
            .catch(() => redirect("/"));
    }, [articleId]);

    console.log(articleId);

    return (
        <>
            {articleContent === null || article === null ? (
                <p>Loading...</p>
            ) : (
                <>
                    <h1>
                        {article.title} <span className="h1-sub">{article.date}</span>
                    </h1>
                    <Markdown markdown={articleContent} />
                </>
            )}
        </>
    );
};

export default ArticlePage;
