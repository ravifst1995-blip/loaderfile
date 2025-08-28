// ./app/hp123/layout.js
export async function generateMetadata() {
  return {
    title: "Epson | Official Printer Support",
  };
}

export default function HPLayout({ children }) {
  return <>{children}</>;
}
