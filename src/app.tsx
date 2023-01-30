import { FunctionalComponent } from "preact";
import Router from "preact-router";
import Header from "./components/Header";
import Home from "./pages/Home";

const Routes = () => (
    <Router>
        <Home path="/" />
    </Router>
);

const App: FunctionalComponent = () => (
    <>
        <Header />
        <Routes />
    </>
);

export default App;
