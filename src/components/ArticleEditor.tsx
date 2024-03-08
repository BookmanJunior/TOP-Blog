import {
  MDXEditor,
  ListsToggle,
  toolbarPlugin,
  BlockTypeSelect,
  CreateLink,
  InsertCodeBlock,
  codeBlockPlugin,
  sandpackPlugin,
  codeMirrorPlugin,
  UndoRedo,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  headingsPlugin,
  markdownShortcutPlugin,
  BoldItalicUnderlineToggles,
  quotePlugin,
  InsertImage,
  imagePlugin,
} from "@mdxeditor/editor";

type ArticleEditorProps = {
  setArticleContent: (arg0: string) => void;
};

export default function ArticleEditor({
  setArticleContent,
}: ArticleEditorProps) {
  return (
    <MDXEditor
      markdown="# Hello world"
      onChange={(content) => setArticleContent(content)}
      plugins={[
        listsPlugin(),
        headingsPlugin(),
        linkDialogPlugin(),
        linkPlugin(),
        sandpackPlugin(),
        markdownShortcutPlugin(),
        quotePlugin(),
        imagePlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
        codeMirrorPlugin({
          codeBlockLanguages: { js: "JavaScript", css: "CSS" },
        }),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <UndoRedo />
              <BoldItalicUnderlineToggles />
              <BlockTypeSelect />
              <ListsToggle />
              <CreateLink />
              <InsertCodeBlock />
              <InsertImage />
            </>
          ),
        }),
      ]}
    />
  );
}
