// ./app/hp123/layout.js
export async function generateMetadata() {
  return {
    title: "HP | Official Printer Support",
  };
}

export default function HPLayout({ children }) {
  return <>{children}</>;
}
