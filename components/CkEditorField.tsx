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

import { useEffect, useState } from "react";

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
  const [isClient, setIsClient] = useState(false);
  const [CKEditor, setCKEditor] = useState<any>(null);
  const [ClassicEditor, setClassicEditor] = useState<any>(null);

  useEffect(() => {
    setIsClient(true);
    
    // Dynamically import CKEditor only on client side
    Promise.all([
      import("@ckeditor/ckeditor5-react").then((mod) => mod.CKEditor),
      import("ckeditor5").then((mod) => mod.ClassicEditor),
    ]).then(([editor, classic]) => {
      setCKEditor(() => editor);
      setClassicEditor(() => classic);
    });
  }, []);

  if (!isClient || !CKEditor || !ClassicEditor) {
    return (
      <div className="rounded border border-slate-300 bg-white p-4 text-slate-500">
        Loading editor...
      </div>
    );
  }

  return (
    <div className="ck-editor-container rounded border border-slate-300 bg-white">
      <CKEditor
        editor={ClassicEditor}
        data={value}
        config={{
          licenseType: "open-source",
          toolbar: [
            "undo",
            "redo",
            "|",
            "heading",
            "|",
            "bold",
            "italic",
            "underline",
            "link",
            "|",
            "bulletedList",
            "numberedList",
            "|",
            "blockQuote",
          ],
        }}
        onChange={(_, editor: any) => {
          onChange(editor.getData());
        }}
      />
      <style jsx global>{`
        .ck-editor__editable {
          min-height: 300px;
        }
      `}</style>
    </div>
  );
}
