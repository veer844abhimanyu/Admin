"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Image as ImageIcon, 
  Save, 
  X, 
  Layout, 
  Type, 
  AlignLeft,
  Settings,
  Eye,
  Globe
} from "lucide-react";
import AdminLayout from "@/components/AdminLayout";

export default function EditHomePage() {
  const [formData, setFormData] = useState({
    heading: "Revolutionize Your Health naturally with Ayurveda",
    subheading: "Discover the ancient wisdom of Ayurveda with our certified experts and comprehensive courses.",
    heroImage1: null,
    heroImage1Preview: "",
    heroImage2: null,
    heroImage2Preview: "",
    metaTitle: "Ayush Yogi - Best Ayurvedic Courses and Treatments",
    metaDescription: "Ayush Yogi offers certified Ayurvedic courses, pulse diagnosis training, and holistic health consultations. Start your wellness journey today.",
    metaKeywords: "ayurveda, health, wellness, courses",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          [field]: file,
          [`${field}Preview`]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: null,
      [`${field}Preview`]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Home page updated successfully!");
  };

  return (
    <AdminLayout>
      <div className="mx-auto w-full max-w-5xl space-y-8">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Customize Home Page</h1>
            <p className="text-sm text-slate-500">Update your website&apos;s hero section and SEO presence.</p>
          </div>
          <button
            onClick={handleSubmit}
            className="group flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-blue-300 active:scale-95"
          >
            <Save className="h-4 w-4 transition-transform group-hover:scale-110" />
            Publish Changes
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Content Card */}
            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4 flex items-center gap-2 font-bold text-slate-800">
                <Layout className="h-5 w-5 text-blue-500" />
                Hero Section Content
              </div>
              
              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <label className="text-[13px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                    <Type className="h-3.5 w-3.5" />
                    Hero Heading
                  </label>
                  <input
                    type="text"
                    name="heading"
                    value={formData.heading}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/30 px-4 py-3 text-sm font-medium text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[13px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                    <AlignLeft className="h-3.5 w-3.5" />
                    Hero Subheading
                  </label>
                  <textarea
                    name="subheading"
                    value={formData.subheading}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/30 px-4 py-3 text-sm font-medium text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {[1, 2].map((num) => (
                    <div key={num} className="space-y-2">
                      <label className="text-[13px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                        <ImageIcon className="h-3.5 w-3.5" />
                        Hero Image {num}
                      </label>
                      <div className="relative group overflow-hidden rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 transition-all hover:border-blue-400 hover:bg-slate-100">
                        {formData[`heroImage${num}Preview`] ? (
                          <div className="relative h-48 w-full group">
                            <img 
                              src={formData[`heroImage${num}Preview`]} 
                              alt={`Hero ${num}`} 
                              className="h-full w-full object-cover transition-transform group-hover:scale-105"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                              <button
                                type="button"
                                onClick={() => removeImage(`heroImage${num}`)}
                                className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-xs font-bold text-white transition hover:bg-red-600"
                              >
                                <X className="h-4 w-4" />
                                Remove Image
                              </button>
                            </div>
                          </div>
                        ) : (
                          <label className="flex h-48 w-full cursor-pointer flex-col items-center justify-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                              <ImageIcon className="h-6 w-6" />
                            </div>
                            <div className="text-center px-4">
                              <p className="text-sm font-bold text-slate-700">Drop image here</p>
                              <p className="text-xs text-slate-500 mt-1">PNG, JPG up to 10MB</p>
                            </div>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageChange(e, `heroImage${num}`)}
                              className="hidden"
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SEO Configuration Card */}
            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4 flex items-center gap-2 font-bold text-slate-800">
                <Globe className="h-5 w-5 text-green-500" />
                SEO & Meta Configuration
              </div>
              
              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[13px] font-bold uppercase tracking-wider text-slate-500">Page Title (Meta)</label>
                    <span className={`text-[11px] font-bold ${formData.metaTitle.length > 60 ? 'text-red-500' : 'text-slate-400'}`}>
                      {formData.metaTitle.length}/60 chars
                    </span>
                  </div>
                  <input
                    type="text"
                    name="metaTitle"
                    value={formData.metaTitle}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/30 px-4 py-3 text-sm font-medium text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[13px] font-bold uppercase tracking-wider text-slate-500">Meta Description</label>
                    <span className={`text-[11px] font-bold ${formData.metaDescription.length > 160 ? 'text-red-500' : 'text-slate-400'}`}>
                      {formData.metaDescription.length}/160 chars
                    </span>
                  </div>
                  <textarea
                    name="metaDescription"
                    value={formData.metaDescription}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/30 px-4 py-3 text-sm font-medium text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[13px] font-bold uppercase tracking-wider text-slate-500">Keywords (Comma separated)</label>
                  <div className="flex items-center gap-2 overflow-hidden rounded-xl border border-slate-200 bg-slate-50/30 focus-within:border-blue-500 focus-within:bg-white transition">
                    <div className="flex h-12 w-12 items-center justify-center bg-slate-100 border-r border-slate-200">
                      <Settings className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      name="metaKeywords"
                      value={formData.metaKeywords}
                      onChange={handleInputChange}
                      className="h-12 w-full px-4 text-sm font-medium text-slate-800 outline-none"
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-8 lg:sticky lg:top-24 h-fit">
            {/* Search Preview Section */}
            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4 flex items-center gap-2 font-bold text-slate-800">
                <Eye className="h-5 w-5 text-purple-500" />
                Search Preview
              </div>
              <div className="p-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center">
                      <Globe className="h-3 w-3 text-slate-500" />
                    </div>
                    <div>
                      <p className="text-[12px] text-slate-700 leading-tight">ayushyogi.com</p>
                      <p className="text-[10px] text-slate-500 leading-tight">https://ayushyogi.com</p>
                    </div>
                  </div>
                  <h3 className="text-[18px] font-medium text-[#1a0dab] hover:underline cursor-pointer transition">
                    {formData.metaTitle || "Page Title Placeholder"}
                  </h3>
                  <p className="text-[13px] text-[#4d5156] line-clamp-2 leading-relaxed">
                    {formData.metaDescription || "Enter a meta description to see how your site will appear in Google search results."}
                  </p>
                </div>
              </div>
            </section>

            {/* Quick Actions Card */}
            <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-xl shadow-slate-200">
              <h3 className="font-bold text-lg">Quick Tips</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-400">
                <li className="flex gap-2">
                  <div className="h-1.5 w-1.5 mt-1.5 rounded-full bg-blue-500 shrink-0" />
                  Keep headings concise (under 10 words) for better mobile readability.
                </li>
                <li className="flex gap-2">
                  <div className="h-1.5 w-1.5 mt-1.5 rounded-full bg-green-500 shrink-0" />
                  Use high-quality PNGs for hero images with transparent backgrounds.
                </li>
                <li className="flex gap-2">
                  <div className="h-1.5 w-1.5 mt-1.5 rounded-full bg-purple-500 shrink-0" />
                  Meta descriptions should include a call-to-action (CTA).
                </li>
              </ul>
              
              <div className="mt-8 flex gap-3">
                <Link
                  href="/"
                  className="flex-1 rounded-xl border border-slate-700 bg-transparent px-4 py-3 text-center text-xs font-bold text-slate-400 transition hover:bg-slate-800"
                >
                  Discard
                </Link>
                <button
                  onClick={handleSubmit}
                  className="flex-1 rounded-xl bg-blue-600 px-4 py-3 text-center text-xs font-bold text-white shadow-lg shadow-blue-900/40 transition hover:bg-blue-500"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
