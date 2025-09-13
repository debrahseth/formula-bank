import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import thermo from "../data/thermo.json";
import fluid from "../data/fluid.json";
import heat from "../data/heat.json";
// import cpi from "../data/cpi.json";
// import cpc from "../data/cpc.json";
// import analytical from "../data/analytical.json";
import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

export default function FormulaBank() {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [search, setSearch] = useState("");
  const formulas = {
    ...thermo,
    ...heat,
    ...fluid,
    // ...cpi,
    // ...analytical,
    // ...cpc,
  };
  const filteredFormulas =
    selectedCourse && formulas[selectedCourse]
      ? formulas[selectedCourse].filter(
          (formula) =>
            formula.name.toLowerCase().includes(search.toLowerCase()) ||
            formula.description.toLowerCase().includes(search.toLowerCase()) ||
            Object.keys(formula.variables).some((v) =>
              v.toLowerCase().includes(search.toLowerCase())
            )
        )
      : [];

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100 overflow-hidden">
      <div className="shrink-0 z-20 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100 px-4 sm:px-10 pt-6 pb-4 shadow-md">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-center mb-6 text-gray-900 drop-shadow-md">
          📚 Universal Formula Bank
        </h1>

        <div className="flex justify-center mb-4">
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full max-w-xl text-gray-900 px-6 py-3 rounded-xl border border-gray-300 shadow-sm text-lg bg-white focus:outline-none focus:ring-4 focus:ring-indigo-300 transition"
          >
            <option value="">-- Select a Course --</option>
            {Object.keys(formulas).map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>

        {selectedCourse && (
          <div className="flex justify-center">
            <input
              type="text"
              placeholder="🔍 Search formulas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full max-w-xl px-4 py-3 text-gray-900 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-300 transition"
            />
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-4 sm:px-8 lg:px-12 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredFormulas.length > 0 ? (
            filteredFormulas.map((formula, idx) => (
              <div
                key={idx}
                className="p-6 bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:scale-[1.02] transition-transform duration-300"
              >
                <h2 className="text-lg sm:text-xl font-bold text-indigo-700 mb-3">
                  {formula.name}
                </h2>

                <div className="bg-gray-50 text-gray-900 rounded-lg p-3 mb-4 shadow-inner overflow-x-auto">
                  <BlockMath math={formula.formula} />
                </div>

                <p className="text-gray-600 text-sm sm:text-base mb-3">
                  {formula.description}
                </p>

                <ul className="mt-2 text-sm text-gray-900 list-disc pl-5 space-y-1">
                  {Object.entries(formula.variables).map(([varName, desc]) => (
                    <li key={varName}>
                      <span className="font-semibold text-indigo-600">
                        {varName}
                      </span>
                      : {desc}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : selectedCourse ? (
            <p className="text-center text-gray-500 col-span-full text-base sm:text-lg">
              ❌ No formulas found matching your search.
            </p>
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center text-center animate-fadeIn px-4">
              <p className="text-gray-600 mb-4 text-base sm:text-lg">
                👉 Please select a course to view formulas.
              </p>
              <Image
                src="/formula.png"
                alt="Engineer illustration"
                width={400}
                height={400}
                className="mx-auto max-w-[70%] sm:max-w-xs md:max-w-sm lg:max-w-md h-auto rounded-2xl shadow-xl"
                priority
              />
            </div>
          )}
        </div>
      </div>
      <div className="shrink-0 w-full bg-gradient-to-r from-white-500 to-blue-300 shadow-lg">
        <div className="max-w-8xl mx-auto px-2 py-4 flex justify-center">
          <Link href="/">
            <button className="w-full px-20 py-3 bg-white text-blue-600 font-bold rounded-lg shadow-md hover:bg-gray-100 transition transform hover:scale-105">
              🏠 Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
