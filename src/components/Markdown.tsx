import { FC } from "react";
import ReactMarkdown from "react-markdown";

type MarkdownProps = {
    markdown: string;
};

const Markdown: FC<MarkdownProps> = ({ markdown }) => (
    <ReactMarkdown

    // markedOpts={{
    //     langPrefix: "hljs language-",
    //     highlight: (code, lang) => {
    //         const language = hljs.getLanguage(lang) ? lang : "plaintext";
    //         return hljs.highlight(code, { language }).value;
    //     },
    // }}
    >
        {markdown}
    </ReactMarkdown>
);

export default Markdown;
