"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const reduced = useReducedMotion();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
      } else if (res.status === 409) {
        setStatus("success"); // already on list — show same success message
      } else {
        setErrorMsg(data.error || "Something went wrong. Try again.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-4"
          >
            <div className="inline-flex items-center gap-2 text-[--success] font-semibold text-lg mb-2">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20 6L9 17l-5-5"
                />
              </svg>
              You&apos;re on the list!
            </div>
            <p className="text-[--text-muted] text-sm">
              We&apos;ll email you at <strong className="text-[--text]">{email}</strong> when QuoteMate launches.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setStatus("idle"); setErrorMsg(""); }}
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-xl bg-[--surface] border border-[--border] text-[--text] placeholder:text-[--text-muted] focus:outline-none focus:border-[--primary] transition-colors text-sm"
              disabled={status === "loading"}
              required
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-6 py-3 rounded-xl bg-[--primary] text-white font-semibold text-sm hover:bg-purple-500 active:scale-95 transition-all disabled:opacity-60 whitespace-nowrap cursor-pointer"
            >
              {status === "loading" ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                  Joining...
                </span>
              ) : (
                "Join Waitlist"
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {status === "error" && errorMsg && (
        <p className="mt-2 text-[--danger] text-xs text-center">{errorMsg}</p>
      )}

      {status !== "success" && (
        <p className="mt-3 text-[--text-muted] text-xs text-center">
          Free to join. No spam. Unsubscribe any time.
        </p>
      )}
    </div>
  );
}
