import { AppProps } from "next/app";
import { FC } from "react";
import Header from "components/Header";
import "../styles/index.css";
import { ConfigProvider } from "@/helpers/ConfigContext";

const App: FC<AppProps> = ({ Component, pageProps }) => (
    <ConfigProvider>
        <Header />
        <div id="content">
            <Component {...pageProps} />
        </div>
    </ConfigProvider>
);

export default App;
