"use client";

import { ChangeEvent, useEffect, useRef } from "react";
import { ResizableNodeView } from "@tiptap/core";
import type { Node as ProseMirrorNode } from "@tiptap/pm/model";
import { NodeSelection, TextSelection } from "@tiptap/pm/state";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import TiptapImage from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { Table } from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import Youtube, { getEmbedUrlFromYoutubeUrl } from "@tiptap/extension-youtube";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  CheckSquare,
  Code2,
  Eraser,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  ImageIcon,
  Italic,
  LinkIcon,
  List,
  ListOrdered,
  Maximize2,
  Minimize2,
  Minus,
  Palette,
  Pilcrow,
  Quote,
  Redo2,
  Strikethrough,
  Table2,
  Trash2,
  Underline as UnderlineIcon,
  Undo2,
  Unlink,
} from "lucide-react";

type TiptapEditorFieldProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

type ToolbarButtonProps = {
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

const youtubeSizeOptions = {
  width: 640,
  height: 360,
};

const mediaNodeNames = new Set(["image", "youtube"]);

const moveCursorToParagraphAfterMedia = (editor: Editor) => {
  const { state, view } = editor;
  const paragraphType = state.schema.nodes.paragraph;

  if (!paragraphType) return false;

  const { selection } = state;
  let insertPos: number | null = null;

  if (
    selection instanceof NodeSelection &&
    mediaNodeNames.has(selection.node.type.name)
  ) {
    insertPos = selection.to;
  } else {
    const { $from } = selection;
    const nodeBefore = $from.nodeBefore;
    const nodeAfter = $from.nodeAfter;

    if (nodeBefore && mediaNodeNames.has(nodeBefore.type.name)) {
      insertPos = $from.pos;
    } else if (nodeAfter && mediaNodeNames.has(nodeAfter.type.name)) {
      insertPos = $from.pos + nodeAfter.nodeSize;
    }
  }

  if (insertPos === null) return false;

  const paragraph = paragraphType.create();
  const transaction = state.tr.insert(insertPos, paragraph);
  const cursorPos = insertPos + 1;

  transaction.setSelection(TextSelection.create(transaction.doc, cursorPos));
  transaction.scrollIntoView();
  view.dispatch(transaction);
  view.focus();

  return true;
};

const mediaLayoutAttributes = {
  mediaPosition: {
    default: "inline",
    parseHTML: (element: HTMLElement) =>
      element.getAttribute("data-media-position") || "inline",
    renderHTML: (attributes: { mediaPosition?: string }) => ({
      "data-media-position": attributes.mediaPosition || "inline",
    }),
  },
  mediaAlign: {
    default: "left",
    parseHTML: (element: HTMLElement) =>
      element.getAttribute("data-media-align") || "left",
    renderHTML: (attributes: { mediaAlign?: string }) => ({
      "data-media-align": attributes.mediaAlign || "left",
    }),
  },
  mediaWrap: {
    default: "none",
    parseHTML: (element: HTMLElement) =>
      element.getAttribute("data-media-wrap") || "none",
    renderHTML: (attributes: { mediaWrap?: string }) => ({
      "data-media-wrap": attributes.mediaWrap || "none",
    }),
  },
};

const setNodeMediaDataset = (
  element: HTMLElement,
  node: ProseMirrorNode,
  applyLayout = false,
) => {
  const position = node.attrs.mediaPosition || "inline";
  const align = node.attrs.mediaAlign || "left";
  const wrap = node.attrs.mediaWrap || "none";

  element.dataset.mediaPosition = position;
  element.dataset.mediaAlign = align;
  element.dataset.mediaWrap = wrap;

  if (!applyLayout) return;

  element.style.clear = position.startsWith("bottom") ? "both" : "none";
  element.style.float = "";
  element.style.width = "fit-content";
  element.style.maxWidth = "100%";
  element.style.margin = "0.25rem 0 0.75rem";

  if (wrap === "left") {
    element.style.float = "left";
    element.style.margin = "0.25rem 1rem 0.75rem 0";
    return;
  }

  if (wrap === "right") {
    element.style.float = "right";
    element.style.margin = "0.25rem 0 0.75rem 1rem";
    return;
  }

  if (align === "center") {
    element.style.marginRight = "auto";
    element.style.marginLeft = "auto";
    return;
  }

  if (align === "right") {
    element.style.marginRight = "0";
    element.style.marginLeft = "auto";
  }
};

const ProfessionalImage = TiptapImage.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      ...mediaLayoutAttributes,
    };
  },

  addNodeView() {
    if (typeof document === "undefined") {
      return null;
    }

    const nodeName = this.name;

    const applyImageAttributes = (
      image: HTMLImageElement,
      node: ProseMirrorNode,
    ) => {
      image.src = node.attrs.src;

      if (node.attrs.alt) {
        image.alt = node.attrs.alt;
      } else {
        image.removeAttribute("alt");
      }

      if (node.attrs.title) {
        image.title = node.attrs.title;
      } else {
        image.removeAttribute("title");
      }

      if (node.attrs.width) {
        image.width = Number(node.attrs.width);
        image.style.width = `${node.attrs.width}px`;
      } else {
        image.removeAttribute("width");
        image.style.width = "";
      }

      if (node.attrs.height) {
        image.height = Number(node.attrs.height);
        image.style.height = `${node.attrs.height}px`;
      } else {
        image.removeAttribute("height");
        image.style.height = "auto";
      }

      setNodeMediaDataset(image, node);
    };

    return ({ node, getPos, editor }) => {
      const image = document.createElement("img");
      applyImageAttributes(image, node);

      const nodeView = new ResizableNodeView({
        element: image,
        editor,
        node,
        getPos,
        onResize: (width, height) => {
          image.style.width = `${width}px`;
          image.style.height = `${height}px`;
        },
        onCommit: (width, height) => {
          const pos = getPos();
          if (pos === undefined) return;

          editor
            .chain()
            .setNodeSelection(pos)
            .updateAttributes(nodeName, { width, height })
            .run();
        },
        onUpdate: (updatedNode) => {
          if (updatedNode.type !== node.type) {
            return false;
          }

          applyImageAttributes(image, updatedNode);
          setNodeMediaDataset(nodeView.dom as HTMLElement, updatedNode, true);
          return true;
        },
        options: {
          directions: ["bottom-right"],
          min: {
            width: 120,
            height: 80,
          },
          preserveAspectRatio: true,
        },
      });

      setNodeMediaDataset(nodeView.dom as HTMLElement, node, true);
      return nodeView;
    };
  },
});

