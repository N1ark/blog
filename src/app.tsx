import { FunctionalComponent } from "preact";
import Router from "preact-router";
import Header from "./components/Header";
import ArticlePage from "./pages/ArticlePage";
import Error404 from "./pages/Error404";
import Home from "./pages/Home";

const Routes = () => (
    <Router>
        <Home path="/" />
        <ArticlePage path="/article/:id" />
        <Error404 default />
    </Router>
);

const App: FunctionalComponent = () => (
    <>
        <Header />
        <div id="content">
            <Routes />
        </div>
    </>
);

export default App;
