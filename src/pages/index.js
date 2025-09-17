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
  const [showComplaintBox, setShowComplaintBox] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [complaint, setComplaint] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-100 px-6 sm:px-12 text-center">
      <button
        onClick={() => setShowAbout(true)}
        className="absolute top-3 right-5 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 hover:scale-[1.10] transition"
      >
        ℹ️
      </button>
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

      <button
        onClick={() => setShowComplaintBox(true)}
        className="mt-5 mb-10 px-15 sm:px-10 py-4 sm:py-5 bg-red-600 text-white font-bold rounded-full shadow-lg hover:bg-red-700 hover:scale-110 transition z-50"
      >
        📢 Report Issue
      </button>

      {showComplaintBox && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 animate-fadeIn">
          <div className="bg-gradient-to-br from-white via-indigo-50 to-purple-50 rounded-3xl shadow-2xl w-[90%] max-w-8xl p-8 relative transform animate-slideUp">
            <button
              onClick={() => {
                setShowComplaintBox(false);
                setComplaint("");
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors duration-300"
            >
              ✖
            </button>

            <h2 className="text-2xl font-extrabold text-indigo-700 mb-5 flex items-center gap-2">
              📢{" "}
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Send a Complaint
              </span>
            </h2>

            <textarea
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              placeholder="Describe the issue (wrong formula, not found, suggestions)..."
              className="w-full p-4 border border-gray-200 rounded-xl shadow-sm text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition"
              rows={5}
            ></textarea>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href={`https://docs.google.com/forms/d/e/1FAIpQLSfIaK467KkYVyNYn4yGzQgl7rrbaLhjaWrHgdFqL7otIJZYEQ/viewform?usp=pp_url&entry.1709151129=${encodeURIComponent(
                  complaint
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  setToastMessage("📝 Redirecting to Google Form...");
                  setTimeout(() => {
                    setToastMessage("");
                    setComplaint("");
                  }, 3000);
                }}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center font-semibold rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
              >
                📝 Submit via Google Form
              </a>
            </div>
          </div>
        </div>
      )}

      {showAbout && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 animate-fadeIn p-4">
          <div className="bg-gradient-to-br from-white via-indigo-100 to-purple-100 rounded-3xl shadow-2xl w-full max-w-8xl p-8 relative transform animate-slideUp overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setShowAbout(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors duration-300 text-lg"
            >
              ✖
            </button>
            <h2 className="text-2xl font-extrabold text-indigo-700 mb-5 flex items-center gap-2">
              ℹ️{" "}
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                About Formula Bank
              </span>
            </h2>

            <p className="text-gray-700 text-center leading-relaxed mb-6">
              <b className="text-indigo-700">Formula Bank</b> is your universal
              engineering formula reference. 📘 Browse courses, explore
              formulas, and view detailed explanations of variables. Each
              formula includes solved examples for practical application.
            </p>

            <ul className="space-y-3 text-gray-700 text-left">
              <li className="flex items-start gap-2">
                🔎{" "}
                <span>
                  Search or select a course to see available formulas.
                </span>
              </li>
              <li className="flex items-start gap-2">
                📖{" "}
                <span>
                  On larger screens: Click a formula card to open a detailed
                  modal.
                  <br />
                  On smaller screens: Tap a card to flip it and reveal details
                  directly.
                </span>
              </li>
              <li className="flex items-start gap-2">
                🧮{" "}
                <span>
                  View formula variables with clear explanations and
                  LaTeX-rendered math.
                </span>
              </li>
              <li className="flex items-start gap-2">
                📘{" "}
                <span>
                  See solved examples to understand real-world applications of
                  each formula.
                </span>
              </li>
              <li className="flex items-start gap-2">
                📢{" "}
                <span>
                  Report issues if you encounter missing or incorrect formulas.
                </span>
              </li>
              <li className="flex items-start gap-2">
                🚀{" "}
                <span>
                  Learn faster with structured, organized formula references.
                </span>
              </li>
            </ul>

            <p className="text-gray-600 text-sm mt-6 text-center">
              Tip: Use keywords or variable names in the search to quickly find
              relevant formulas and examples.
            </p>
          </div>
        </div>
      )}

      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fadeIn z-50">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
