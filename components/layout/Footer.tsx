export default function Footer() {
  return (
    <footer
      className="border-t py-10 px-4"
      style={{ borderColor: "var(--border)", background: "var(--bg)" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-md flex items-center justify-center"
            style={{ background: "var(--primary)" }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-sm font-semibold text-[--text]">QuoteMate</span>
        </div>

        <p className="text-xs text-[--text-muted] text-center">
          Built for Australian tradies · GST compliant · ABN verified
        </p>

        <p className="text-xs text-[--text-muted]">
          © {new Date().getFullYear()} QuoteMate. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
