import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const images = [
  "/formula-1.png",
  "/mathematics.png",
  "/formula-2.png",
  "/mathematics-1.png",
  "/notepad.png",
  "/formula.png",
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-100 px-6 sm:px-12 text-center">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-8 text-center leading-tight">
        <span className="inline-block transform -translate-y-1">
          <span className="animate-wave">👋</span> Welcome to
        </span>
        <br />
        <span className="bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 bg-clip-text text-transparent inline-block">
          Formula Bank
        </span>
      </h1>

      <div className="relative w-[300px] h-[300px] mb-5">
        {images.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt="Illustration"
            fill
            className={`rounded-2xl shadow-xl object-contain transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            priority
          />
        ))}
      </div>
      <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-2xl leading-relaxed mb-5">
        A universal collection of{" "}
        <span className="font-semibold text-indigo-600">
          engineering formulas
        </span>{" "}
        grouped by course. Choose your course and explore step-by-step formulas
        with explanations and variables. 🚀
      </p>
      <Link href="/formula-bank">
        <button className="px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-lg sm:text-xl font-bold rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-2xl">
          📘 Explore Formula Bank
        </button>
      </Link>
      <p className="mt-5 text-sm sm:text-base text-gray-500">
        Built for engineers.
      </p>
    </div>
  );
}
