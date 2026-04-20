"use client";

import SectionCard from "./SectionCard";
import Toggle from "./Toggle";

type CertificateTabProps = {
  enableCertificate: boolean;
  toggleCertificate: () => void;
  certificateTemplate: string;
  setCertificateTemplate: (value: string) => void;
  minimumPassPercent: string;
  setMinimumPassPercent: (value: string) => void;
};

export function CertificateTab({
  enableCertificate,
  toggleCertificate,
  certificateTemplate,
  setCertificateTemplate,
  minimumPassPercent,
  setMinimumPassPercent,
}: CertificateTabProps) {
  return (
    <SectionCard title="Certificate">
      <div className="space-y-5">
        <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
          <div>
            <p className="font-medium text-slate-800">Enable Certificate</p>
            <p className="text-sm text-slate-500">Award certificate after course completion.</p>
          </div>
          <Toggle checked={enableCertificate} onChange={toggleCertificate} />
        </div>

        {enableCertificate && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Certificate Template</label>
              <select
                value={certificateTemplate}
                onChange={(e) => setCertificateTemplate(e.target.value)}
                className="h-11 w-full rounded-lg border border-slate-300 px-3 outline-none focus:border-blue-500"
              >
                <option value="default">Default</option>
                <option value="modern">Modern</option>
                <option value="classic">Classic</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Minimum Pass %</label>
              <input
                type="number"
                value={minimumPassPercent}
                onChange={(e) => setMinimumPassPercent(e.target.value)}
                placeholder="Enter minimum pass %"
                className="h-11 w-full rounded-lg border border-slate-300 px-3 outline-none focus:border-blue-500"
              />
            </div>
          </div>
        )}
      </div>
    </SectionCard>
  );
}