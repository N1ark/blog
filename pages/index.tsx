import { Article, getArticles } from "@/helpers/ArticleHelper";
import { useState, useEffect, FC } from "react";

const Home: FC = () => {
    const [articles, setArticles] = useState<Article[] | null>(null);

    useEffect(() => {
        getArticles().then(setArticles);
    }, []);

    return (
        <>
            <h1>Home</h1>
            {articles === null ? (
                <p>Loading...</p>
            ) : (
                articles.map((article) => (
                    <a
                        key={article.id}
                        className="article-block"
                        href={`/article/${article.id}`}
                    >
                        <h2>
                            {article.title}
                            <span className="h2-sub">{article.date}</span>
                        </h2>
                        <p>{article.summary}</p>
                    </a>
                ))
            )}
        </>
    );
};

export default Home;
