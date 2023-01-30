import { FunctionalComponent } from "preact";
import { useEffect } from "preact/hooks";
import { route } from "preact-router";

type RedirectProps = {
    to: string;
};

const Redirect: FunctionalComponent<RedirectProps> = ({ to }) => {
    useEffect(() => {
        route(to, true);
    }, []);
    return null;
};

export default Redirect;
