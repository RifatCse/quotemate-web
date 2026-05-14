import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className="border-t py-10 px-4"
      style={{ borderColor: "var(--border)", background: "var(--bg)" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="QuoteMate"
            width={28}
            height={28}
            className="object-contain"
          />
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
