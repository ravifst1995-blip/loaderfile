import Image from "next/image";
import DriverHero from "./components/homepage/DriverHero";
import DriverFinderForm from "./components/homepage/DriverFinderForm";
import SupportTiles from "./components/homepage/SupportTiles";
import PrinterSetupSection from "./components/homepage/PrinterSetupSection";
import SupportCopySection from "./components/homepage/SupportCopySection";

export default function Home() {
  return (
   <>
    <>
    <DriverHero />
     <DriverFinderForm />
     <SupportTiles />
     <PrinterSetupSection />
    <SupportCopySection />
   </>
   </>
  );
}
