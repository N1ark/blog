import { Article, getArticles } from "@/helpers/ArticleHelper";
import { GetStaticProps } from "next";
import { FC } from "react";

type HomeProps = {
    articles: Article[];
};

const Home: FC<HomeProps> = ({ articles }) => {
    return (
        <>
            <h1>Home</h1>
            {articles.map((article) => (
                <a key={article.id} className="article-block" href={`/article/${article.id}`}>
                    <h2>
                        {article.title}
                        <span className="h2-sub">{article.date}</span>
                    </h2>
                    <p>{article.summary}</p>
                </a>
            ))}
        </>
    );
};

const getStaticProps: GetStaticProps<HomeProps> = ({ params }) => {
    const articles = getArticles();
    return {
        props: {
            articles,
        },
    };
};

export default Home;
export { getStaticProps };
