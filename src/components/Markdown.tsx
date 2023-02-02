import { useConfig } from "@/helpers/ConfigContext";
import { FC } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark, materialLight } from "react-syntax-highlighter/dist/cjs/styles/prism";

type MarkdownProps = {
    markdown: string;
};

const Markdown: FC<MarkdownProps> = ({ markdown }) => {
    const [{ theme }] = useConfig();
    const codeStyle = theme === "light" ? materialLight : materialDark;
    return (
        <ReactMarkdown
            className="markup"
            components={{
                code: ({ node, inline, className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                        <SyntaxHighlighter
                            children={String(children).replace(/\n$/, "")}
                            style={codeStyle as any}
                            language={match[1]}
                            PreTag="div"
                            className="code-block"
                            {...props}
                        />
                    ) : (
                        <code className={className} {...props}>
                            {children}
                        </code>
                    );
                },
            }}
            children={markdown}
        />
    );
};

export default Markdown;
