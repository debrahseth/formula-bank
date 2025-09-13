import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-100 px-6 sm:px-12 text-center">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 drop-shadow-md mb-6">
        👋 Welcome to
        <span className="bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 bg-clip-text text-transparent">
          {" "}
          Formula Bank
        </span>
      </h1>
      <div className="w-full flex justify-center mb-8 animate-fadeIn">
        <Image
          src="/formula.png"
          alt="Engineer illustration"
          width={500}
          height={500}
          className="rounded-2xl shadow-xl"
          priority
        />
      </div>
      <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-2xl leading-relaxed mb-10">
        A universal collection of{" "}
        <span className="font-semibold text-indigo-600">
          engineering formulas
        </span>{" "}
        grouped by course. Choose your course and explore step-by-step formulas
        with explanations and variables. 🚀
      </p>
      <Link href="/formula-bank">
        <button className="px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-lg sm:text-xl font-bold rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-2xl animate-bounceSlow">
          📘 Explore Formula Bank
        </button>
      </Link>
      <p className="mt-10 text-sm sm:text-base text-gray-500">
        Built with ❤️ for engineers, by engineers.
      </p>
    </div>
  );
}