const ResizableYoutube = Youtube.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      ...mediaLayoutAttributes,
    };
  },

  addNodeView() {
    if (typeof document === "undefined") {
      return null;
    }

    const options = this.options;
    const nodeName = this.name;

    const getYoutubeSrc = (node: ProseMirrorNode) =>
      getEmbedUrlFromYoutubeUrl({
        url: node.attrs.src,
        allowFullscreen: options.allowFullscreen,
        autoplay: options.autoplay,
        ccLanguage: options.ccLanguage,
        ccLoadPolicy: options.ccLoadPolicy,
        controls: options.controls,
        disableKBcontrols: options.disableKBcontrols,
        enableIFrameApi: options.enableIFrameApi,
        endTime: options.endTime,
        interfaceLanguage: options.interfaceLanguage,
        ivLoadPolicy: options.ivLoadPolicy,
        loop: options.loop,
        modestBranding: options.modestBranding,
        nocookie: options.nocookie,
        origin: options.origin,
        playlist: options.playlist,
        progressBarColor: options.progressBarColor,
        startAt: node.attrs.start || 0,
        rel: options.rel,
      }) || node.attrs.src;

    const applyIframeAttributes = (
      iframe: HTMLIFrameElement,
      node: ProseMirrorNode,
    ) => {
      const width = Number(node.attrs.width) || options.width;
      const height = Number(node.attrs.height) || options.height;

      iframe.src = getYoutubeSrc(node);
      iframe.width = String(width);
      iframe.height = String(height);
      iframe.style.width = `${width}px`;
      iframe.style.height = `${height}px`;
      setNodeMediaDataset(iframe, node);
      iframe.setAttribute("frameborder", "0");
      iframe.setAttribute(
        "allow",
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
      );

      if (options.allowFullscreen) {
        iframe.setAttribute("allowfullscreen", "true");
      } else {
        iframe.removeAttribute("allowfullscreen");
      }
    };

    return ({ node, getPos, editor }) => {
      const iframe = document.createElement("iframe");
      applyIframeAttributes(iframe, node);

      const nodeView = new ResizableNodeView({
        element: iframe,
        editor,
        node,
        getPos,
        onResize: (width, height) => {
          iframe.style.width = `${width}px`;
          iframe.style.height = `${height}px`;
        },
        onCommit: (width, height) => {
          const pos = getPos();
          if (pos === undefined) return;

          editor
            .chain()
            .setNodeSelection(pos)
            .updateAttributes(nodeName, { width, height })
            .run();
        },
        onUpdate: (updatedNode) => {
          if (updatedNode.type !== node.type) {
            return false;
          }

          applyIframeAttributes(iframe, updatedNode);
          setNodeMediaDataset(nodeView.dom as HTMLElement, updatedNode, true);
          return true;
        },
        options: {
          directions: ["bottom-right"],
          min: {
            width: 220,
            height: 124,
          },
          preserveAspectRatio: true,
        },
      });

      setNodeMediaDataset(nodeView.dom as HTMLElement, node, true);
      return nodeView;
    };
  },
});

