import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Info, X, AlertTriangle, Send } from "lucide-react";

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
        className="absolute top-3 right-5 bg-indigo-600 text-white p-3 rounded-lg shadow hover:bg-indigo-700 hover:scale-110 transition"
        aria-label="About"
      >
        <Info className="w-5 h-5" />
      </button>
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-8 text-center leading-tight">
        <span className="inline-block transform -translate-y-1">
          Welcome to
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
        with explanations and variables.
      </p>
      <Link href="/formula-bank">
        <button className="px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-lg sm:text-xl font-bold rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-2xl">
          Explore Formula Bank
        </button>
      </Link>
      <p className="mt-5 text-sm sm:text-base text-gray-500">
        Built for engineers.
      </p>

      <button
        onClick={() => setShowComplaintBox(true)}
        className="mt-5 mb-10 flex items-center gap-2 px-10 py-4 bg-red-600 text-white font-bold rounded-full shadow-lg hover:bg-red-700 hover:scale-110 transition z-50"
      >
        <AlertTriangle className="w-5 h-5" />
        Report Issue
      </button>

      {showComplaintBox && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 animate-fadeIn">
          <div className="bg-gradient-to-br from-white via-indigo-50 to-purple-50 rounded-3xl shadow-2xl w-[90%] max-w-8xl p-8 relative transform animate-slideUp">
            <button
              onClick={() => {
                setShowComplaintBox(false);
                setComplaint("");
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-extrabold text-indigo-700 mb-5 flex items-center gap-2">
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
                  setToastMessage("Redirecting to Google Form...");
                  setTimeout(() => {
                    setToastMessage("");
                    setComplaint("");
                  }, 3000);
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-md transition-all duration-300 ease-out hover:shadow-xl hover:scale-[1.04] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
              >
                <Send className="w-4 h-4 stroke-[2.2]" />
                <span>Submit via Google Form</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {showAbout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-fadeIn">
          <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-3xl bg-gradient-to-br from-white via-indigo-50 to-purple-50 shadow-2xl border border-white/60 p-8 sm:p-10 animate-slideUp">
            <button
              onClick={() => setShowAbout(false)}
              className="absolute top-5 right-5 rounded-full p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-3xl font-extrabold text-center mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                About Formula Bank
              </span>
            </h2>
            <p className="text-gray-700 text-center leading-relaxed max-w-3xl mx-auto mb-8">
              <span className="font-semibold text-indigo-700">
                Formula Bank
              </span>{" "}
              is a centralized engineering formula reference designed to help
              students and professionals quickly access formulas, variable
              definitions, and solved examples across multiple courses.
            </p>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-200 to-transparent mb-8" />
            <ul className="space-y-4 max-w-4xl mx-auto text-gray-700">
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-indigo-500 flex-shrink-0" />
                Search or select a course to view all available formulas.
              </li>

              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-purple-500 flex-shrink-0" />
                <span>
                  <strong>Large screens:</strong> Click a formula card to open a
                  detailed modal.
                  <br />
                  <strong>Small screens:</strong> Tap a card to flip it and
                  reveal details directly.
                </span>
              </li>

              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-indigo-500 flex-shrink-0" />
                <span>
                  View clearly explained variables with LaTeX-rendered
                  mathematical expressions.
                </span>
              </li>

              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-purple-500 flex-shrink-0" />
                <span>
                  Learn through solved examples that demonstrate real-world
                  engineering applications.
                </span>
              </li>

              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-indigo-500 flex-shrink-0" />
                <span>
                  Report missing or incorrect formulas directly from the
                  platform.
                </span>
              </li>

              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-purple-500 flex-shrink-0" />
                <span>
                  Study faster using a structured, course-organized formula
                  library.
                </span>
              </li>
            </ul>

            <div className="mt-10 rounded-2xl bg-indigo-100/60 p-5 text-center">
              <p className="text-sm text-indigo-700 font-medium">
                Tip: Use keywords, symbols, or variable names in the search bar
                to quickly locate relevant formulas and examples.
              </p>
            </div>
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
