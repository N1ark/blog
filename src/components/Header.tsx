import { Sun, Moon } from "lucide-react";
import { useConfig } from "@/helpers/ConfigContext";
import { FC } from "react";
import Link from "next/link";

type HeaderButtonProps = {
    to: string;
    text: string;
};

const HeaderButton: FC<HeaderButtonProps> = ({ text, to }) => (
    <Link className="header-button" href={to}>
        {text}
    </Link>
);

const ThemeButton: FC = () => {
    const [{ theme }, setConfig] = useConfig();
    return (
        <div className="header-button">
            <button
                onClick={() => {
                    console.log("toggle theme ", setConfig);
                    setConfig({ theme: theme === "light" ? "dark" : "light" });
                }}
            >
                {theme === "light" ? <Moon /> : <Sun />}
            </button>
        </div>
    );
};

const Header: FC = () => (
    <nav id="header">
        <HeaderButton to="/" text="Home" />
        <div className="w-spacer" />
        <ThemeButton />
    </nav>
);

export default Header;
