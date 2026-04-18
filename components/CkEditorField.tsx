// "use client";

// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import {
//   ClassicEditor,
//   Essentials,
//   Paragraph,
//   Bold,
//   Italic,
//   Underline,
//   List,
//   Link,
//   BlockQuote,
//   Heading,
// } from "ckeditor5";

// type CkEditorFieldProps = {
//   value: string;
//   onChange: (value: string) => void;
// };

// export default function CkEditorField({
//   value,
//   onChange,
// }: CkEditorFieldProps) {
//   return (
//     <div className="rounded border border-slate-300 bg-white">
//       <CKEditor
//         editor={ClassicEditor}
//         config={{
//           licenseKey: "GPL",
//           plugins: [
//             Essentials,
//             Paragraph,
//             Bold,
//             Italic,
//             Underline,
//             List,
//             Link,
//             BlockQuote,
//             Heading,
//           ],
//           toolbar: [
//             "undo",
//             "redo",
//             "|",
//             "heading",
//             "|",
//             "bold",
//             "italic",
//             "underline",
//             "|",
//             "bulletedList",
//             "numberedList",
//             "|",
//             "link",
//             "blockQuote",
//           ],
//           initialData: value,
//         }}
//         onChange={(_, editor) => {
//           onChange(editor.getData());
//         }}
//       />
//     </div>
//   );
// }

"use client";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Alignment,
  Autoformat,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Subscript,
  Superscript,
  RemoveFormat,
  Essentials,
  FindAndReplace,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  Heading,
  Highlight,
  HorizontalLine,
  Base64UploadAdapter,
  Image,
  ImageCaption,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Link,
  List,
  ListProperties,
  TodoList,
  MediaEmbed,
  Paragraph,
  PasteFromOffice,
  SpecialCharacters,
  SpecialCharactersEssentials,
  Table,
  TableToolbar,
  TableProperties,
  TableCellProperties,
  TableCaption,
  TableColumnResize,
  TextTransformation,
  BlockQuote,
  CodeBlock,
  LinkImage,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";

type CkEditorFieldProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function CkEditorField({
  value,
  onChange,
  placeholder = "Write here...",
}: CkEditorFieldProps) {
  return (
    <div className="ck-editor-container rounded border border-slate-300 bg-white">
      <CKEditor
        editor={ClassicEditor}
        config={{
          licenseKey: "GPL",
          plugins: [
            Essentials,
            Paragraph,
            Bold,
            Italic,
            Underline,
            Strikethrough,
            Code,
            Subscript,
            Superscript,
            RemoveFormat,
            Alignment,
            Autoformat,
            FindAndReplace,
            FontBackgroundColor,
            FontColor,
            FontFamily,
            FontSize,
            Heading,
            Highlight,
            HorizontalLine,
            Image,
            ImageCaption,
            ImageStyle,
            ImageToolbar,
            ImageUpload,
            Base64UploadAdapter,
            Indent,
            IndentBlock,
            Link,
            List,
            ListProperties,
            TodoList,
            MediaEmbed,
            PasteFromOffice,
            SpecialCharacters,
            SpecialCharactersEssentials,
            Table,
            TableToolbar,
            TableProperties,
            TableCellProperties,
            TableCaption,
            TableColumnResize,
            TextTransformation,
            BlockQuote,
            CodeBlock,
            LinkImage,
          ],
          toolbar: {
            items: [
              "undo",
              "redo",
              "|",
              "heading",
              "|",
              "fontSize",
              "fontFamily",
              "fontColor",
              "fontBackgroundColor",
              "|",
              "bold",
              "italic",
              "underline",
              "strikethrough",
              "code",
              "removeFormat",
              "|",
              "horizontalLine",
              "link",
              "uploadImage",
              "mediaEmbed",
              "insertTable",
              "blockQuote",
              "codeBlock",
              "specialCharacters",
              "|",
              "alignment",
              "|",
              "bulletedList",
              "numberedList",
              "todoList",
              "outdent",
              "indent",
              "|",
              "findAndReplace",
              "highlight",
              "subscript",
              "superscript",
            ],
            shouldNotGroupWhenFull: true,
          },
          image: {
            toolbar: [
              "imageStyle:inline",
              "imageStyle:block",
              "imageStyle:side",
              "|",
              "toggleImageCaption",
              "imageTextAlternative",
              "|",
              "linkImage",
            ],
          },
          table: {
            contentToolbar: [
              "tableColumn",
              "tableRow",
              "mergeTableCells",
              "|",
              "tableProperties",
              "tableCellProperties",
              "|",
              "tableCaption",
            ],
          },
          placeholder,
          initialData: value || "",
        }}
        onChange={(_, editor) => {
          onChange(editor.getData());
        }}
      />
      <style jsx global>{`
        .ck-editor__editable {
          min-height: 300px;
        }
        .ck.ck-editor__main > .ck-editor__editable:not(.ck-focused) {
          border-color: transparent;
        }
      `}</style>
    </div>
  );
}
