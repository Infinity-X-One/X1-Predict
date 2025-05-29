import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-5xl font-bold mb-6 text-white drop-shadow-lg">
        <span className="text-lime-400">X1</span> Predict
      </h1>
      <p className="text-lg max-w-xl text-white/80 mb-10">
        Real-time AI financial predictions. Glowing dashboards. Intelligent portfolios.
      </p>
      <Link href="/signup">
        <button className="bg-lime-500 text-black px-6 py-3 rounded-lg shadow-md hover:shadow-xl hover:bg-lime-400">
          Get Started
        </button>
      </Link>
    </main>
  );
}
