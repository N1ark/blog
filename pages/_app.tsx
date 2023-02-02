import { AppProps } from "next/app";
import { FC } from "react";
import Header from "components/Header";
import "../styles/index.css";
import { ConfigProvider } from "@/helpers/ConfigContext";
import Head from "next/head";

const App: FC<AppProps> = ({ Component, pageProps }) => (
    <>
        <Head>
            <title>Blog</title>
        </Head>
        <ConfigProvider>
            <Header />
            <div id="content">
                <Component {...pageProps} />
            </div>
        </ConfigProvider>
    </>
);

export default App;