function ToolbarButton({
  label,
  active = false,
  disabled = false,
  onClick,
  children,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={`flex h-9 min-w-9 items-center justify-center rounded-md border px-2 text-xs font-semibold text-slate-700 transition disabled:cursor-not-allowed disabled:opacity-40 ${
        active
          ? "border-blue-500 bg-blue-50 text-blue-700"
          : "border-slate-200 bg-white hover:bg-slate-50"
      }`}
    >
      {children}
    </button>
  );
}

function ToolbarDivider() {
  return <div className="mx-1 h-9 w-px bg-slate-200" />;
}

function EditorToolbar({ editor }: { editor: Editor }) {
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const selectedMediaType = editor.isActive("youtube")
    ? "youtube"
    : editor.isActive("image")
      ? "image"
      : null;
  const selectedMediaAttributes = selectedMediaType
    ? editor.getAttributes(selectedMediaType)
    : {};
  const selectedMediaPosition = selectedMediaAttributes.mediaPosition || "inline";
  const selectedMediaAlign = selectedMediaAttributes.mediaAlign || "left";
  const selectedMediaWrap = selectedMediaAttributes.mediaWrap || "none";

  const insertImageWithNaturalSize = (src: string, alt?: string) => {
    const previewImage = new window.Image();

    previewImage.onload = () => {
      const naturalWidth = previewImage.naturalWidth || 0;
      const width = naturalWidth > 0 ? Math.min(naturalWidth, 640) : undefined;

      editor.chain().focus().setImage({ src, alt, width }).run();
      window.requestAnimationFrame(() => moveCursorToParagraphAfterMedia(editor));
    };

    previewImage.onerror = () => {
      editor.chain().focus().setImage({ src, alt }).run();
      window.requestAnimationFrame(() => moveCursorToParagraphAfterMedia(editor));
    };

    previewImage.src = src;
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Enter link URL", previousUrl || "https://");

    if (url === null) return;

    if (!url.trim()) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url.trim() })
      .run();
  };

  const addImage = () => {
    const src = window.prompt("Enter image URL", "https://");
    if (!src?.trim()) return;

    insertImageWithNaturalSize(src.trim());
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const src = reader.result;
      if (typeof src === "string") {
        insertImageWithNaturalSize(src, file.name);
      }
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const addYoutubeVideo = () => {
    const src = window.prompt("Enter YouTube URL", "https://www.youtube.com/watch?v=");
    if (!src?.trim()) return;

    editor
      .chain()
      .focus()
      .setYoutubeVideo({ src: src.trim(), ...youtubeSizeOptions })
      .run();
    window.requestAnimationFrame(() => moveCursorToParagraphAfterMedia(editor));
  };

  const setMediaSize = (width: number, height = Math.round(width * 0.5625)) => {
    if (selectedMediaType === "youtube") {
      editor
        .chain()
        .focus()
        .updateAttributes("youtube", { width, height })
        .run();
      return;
    }

    if (selectedMediaType === "image") {
      editor
        .chain()
        .focus()
        .updateAttributes("image", { width, height: null })
        .run();
      return;
    }

    window.alert("Select an image or YouTube video first.");
  };

  const setMediaLayout = (
    mediaAlign: "left" | "center" | "right",
    mediaWrap: "none" | "left" | "right" = "none",
    mediaPosition = mediaWrap === "none" ? mediaAlign : `wrap-${mediaWrap}`,
  ) => {
    if (!selectedMediaType) {
      window.alert("Select an image or YouTube video first.");
      return;
    }

    editor
      .chain()
      .focus()
      .updateAttributes(selectedMediaType, {
        mediaAlign,
        mediaWrap,
        mediaPosition,
      })
      .run();
  };

  const setMediaPosition = (position: string) => {
    const positionMap: Record<
      string,
      {
        mediaAlign: "left" | "center" | "right";
        mediaWrap: "none" | "left" | "right";
      }
    > = {
      inline: { mediaAlign: "left", mediaWrap: "none" },
      "top-left": { mediaAlign: "left", mediaWrap: "none" },
      "top-center": { mediaAlign: "center", mediaWrap: "none" },
      "top-right": { mediaAlign: "right", mediaWrap: "none" },
      "wrap-left": { mediaAlign: "left", mediaWrap: "left" },
      "wrap-right": { mediaAlign: "right", mediaWrap: "right" },
      "bottom-left": { mediaAlign: "left", mediaWrap: "none" },
      "bottom-center": { mediaAlign: "center", mediaWrap: "none" },
      "bottom-right": { mediaAlign: "right", mediaWrap: "none" },
    };
    const mediaLayout = positionMap[position] || positionMap.inline;

    if (!selectedMediaType) {
      window.alert("Select an image or YouTube video first.");
      return;
    }

    editor
      .chain()
      .focus()
      .updateAttributes(selectedMediaType, {
        ...mediaLayout,
        mediaPosition: position,
      })
      .run();
  };

  const addParagraphAfterMedia = () => {
    if (!selectedMediaType) {
      window.alert("Select an image or YouTube video first.");
      return;
    }

    if (!moveCursorToParagraphAfterMedia(editor)) {
      window.alert("Please select the image or YouTube video first.");
    }
  };

  const setImageAltText = () => {
    if (selectedMediaType !== "image") {
      window.alert("Select an image first.");
      return;
    }

    const currentAlt = (selectedMediaAttributes.alt as string | undefined) || "";
    const alt = window.prompt("Enter image alt text", currentAlt);

    if (alt === null) return;

    editor
      .chain()
      .focus()
      .updateAttributes("image", {
        alt: alt.trim() || null,
        title: alt.trim() || null,
      })
      .run();
  };

  const setCustomMediaSize = () => {
    const currentAttributes = selectedMediaType
      ? editor.getAttributes(selectedMediaType)
      : {};
    const currentWidth = Number(currentAttributes.width) || youtubeSizeOptions.width;
    const currentHeight =
      Number(currentAttributes.height) || Math.round(currentWidth * 0.5625);
    const widthInput = window.prompt("Enter width in pixels", String(currentWidth));

    if (widthInput === null) return;

    const width = Number(widthInput);
    if (!Number.isFinite(width) || width < 120) {
      window.alert("Please enter a valid width of at least 120px.");
      return;
    }

    if (selectedMediaType === "image") {
      setMediaSize(Math.round(width));
      return;
    }

    const heightInput = window.prompt(
      "Enter height in pixels",
      String(currentHeight),
    );

    if (heightInput === null) return;

    const height = Number(heightInput);
    if (!Number.isFinite(height) || height < 80) {
      window.alert("Please enter a valid height of at least 80px.");
      return;
    }

    setMediaSize(Math.round(width), Math.round(height));
  };

  const insertTable = () => {
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  };

  return (
    <div className="flex flex-wrap gap-2 border-b border-slate-200 bg-slate-50 p-3">
      <ToolbarButton
        label="Paragraph"
        active={editor.isActive("paragraph")}
        onClick={() => editor.chain().focus().setParagraph().run()}
      >
        <Pilcrow className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Heading 1"
        active={editor.isActive("heading", { level: 1 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        <Heading1 className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Heading 2"
        active={editor.isActive("heading", { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Heading 3"
        active={editor.isActive("heading", { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <Heading3 className="h-4 w-4" />
      </ToolbarButton>

      <ToolbarDivider />

      <ToolbarButton
        label="Bold"
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Italic"
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Underline"
        active={editor.isActive("underline")}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <UnderlineIcon className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Strike"
        active={editor.isActive("strike")}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Inline code"
        active={editor.isActive("code")}
        onClick={() => editor.chain().focus().toggleCode().run()}
      >
        <Code2 className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Code block"
        active={editor.isActive("codeBlock")}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      >
        Code
      </ToolbarButton>

      <ToolbarDivider />

      <ToolbarButton
        label="Bullet list"
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Numbered list"
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Task list"
        active={editor.isActive("taskList")}
        onClick={() => editor.chain().focus().toggleTaskList().run()}
      >
        <CheckSquare className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Quote"
        active={editor.isActive("blockquote")}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote className="h-4 w-4" />
      </ToolbarButton>

      <ToolbarDivider />

      <ToolbarButton
        label="Align left"
        active={editor.isActive({ textAlign: "left" })}
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
      >
        <AlignLeft className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Align center"
        active={editor.isActive({ textAlign: "center" })}
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
      >
        <AlignCenter className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Align right"
        active={editor.isActive({ textAlign: "right" })}
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
      >
        <AlignRight className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Justify"
        active={editor.isActive({ textAlign: "justify" })}
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
      >
        <AlignJustify className="h-4 w-4" />
      </ToolbarButton>

      <ToolbarDivider />

      <label
        className="flex h-9 items-center gap-2 rounded-md border border-slate-200 bg-white px-2 text-xs font-semibold text-slate-700"
        title="Text color"
      >
        <Palette className="h-4 w-4" />
        <input
          type="color"
          className="h-5 w-6 cursor-pointer border-0 bg-transparent p-0"
          onChange={(event) =>
            editor.chain().focus().setColor(event.target.value).run()
          }
        />
      </label>
      <ToolbarButton
        label="Highlight"
        active={editor.isActive("highlight")}
        onClick={() =>
          editor.chain().focus().toggleHighlight({ color: "#fef08a" }).run()
        }
      >
        <Highlighter className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Clear formatting"
        onClick={() =>
          editor.chain().focus().unsetAllMarks().clearNodes().unsetColor().run()
        }
      >
        <Eraser className="h-4 w-4" />
      </ToolbarButton>

      <ToolbarDivider />

      <ToolbarButton
        label="Link"
        active={editor.isActive("link")}
        onClick={setLink}
      >
        <LinkIcon className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Unlink"
        disabled={!editor.isActive("link")}
        onClick={() => editor.chain().focus().extendMarkRange("link").unsetLink().run()}
      >
        <Unlink className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton label="Image" onClick={addImage}>
        <ImageIcon className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Upload image"
        onClick={() => imageInputRef.current?.click()}
      >
        Upload
      </ToolbarButton>
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
      <ToolbarButton label="YouTube" onClick={addYoutubeVideo}>
        YT
      </ToolbarButton>

      <ToolbarButton
        label="Small media"
        disabled={!selectedMediaType}
        onClick={() => setMediaSize(320, 180)}
      >
        <Minimize2 className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Medium media"
        disabled={!selectedMediaType}
        onClick={() => setMediaSize(640, 360)}
      >
        M
      </ToolbarButton>
      <ToolbarButton
        label="Large media"
        disabled={!selectedMediaType}
        onClick={() => setMediaSize(960, 540)}
      >
        <Maximize2 className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Custom media size"
        disabled={!selectedMediaType}
        onClick={setCustomMediaSize}
      >
        Size
      </ToolbarButton>
      <ToolbarButton
        label="Media left"
        active={selectedMediaAlign === "left" && selectedMediaWrap === "none"}
        disabled={!selectedMediaType}
        onClick={() => setMediaLayout("left", "none", "top-left")}
      >
        <AlignLeft className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Media center"
        active={selectedMediaAlign === "center" && selectedMediaWrap === "none"}
        disabled={!selectedMediaType}
        onClick={() => setMediaLayout("center", "none", "top-center")}
      >
        <AlignCenter className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Media right"
        active={selectedMediaAlign === "right" && selectedMediaWrap === "none"}
        disabled={!selectedMediaType}
        onClick={() => setMediaLayout("right", "none", "top-right")}
      >
        <AlignRight className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Wrap text left"
        active={selectedMediaWrap === "left"}
        disabled={!selectedMediaType}
        onClick={() => setMediaLayout("left", "left", "wrap-left")}
      >
        Wrap L
      </ToolbarButton>
      <ToolbarButton
        label="Wrap text right"
        active={selectedMediaWrap === "right"}
        disabled={!selectedMediaType}
        onClick={() => setMediaLayout("right", "right", "wrap-right")}
      >
        Wrap R
      </ToolbarButton>
      <label
        className="flex h-9 items-center gap-2 rounded-md border border-slate-200 bg-white px-2 text-xs font-semibold text-slate-700"
        title="Media position"
      >
        Pos
        <select
          disabled={!selectedMediaType}
          value={selectedMediaPosition as string}
          onChange={(event) => setMediaPosition(event.target.value)}
          className="max-w-32 bg-transparent text-xs outline-none disabled:cursor-not-allowed disabled:opacity-40"
        >
          <option value="inline">Inline</option>
          <option value="top-left">Top left</option>
          <option value="top-center">Top center</option>
          <option value="top-right">Top right</option>
          <option value="wrap-left">Wrap left</option>
          <option value="wrap-right">Wrap right</option>
          <option value="bottom-left">Bottom left</option>
          <option value="bottom-center">Bottom center</option>
          <option value="bottom-right">Bottom right</option>
        </select>
      </label>
      <ToolbarButton
        label="Add paragraph after media"
        disabled={!selectedMediaType}
        onClick={addParagraphAfterMedia}
      >
        <Pilcrow className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Image alt text"
        disabled={selectedMediaType !== "image"}
        onClick={setImageAltText}
      >
        Alt
      </ToolbarButton>

      <ToolbarDivider />

      <ToolbarButton label="Insert table" onClick={insertTable}>
        <Table2 className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Add row"
        disabled={!editor.can().addRowAfter()}
        onClick={() => editor.chain().focus().addRowAfter().run()}
      >
        + Row
      </ToolbarButton>
      <ToolbarButton
        label="Add column"
        disabled={!editor.can().addColumnAfter()}
        onClick={() => editor.chain().focus().addColumnAfter().run()}
      >
        + Col
      </ToolbarButton>
      <ToolbarButton
        label="Delete row"
        disabled={!editor.can().deleteRow()}
        onClick={() => editor.chain().focus().deleteRow().run()}
      >
        - Row
      </ToolbarButton>
      <ToolbarButton
        label="Delete column"
        disabled={!editor.can().deleteColumn()}
        onClick={() => editor.chain().focus().deleteColumn().run()}
      >
        - Col
      </ToolbarButton>
      <ToolbarButton
        label="Delete table"
        disabled={!editor.can().deleteTable()}
        onClick={() => editor.chain().focus().deleteTable().run()}
      >
        <Trash2 className="h-4 w-4" />
      </ToolbarButton>

      <ToolbarDivider />

      <ToolbarButton
        label="Horizontal rule"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <Minus className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Undo"
        disabled={!editor.can().undo()}
        onClick={() => editor.chain().focus().undo().run()}
      >
        <Undo2 className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Redo"
        disabled={!editor.can().redo()}
        onClick={() => editor.chain().focus().redo().run()}
      >
        <Redo2 className="h-4 w-4" />
      </ToolbarButton>
    </div>
  );
}

export default function TiptapEditorField({
  value,
  onChange,
  placeholder = "Write here...",
}: TiptapEditorFieldProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
      ProfessionalImage.configure({
        allowBase64: true,
        inline: false,
      }),
      ResizableYoutube.configure({
        controls: true,
        nocookie: true,
        ...youtubeSizeOptions,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Placeholder.configure({
        placeholder,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
      }),
    ],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "min-h-[340px] px-4 py-3 text-sm text-slate-800 outline-none prose-editor",
      },
    },
    onUpdate: ({ editor: currentEditor }) => {
      onChange(currentEditor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor || editor.getHTML() === value) return;
    editor.commands.setContent(value, { emitUpdate: false });
  }, [editor, value]);

  if (!editor) {
    return (
      <div className="rounded border border-slate-300 bg-white p-4 text-sm text-slate-500">
        Loading editor...
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded border border-slate-300 bg-white">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
