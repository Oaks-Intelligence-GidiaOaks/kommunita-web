import { useRef, useState } from "react";
import JoditEditor from "jodit-react";

const CustomEditor = ({ onChange }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const config = {
    readonly: false,
    placeholder: "Start typing...",
    uploader: {
      insertImageAsBase64URI: true,
    },
    // buttons: [
    //   "bold",
    //   "italic",
    //   "underline",
    //   "|",
    //   "ul",
    //   "ol",
    //   "|", // Ensure 'ul' and 'ol' are included here
    //   "outdent",
    //   "indent",
    //   "|",
    //   "font",
    //   "fontsize",
    //   "brush",
    //   "paragraph",
    //   "|",
    //   "image",
    //   "video",
    //   "table",
    //   "link",
    //   "|",
    //   "align",
    //   "undo",
    //   "redo",
    //   "|",
    //   "hr",
    //   "eraser",
    //   "fullsize",
    //   "print",
    //   "source",
    // ],
    // extraButtons: [
    //   {
    //     name: "customImageUpload",
    //     tooltip: "Upload Image",
    //     iconURL:
    //       "https://cdn.iconscout.com/icon/free/png-256/upload-1767826-1502112.png",
    //     exec: (editor) => {
    //       const input = document.createElement("input");
    //       input.type = "file";
    //       input.accept = "image/*";
    //       input.onchange = async function () {
    //         const file = this.files[0];
    //         if (file) {
    //           const reader = new FileReader();
    //           reader.onload = function (e) {
    //             editor.s.insertImage(e.target.result);
    //           };
    //           reader.readAsDataURL(file);
    //         }
    //       };
    //       input.click();
    //     },
    //   },
    // ],
  };

  const handleBlur = (newContent) => {
    setContent(newContent);
    if (onChange) {
      onChange(newContent);
    }
  };

  return (
    <div>
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        tabIndex={1}
        onBlur={handleBlur}
        onChange={(newContent) => {}}
      />
    </div>
  );
};

export default CustomEditor;
