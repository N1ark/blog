import { Sun, Moon } from "lucide-preact";
import { useConfig } from "@/helpers/ConfigContext";
import { FunctionalComponent } from "preact";
import { Link } from "preact-router";
import "./Header.css";

type HeaderButtonProps = {
    to: string;
    text: string;
};

const HeaderButton: FunctionalComponent<HeaderButtonProps> = ({ text, to }) => (
    <div class="header-button">
        <Link href={to}>{text}</Link>
    </div>
);

const ThemeButton: FunctionalComponent = () => {
    const [{ theme }, setConfig] = useConfig();
    return (
        <div class="header-button">
            <button onClick={() => setConfig({ theme: theme === "light" ? "dark" : "light" })}>
                {theme === "light" ? <Moon /> : <Sun />}
            </button>
        </div>
    );
};

const Header: FunctionalComponent = () => (
    <nav id="header">
        <HeaderButton to="/" text="Home" />
        <div class="w-spacer" />
        <ThemeButton />
    </nav>
);

export default Header;
