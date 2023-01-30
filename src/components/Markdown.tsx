import { FunctionalComponent, Component } from "preact";
import Markup from "preact-markup";
import { marked } from "marked";
import MarkdownUntyped from "preact-markdown";
import hljs from "highlight.js";

type PropsOf<T> = T extends Component<infer P> ? P : never;

const MarkdownTyped = MarkdownUntyped as FunctionalComponent<{
    markdown: string;
    markupOpts?: PropsOf<Markup>;
    markedOpts?: marked.MarkedOptions;
}>;

type MarkdownProps = {
    markdown: string;
};

const Markdown: FunctionalComponent<MarkdownProps> = ({ markdown }) => (
    <MarkdownTyped
        markdown={markdown}
        markedOpts={{
            langPrefix: "hljs language-",
            highlight: (code, lang) => {
                const language = hljs.getLanguage(lang) ? lang : "plaintext";
                return hljs.highlight(code, { language }).value;
            },
        }}
    />
);

export default Markdown;
