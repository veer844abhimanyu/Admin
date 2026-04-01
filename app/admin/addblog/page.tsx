"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import {
  Rss,
  FileText,
  ImageIcon,
  Search,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Link2,
  Undo,
  Redo,
  Type,
} from "lucide-react";

export default function AddBlogPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("blog_image");
  const editorRef = useRef<HTMLDivElement>(null);
  const [blogContent, setBlogContent] = useState("");

  const execCmd = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      setBlogContent(editorRef.current.innerHTML);
      editorRef.current.focus();
    }
  };

  const handleLink = () => {
    const url = prompt('Enter link URL:');
    if (url) execCmd('createLink', url);
  };

  const handleImage = () => {
    const url = prompt('Enter image URL:');
    if (url) execCmd('insertImage', url);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Blog saved successfully!");
    router.push("/admin/blogs");
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-4 pb-12">
      {/* Breadcrumb */}
      <div className="flex justify-end text-[13px] text-gray-500 font-medium">
        <Link href="/admin" className="hover:text-blue-500">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/admin/blogs" className="hover:text-blue-500">Blog</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">Add Blog</span>
      </div>

      {/* Main Card */}
      <div className="overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm">
        {/* Header */}
        <div className="flex items-center gap-2 bg-[#ffc107] px-5 py-3 text-gray-900">
          <Rss className="h-5 w-5" />
          <h2 className="text-[17px] font-semibold">Add Blog</h2>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <form className="space-y-6" onSubmit={handleSave}>
            
            {/* Row 1 */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Blog Title */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-800">
                  Blog title<span className="text-red-500">*</span>
                </label>
                <div className="flex items-center overflow-hidden rounded-md border border-gray-300 focus-within:border-[#ffc107] focus-within:ring-1 focus-within:ring-[#ffc107] transition-shadow">
                  <div className="flex h-10 w-12 items-center justify-center bg-gray-100 text-gray-500 border-r border-gray-300">
                    <FileText className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    required
                    className="h-10 w-full px-3 text-sm outline-none text-gray-700 font-medium"
                    placeholder="Ayurvedic Agni and Ama: आम अच्यु..."
                  />
                </div>
              </div>

              {/* Select Category */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-800">
                  Select category
                </label>
                <div className="relative">
                  <select className="h-10 w-full appearance-none rounded-md border border-gray-300 bg-white px-3 pr-8 text-sm text-gray-700 font-medium outline-none focus:border-[#ffc107] focus:ring-1 focus:ring-[#ffc107] transition-shadow">
                    <option value="">Rog aur Ayurvedic Upchar</option>
                    <option value="yoga">Yoga and Meditation</option>
                    <option value="diet">Healthy Diet</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-800">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Upload Image */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-800">
                  Upload Image<span className="text-red-500">*</span>
                </label>
                <div 
                  className="flex h-10 w-full items-center overflow-hidden rounded-md border border-gray-300 transition-shadow cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="flex h-full w-12 items-center justify-center bg-gray-100 text-gray-500 border-r border-gray-300">
                    <ImageIcon className="h-4 w-4" />
                  </div>
                  <div className="h-full flex-1 bg-white px-3 flex items-center text-sm font-medium text-gray-700 overflow-hidden text-ellipsis whitespace-nowrap">
                    {fileName}
                  </div>
                  <div className="flex h-full items-center justify-center bg-gray-100 px-5 text-sm font-medium text-gray-700 border-l border-gray-300 hover:bg-gray-200">
                    Browse
                  </div>
                  <input 
                    type="file" 
                    className="hidden" 
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-800">
                  Meta Title<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="h-14 w-full rounded-md border border-gray-300 px-3 text-sm font-medium text-gray-700 outline-none focus:border-[#ffc107] focus:ring-1 focus:ring-[#ffc107] transition-shadow"
                  placeholder="Ayurvedic Agni and Ama: Treatment Principles..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-800">
                  Meta Desc<span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  className="w-full rounded-md border border-gray-300 p-3 text-sm font-medium text-gray-700 outline-none focus:border-[#ffc107] focus:ring-1 focus:ring-[#ffc107] min-h-[56px] resize-none transition-shadow"
                  rows={2}
                  placeholder="आमा अवनया में पेंकर अझित..."
                ></textarea>
              </div>
            </div>

            {/* Row 3 */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-800">
                Slug <span className="text-sm font-semibold text-gray-800">(Etx ayush-yog-jalndhara-pnjah)</span>
              </label>
              <input
                type="text"
                className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm font-medium text-gray-700 outline-none focus:border-[#ffc107] focus:ring-1 focus:ring-[#ffc107] transition-shadow"
                placeholder="aam-avastha-mein-chiktsa-kyon-nahi-karni-karni-chahiye"
              />
            </div>

            {/* Row 4: WYSIWYG */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-800">
                Blog Content<span className="text-red-500">*</span>
              </label>
              
              <div className="rounded-md border border-gray-300 overflow-hidden focus-within:ring-1 focus-within:ring-[#ffc107] focus-within:border-[#ffc107] transition-shadow">
                {/* Editor Toolbar */}
                <div className="bg-[#f8f9fa] border-b border-gray-300 p-2 space-y-2 select-none">
                  <div className="flex flex-wrap items-center gap-1 text-gray-700">
                    <span className="text-[11px] font-semibold mx-1 text-gray-400">Source</span>
                    <button type="button" onClick={() => execCmd('removeFormat')} className="p-1.5 hover:bg-gray-200 rounded" title="Clear Formatting"><FileText className="w-4 h-4" /></button>
                    {/* Visual separator */}
                    <div className="w-px h-5 bg-gray-300 mx-1"></div>
                    <button type="button" onClick={() => execCmd('undo')} className="p-1.5 hover:bg-gray-200 rounded" title="Undo"><Undo className="w-4 h-4" /></button>
                    <button type="button" onClick={() => execCmd('redo')} className="p-1.5 hover:bg-gray-200 rounded" title="Redo"><Redo className="w-4 h-4" /></button>
                    <div className="w-px h-5 bg-gray-300 mx-1"></div>
                    <button type="button" onClick={() => {
                        const term = prompt('Search term:');
                        if (term && (window as any).find) (window as any).find(term);
                    }} className="p-1.5 hover:bg-gray-200 rounded" title="Search"><Search className="w-4 h-4" /></button>
                    <div className="w-px h-5 bg-gray-300 mx-1"></div>
                    <button type="button" onClick={() => execCmd('bold')} className="p-1.5 hover:bg-gray-200 rounded font-serif font-bold text-base w-7 h-7 flex items-center justify-center" title="Bold">B</button>
                    <button type="button" onClick={() => execCmd('italic')} className="p-1.5 hover:bg-gray-200 rounded font-serif italic text-base w-7 h-7 flex items-center justify-center" title="Italic">I</button>
                    <button type="button" onClick={() => execCmd('underline')} className="p-1.5 hover:bg-gray-200 rounded font-serif underline text-base w-7 h-7 flex items-center justify-center" title="Underline">U</button>
                    <button type="button" onClick={() => execCmd('strikeThrough')} className="p-1.5 hover:bg-gray-200 rounded font-serif line-through text-base w-7 h-7 flex items-center justify-center" title="Strikethrough">S</button>
                    <div className="w-px h-5 bg-gray-300 mx-1"></div>
                    <button type="button" onClick={() => execCmd('insertOrderedList')} className="p-1.5 hover:bg-gray-200 rounded" title="Ordered List"><ListOrdered className="w-4 h-4" /></button>
                    <button type="button" onClick={() => execCmd('insertUnorderedList')} className="p-1.5 hover:bg-gray-200 rounded" title="Unordered List"><List className="w-4 h-4" /></button>
                    <div className="w-px h-5 bg-gray-300 mx-1"></div>
                    <button type="button" onClick={() => execCmd('justifyLeft')} className="p-1.5 hover:bg-gray-200 rounded" title="Align Left"><AlignLeft className="w-4 h-4" /></button>
                    <button type="button" onClick={() => execCmd('justifyCenter')} className="p-1.5 hover:bg-gray-200 rounded" title="Align Center"><AlignCenter className="w-4 h-4" /></button>
                    <button type="button" onClick={() => execCmd('justifyRight')} className="p-1.5 hover:bg-gray-200 rounded" title="Align Right"><AlignRight className="w-4 h-4" /></button>
                    <button type="button" onClick={() => execCmd('justifyFull')} className="p-1.5 hover:bg-gray-200 rounded" title="Justify"><AlignJustify className="w-4 h-4" /></button>
                    <div className="w-px h-5 bg-gray-300 mx-1"></div>
                    <button type="button" onClick={handleLink} className="p-1.5 hover:bg-gray-200 rounded" title="Insert Link"><Link2 className="w-4 h-4" /></button>
                    <button type="button" onClick={handleImage} className="p-1.5 hover:bg-gray-200 rounded" title="Insert Image"><ImageIcon className="w-4 h-4" /></button>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2 text-gray-700 text-sm mt-1 pb-1">
                    <select onChange={(e) => execCmd('fontName', e.target.value)} defaultValue="Normal" className="border border-gray-300 rounded px-2 py-1 bg-white outline-none w-[100px] text-xs cursor-pointer">
                      <option value="Normal" disabled>Font</option>
                      <option value="Arial">Arial</option>
                      <option value="Verdana">Verdana</option>
                      <option value="Times New Roman">Times Roman</option>
                      <option value="Courier New">Courier</option>
                      <option value="Georgia">Georgia</option>
                    </select>
                    <select onChange={(e) => execCmd('formatBlock', e.target.value)} defaultValue="Normal" className="border border-gray-300 rounded px-2 py-1 bg-white outline-none w-[100px] text-xs cursor-pointer">
                      <option value="Normal" disabled>Style</option>
                      <option value="P">Paragraph</option>
                      <option value="H1">Heading 1</option>
                      <option value="H2">Heading 2</option>
                      <option value="H3">Heading 3</option>
                      <option value="H4">Heading 4</option>
                      <option value="H5">Heading 5</option>
                      <option value="H6">Heading 6</option>
                    </select>
                    <select onChange={(e) => execCmd('fontSize', e.target.value)} defaultValue="Size" className="border border-gray-300 rounded px-2 py-1 bg-white outline-none w-[100px] text-xs cursor-pointer">
                      <option value="Size" disabled>Size</option>
                      <option value="1">Small</option>
                      <option value="3">Normal</option>
                      <option value="5">Large</option>
                      <option value="7">Huge</option>
                    </select>
                    <div className="w-px h-5 bg-gray-300 mx-1"></div>
                    
                    {/* Text Color Picker */}
                    <div className="relative group flex items-center bg-white border border-gray-300 rounded" title="Text Color">
                      <div className="px-2 py-1 flex items-center gap-1 text-xs font-semibold cursor-pointer">
                        <Type className="w-4 h-4" />
                        <span className="text-[10px] ml-1">▼</span>
                      </div>
                      <input 
                        type="color" 
                        onChange={(e) => execCmd('foreColor', e.target.value)}
                        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                        title="Text Color"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Editor Content Area */}
                <div 
                  ref={editorRef}
                  contentEditable
                  suppressContentEditableWarning
                  onInput={(e) => setBlogContent(e.currentTarget.innerHTML)}
                  className="w-full min-h-[320px] p-5 text-sm outline-none font-sans leading-relaxed text-gray-800 bg-white empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400 cursor-text"
                  data-placeholder="Enter blog content here..."
                />
                
                {/* Hidden textarea to satisfy form submission constraints */}
                <textarea 
                  name="blogContent"
                  required
                  className="hidden" 
                  value={blogContent}
                  readOnly 
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="rounded-md bg-[#ffc107] px-8 py-2.5 text-sm font-bold text-gray-900 shadow-sm hover:bg-amber-400 focus:outline-none transition-colors"
              >
                Save Blog
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}