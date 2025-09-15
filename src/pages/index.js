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
        className="absolute top-5 right-5 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 hover:scale-[1.10] transition"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
            <button
              onClick={() => {
                setShowComplaintBox(false);
                setComplaint("");
              }}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-600"
            >
              ✖
            </button>

            <h2 className="text-xl font-bold text-indigo-700 mb-4">
              📢 Send a Complaint
            </h2>

            <textarea
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              placeholder="Describe the issue (wrong formula, not found, suggestions)..."
              className="w-full p-3 border text-gray-900 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              rows={5}
            ></textarea>

            <div className="mt-5 flex flex-col gap-3">
              {/* <a
                href={`mailto:debrahseth86@gmail.com?subject=Formula%20Bank%20Complaint&body=${encodeURIComponent(
                  complaint
                )}`}
                onClick={() => {
                  setToastMessage("📧 Complaint prepared in your email app!");
                  setTimeout(() => setToastMessage(""), 3000);
                }}
                className="px-5 py-3 bg-yellow-600 text-white text-center rounded-lg shadow hover:bg-yellow-700 transition"
              >
                📧 Send via Email
              </a> */}

              <a
                href="https://forms.gle/your-google-form-link"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  setToastMessage("📝 Redirecting to Google Form...");
                  setComplaint("");
                  setTimeout(() => {
                    setToastMessage(""), 3000;
                    setComplaint(""), 3000;
                  });
                }}
                className="px-5 py-3 bg-purple-600 text-white text-center rounded-lg shadow hover:bg-purple-700 transition"
              >
                📝 Submit via Google Form
              </a>
            </div>
          </div>
        </div>
      )}

      {showAbout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative">
            <button
              onClick={() => setShowAbout(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-600"
            >
              ✖
            </button>

            <h2 className="text-2xl font-bold text-indigo-700 mb-4">
              ℹ️ About Formula Bank
            </h2>

            <p className="text-gray-700 text-center leading-relaxed mb-4">
              <b>Formula Bank</b> is your universal engineering formula
              reference. 📘 You can browse courses, view formulas, and see
              detailed explanations of variables. Each formula comes with
              examples so you can understand how to apply it in real-world
              problems.
            </p>

            <ul className="list-disc list-inside text-gray-700 text-left space-y-2">
              <li>🔎 Search or select a course to view formulas</li>
              <li>
                📖 Open formula cards for explanations and solved examples
              </li>
              <li>📢 Report issues if you find wrong/missing formulas</li>
              <li>🚀 Learn faster with structured formula references</li>
            </ul>
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
