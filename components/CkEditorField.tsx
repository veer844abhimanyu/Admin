"use client";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Essentials,
  Paragraph,
  Bold,
  Italic,
  Underline,
  List,
  Link,
  BlockQuote,
  Heading,
} from "ckeditor5";

type CkEditorFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function CkEditorField({
  value,
  onChange,
}: CkEditorFieldProps) {
  return (
    <div className="rounded border border-slate-300 bg-white">
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
            List,
            Link,
            BlockQuote,
            Heading,
          ],
          toolbar: [
            "undo",
            "redo",
            "|",
            "heading",
            "|",
            "bold",
            "italic",
            "underline",
            "|",
            "bulletedList",
            "numberedList",
            "|",
            "link",
            "blockQuote",
          ],
          initialData: value,
        }}
        onChange={(_, editor) => {
          onChange(editor.getData());
        }}
      />
    </div>
  );
}