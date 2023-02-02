import Markdown from "@/components/Markdown";
import { ArticleContent, getArticle, getArticles } from "@/helpers/ArticleHelper";
import { GetStaticPaths, GetStaticProps } from "next";
import { FC } from "react";

type ArticleProps = {
    article: ArticleContent;
};

const ArticlePage: FC<ArticleProps> = ({ article }) => {
    return (
        <>
            <h1>
                {article.title} <span className="h1-sub">{article.date}</span>
            </h1>
            <Markdown markdown={article.content} />
        </>
    );
};

const getStaticProps: GetStaticProps<ArticleProps> = ({ params }) => {
    const articleId = params?.articleId;
    if (typeof articleId !== "string") {
        return { notFound: true };
    }
    const article = getArticle(articleId, true);
    return {
        props: {
            article,
        },
    };
};

const getStaticPaths: GetStaticPaths = () => {
    const articles = getArticles();
    const ids = articles.map((article) => article.id);
    return {
        paths: ids.map((articleId) => ({ params: { articleId } })),
        fallback: false,
    };
};

export default ArticlePage;
export { getStaticPaths, getStaticProps };
