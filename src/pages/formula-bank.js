import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import thermo from "../data/thermo.json";
import fluid from "../data/fluid.json";
import heat from "../data/heat.json";
import mtp from "../data/mtp.json";
import eda from "../data/eda.json";
// import cpc from "../data/cpc.json";
// import analytical from "../data/analytical.json";
import "katex/dist/katex.min.css";
import { BlockMath, InlineMath } from "react-katex";

export default function FormulaBank() {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [searchCourse, setSearchCourse] = useState("");
  const [searchFormula, setSearchFormula] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [formulaSuggestions, setFormulaSuggestions] = useState([]);
  const [showFormulaSuggestions, setShowFormulaSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingFormula, setLoadingFormula] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const formulas = {
    ...thermo,
    ...heat,
    ...fluid,
    ...mtp,
    ...eda,
    // ...analytical,
    // ...cpc,
  };

  const courses = Object.keys(formulas);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedCourse, searchFormula]);

  useEffect(() => {
    if (searchCourse) {
      setLoading(true);
      const timeout = setTimeout(() => setLoading(false), 400);
      return () => clearTimeout(timeout);
    } else {
      setLoading(false);
    }
  }, [searchCourse]);

  useEffect(() => {
    if (selectedCourse && searchFormula) {
      const suggestions = formulas[selectedCourse].filter((formula) =>
        formula.name.toLowerCase().includes(searchFormula.toLowerCase())
      );
      setFormulaSuggestions(suggestions);
      setShowFormulaSuggestions(true);
    } else {
      setFormulaSuggestions([]);
      setShowFormulaSuggestions(false);
    }
  }, [searchFormula, selectedCourse]);

  const globalSuggestions = [];

  courses.forEach((course) => {
    if (course.toLowerCase().includes(searchCourse.toLowerCase())) {
      globalSuggestions.push({ type: "course", label: course, course });
    }
  });

  courses.forEach((course) => {
    formulas[course].forEach((formula) => {
      if (
        formula.name.toLowerCase().includes(searchCourse.toLowerCase()) ||
        formula.description
          .toLowerCase()
          .includes(searchCourse.toLowerCase()) ||
        Object.keys(formula.variables).some((v) =>
          v.toLowerCase().includes(searchCourse.toLowerCase())
        )
      ) {
        globalSuggestions.push({
          type: "formula",
          label: `${formula.name} (${course})`,
          course,
          formulaName: formula.name,
        });
      }
    });
  });

  const filteredFormulas =
    selectedCourse && formulas[selectedCourse]
      ? formulas[selectedCourse].filter(
          (formula) =>
            formula.name.toLowerCase().includes(searchFormula.toLowerCase()) ||
            formula.description
              .toLowerCase()
              .includes(searchFormula.toLowerCase()) ||
            Object.keys(formula.variables).some((v) =>
              v.toLowerCase().includes(searchFormula.toLowerCase())
            )
        )
      : [];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-100 font-sans">
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-gradient-to-br from-white via-blue-200 to-white shadow-xl transform transition-transform duration-300 z-40 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold text-indigo-700">📘 Courses</h2>
          <button
            className="text-gray-900"
            onClick={() => setSidebarOpen(false)}
          >
            ✖
          </button>
        </div>
        <ul className="p-4 space-y-2 overflow-y-auto max-h-[calc(100vh-60px)]">
          {courses.map((course, idx) => (
            <li
              key={idx}
              onClick={() => {
                setSelectedCourse(course);
                setSearchCourse(course);
                setShowSuggestions(false);
                setSearchFormula("");
                setSidebarOpen(false);
              }}
              className={`cursor-pointer px-3 py-2 rounded-lg transition ${
                selectedCourse === course
                  ? "bg-indigo-100 text-indigo-700 font-semibold"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {course}
            </li>
          ))}
        </ul>
      </aside>

      <header className="sticky top-0 z-20 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100 px-4 sm:px-10 pt-6 pb-4 shadow-md">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-center mb-6 text-gray-900 drop-shadow-md">
          📚 Universal Formula Bank
        </h1>

        <button
          className="fixed top-10 left-4 z-50 px-6 py-2 bg-transparent text-gray-900 font-bold rounded-lg shadow-md hover:bg-gradient-to-br from-white via-blue-300 to-white transition sm:top-18"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-4">
          <div className="relative w-full sm:max-w-xl">
            <input
              type="text"
              placeholder="🌍 Search courses or formulas..."
              value={searchCourse}
              onChange={(e) => {
                setSearchCourse(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              className="w-full px-6 py-3 text-gray-900 rounded-xl border border-gray-300 shadow-sm text-lg bg-white focus:outline-none focus:ring-4 focus:ring-indigo-300 transition"
            />

            {loading && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            {showSuggestions && searchCourse && !loading && (
              <ul className="absolute z-30 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
                {globalSuggestions.length > 0 ? (
                  globalSuggestions.map((item, idx) => (
                    <li
                      key={idx}
                      onClick={() => {
                        setSelectedCourse(item.course);
                        setSearchCourse(item.course);
                        setShowSuggestions(false);
                        if (item.type === "formula") {
                          setSearchFormula(item.formulaName);
                        } else {
                          setSearchFormula("");
                        }
                      }}
                      className="px-4 py-2 text-gray-900 cursor-pointer hover:bg-indigo-100 transition"
                    >
                      {item.type === "course"
                        ? `📘 ${item.label}`
                        : `🧮 ${item.label}`}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-900">No courses found</li>
                )}
              </ul>
            )}
          </div>

          {selectedCourse && (
            <div className="relative w-full sm:max-w-xl">
              <input
                type="text"
                placeholder="🔍 Search formulas..."
                value={searchFormula}
                onChange={(e) => setSearchFormula(e.target.value)}
                className="w-full sm:max-w-xl px-4 py-3 text-gray-900 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-300 transition"
              />
              {loadingFormula && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              {showFormulaSuggestions && searchFormula && !loadingFormula && (
                <ul className="absolute z-30 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
                  {formulaSuggestions.length > 0 ? (
                    formulaSuggestions.map((f, idx) => (
                      <li
                        key={idx}
                        onClick={() => {
                          setSearchFormula(f.name);
                          setShowFormulaSuggestions(false);
                        }}
                        className="px-4 py-2 text-gray-900 cursor-pointer hover:bg-indigo-100 transition"
                      >
                        🧮 {f.name}
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-2 text-gray-900">
                      No formulas found
                    </li>
                  )}
                </ul>
              )}
            </div>
          )}
        </div>
      </header>

      <main
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto px-4 sm:px-8 lg:px-12 py-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {selectedCourse ? (
            filteredFormulas.length > 0 ? (
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

                  <p className="text-gray-600 text-justify text-sm sm:text-base mb-3">
                    <span className="text-indigo-700 font-semibold mb-2">
                      Description:{" "}
                    </span>
                    {formula.description}
                  </p>

                  <div className="mt-4">
                    <h3 className="text-indigo-700 font-semibold mb-2">
                      Variables:
                    </h3>
                    <ul className="mt-2 text-sm text-gray-900 list-disc pl-5 space-y-1">
                      {Object.entries(formula.variables).map(
                        ([varName, desc]) => {
                          const isLatex = /\\|_|[\^{}]/.test(varName);
                          return (
                            <li key={varName}>
                              {isLatex ? (
                                <InlineMath math={varName} className="mr-1" />
                              ) : (
                                <span className="text-gray-900 mr-1">
                                  {varName}
                                </span>
                              )}
                              : {desc}
                            </li>
                          );
                        }
                      )}
                    </ul>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center text-center animate-fadeIn px-4">
                <p className="text-center text-gray-600 mb-4 text-base sm:text-lg">
                  ❌ No formulas found matching your search.
                </p>
                <Image
                  src="/error.png"
                  alt="Engineer illustration"
                  width={300}
                  height={300}
                  className="px-5 mx-auto max-w-[70%] sm:max-w-xs md:max-w-sm lg:max-w-md h-auto rounded-2xl shadow-xl"
                  priority
                />
              </div>
            )
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center text-center animate-fadeIn px-4">
              <p className="text-center text-gray-600 mb-5 text-base sm:text-lg">
                👉 Please search for a course or formula in the search box above
                to view formulas.
              </p>
              <Image
                src="/drop-down-menu.png"
                alt="Engineer illustration"
                width={300}
                height={300}
                className="px-5 mx-auto max-w-[70%] sm:max-w-xs md:max-w-sm lg:max-w-md h-auto rounded-2xl shadow-xl"
                priority
              />
            </div>
          )}
        </div>
      </main>

      <footer className="sticky bottom-0 shrink-0 w-full bg-gradient-to-br from-white-500 via-blue-300 to-white-500 shadow-lg">
        <div className="max-w-8xl mx-auto px-4 sm:px-10 py-4 flex justify-center">
          <Link href="/">
            <button className="w-full sm:w-auto px-10 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition transform hover:scale-105">
              🏠 Back to Home
            </button>
          </Link>
        </div>
      </footer>
    </div>
  );
}
