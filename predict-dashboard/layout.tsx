import "@/styles/globals.css";

export const metadata = {
  title: "InfinityXOS :: X1 Predict",
  description: "Agentic AI financial prediction platform"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-[#0a0f1c] to-[#101a2e] text-white">{children}</body>
    </html>
  );
}
