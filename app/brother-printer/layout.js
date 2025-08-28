// ./app/hp123/layout.js
export async function generateMetadata() {
  return {
    title: "Brother | Official Printer Support",
  };
}

export default function HPLayout({ children }) {
  return <>{children}</>;
}
