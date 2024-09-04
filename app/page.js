"use client";

import { useChat } from "ai/react";
import { Bot, User2 } from "lucide-react";
import Markdown from "./component/markdown";
import { useState } from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";


// Define subjects and subtopics
const subjectsWithSubtopics = {
  "Multiplication": [
    "Tables of 1-11"
  ],
  "SAT Math": [
    "Algebra",
    "Problem Solving and Data Analysis",
    "Advanced Math",
    "Geometry and Trigonometry"
  ],
  "SAT Writing": [
    "Expression of Ideas",
    "Standard English Conventions"
  ],
  "AP Art History": [
    "Global Prehistory",
    "Ancient Mediterranean",
    "Early Europe and Colonial Americas",
    "Late Europe and Americas",
    "Africa",
    "West and Central Asia",
    "South, East, and Southeast Asia",
    "The Americas"
  ],
  "AP Biology": [
    "Evolution",
    "Cell Structure and Function",
    "Hereditary",
    "Gene Expression and Regulation",
    "Cell Communication",
    "Ecology",
    "Interdependence of Organisms",
    "Biological Systems"
  ],
  "AP Calculus AB": [
    "Limits and Continuity",
    "Differentiation: Definition and Fundamental Properties",
    "Differentiation: Composite, Implicit, and Inverse Functions",
    "Contextual Applications of Differentiation",
    "Integration and Accumulation of Change",
    "Differential Equations",
    "Applications of Integration",
    "Fundamental Theorem of Calculus"
  ],
  "AP Calculus BC": [
    "Sequences and Series",
    "Polar Coordinates and Parametric Equations",
    "Advanced Integration Techniques",
    "Vector Functions and Calculus",
    "Calculus of Vector Functions",
    "Advanced Topics in Differential Equations",
    "Applications of Differential Equations",
    "Fundamental Theorem of Calculus"
  ],
  "AP Chemistry": [
    "Atomic Structure and Properties",
    "Molecular and Ionic Compound Structure and Properties",
    "Intermolecular Forces and Properties",
    "Chemical Reactions",
    "Kinetics",
    "Thermodynamics",
    "Equilibrium",
    "Acids and Bases",
    "Applications of Thermodynamics",
    "Electrochemistry"
  ],
  "AP Chinese Language & Culture": [
    "Communication",
    "Cultures",
    "Connections",
    "Comparisons",
    "Communities"
  ],
  "AP Comparative Government & Politics": [
    "Introduction to Comparative Politics",
    "Political Systems and Regimes",
    "Political Institutions",
    "Public Policy and Administration",
    "Political Culture and Participation",
    "Comparative Political Analysis"
  ],
  "AP Computer Science A": [
    "Primitive Types",
    "Using Objects",
    "Boolean Expressions and Conditional Statements",
    "Iteration",
    "Writing Classes",
    "Inheritance",
    "Array",
    "ArrayList",
    "2D Arrays"
  ],
  "AP Computer Science Principles": [
    "Creative Development",
    "Data Analysis",
    "Algorithms and Programming",
    "The Internet",
    "Impact of Computing"
  ],
  "AP English Language and Composition": [
    "Rhetorical Analysis of Nonfiction Texts",
    "Argumentative Writing",
    "Synthesis of Sources",
    "Grammar and Style",
    "Composition and Revision"
  ],
  "AP English Literature and Composition": [
    "Reading and Analysis of Literary Texts",
    "Poetry Analysis",
    "Drama Analysis",
    "Prose Analysis",
    "Literary Criticism"
  ],
  "AP Environmental Science": [
    "Earth Systems and Resources",
    "The Living World",
    "Population",
    "Land and Water Use",
    "Energy Resources and Consumption",
    "Pollution",
    "Global Change"
  ],
  "AP European History": [
    "The Renaissance and Reformation",
    "Absolutism and Enlightenment",
    "Revolutions and Nationalism",
    "Industrialization and Imperialism",
    "World Wars and Cold War",
    "Contemporary Europe"
  ],
  "AP French Language & Culture": [
    "Communication",
    "Cultures",
    "Connections",
    "Comparisons",
    "Communities"
  ],
  "AP German Language & Culture": [
    "Communication",
    "Cultures",
    "Connections",
    "Comparisons",
    "Communities"
  ],
  "AP Human Geography": [
    "Geography: Its Nature and Perspectives",
    "Population and Migration",
    "Cultural Patterns and Processes",
    "Political Organization of Space",
    "Agriculture and Rural Land Use",
    "Industrialization and Economic Development",
    "Cities and Urban Land Use",
    "Environmental and Social Issues"
  ],
  "AP Italian Language & Culture": [
    "Communication",
    "Cultures",
    "Connections",
    "Comparisons",
    "Communities"
  ],
  "AP Japanese Language and Culture": [
    "Communication",
    "Cultures",
    "Connections",
    "Comparisons",
    "Communities"
  ],
  "AP Latin": [
    "Vergil's Aeneid",
    "Caesar's Gallic Wars",
    "Latin Grammar and Syntax",
    "Historical and Cultural Context"
  ],
  "AP Macroeconomics": [
    "Basic Economic Concepts",
    "National Income Accounting",
    "Long-Run Economic Growth",
    "Business Cycles",
    "Fiscal Policy",
    "Monetary Policy",
    "Inflation",
    "International Trade and Finance"
  ],
  "AP Microeconomics": [
    "Basic Economic Concepts",
    "Supply and Demand",
    "Production and Costs",
    "Market Structures",
    "Factor Markets",
    "Market Failures",
    "Government Intervention"
  ],
  "AP Music Theory": [
    "Fundamentals of Music Theory",
    "Harmony",
    "Form and Analysis",
    "Music History and Literature",
    "Ear Training"
  ],
  "AP Physics 1: Algebra-Based": [
    "Kinematics",
    "Dynamics",
    "Circular Motion and Gravitation",
    "Energy",
    "Momentum",
    "Simple Harmonic Motion",
    "Mechanical Waves and Sound",
    "Electric Circuits"
  ],
  "AP Physics 2: Algebra-Based": [
    "Fluid Mechanics",
    "Thermodynamics",
    "Electric Force, Field, and Potential",
    "Electric Circuits",
    "Magnetism",
    "Electromagnetic Induction and Waves",
    "Geometric Optics",
    "Quantum Physics"
  ],
  "AP Physics C: Electricity & Magnetism": [
    "Electrostatics",
    "Electric Fields",
    "Electric Potential",
    "Capacitors",
    "Current and Resistance",
    "Magnetic Fields",
    "Electromagnetic Induction",
    "AC Circuits"
  ],
  "AP Physics C: Mechanics": [
    "Kinematics",
    "Newton's Laws",
    "Work, Energy, and Power",
    "Systems of Particles and Linear Momentum",
    "Rotation",
    "Oscillations",
    "Gravitation",
    "Mechanical Waves"
  ],
  "AP Psychology": [
    "Research Methods",
    "Biological Bases of Behavior",
    "Cognitive Processes",
    "Developmental Psychology",
    "Motivation and Emotion",
    "Personality",
    "Abnormal Psychology",
    "Treatment of Psychological Disorders"
  ],
  "AP Research": [
    "Research Methodologies",
    "Data Collection and Analysis",
    "Ethical Considerations",
    "Research Design and Implementation",
    "Presentation and Reflection"
  ],
  "AP Seminar": [
    "Inquiry and Research",
    "Argumentation and Evidence",
    "Synthesis and Analysis",
    "Collaboration and Presentation"
  ],
  "AP Spanish Language & Culture": [
    "Communication",
    "Cultures",
    "Connections",
    "Comparisons",
    "Communities"
  ],
  "AP Spanish Literature & Culture": [
    "Reading and Analysis of Literary Texts",
    "Poetry Analysis",
    "Drama Analysis",
    "Prose Analysis",
    "Literary Criticism"
  ],
  "AP Statistics": [
    "Exploring Data",
    "Sampling and Experimentation",
    "Anticipating Patterns",
    "Statistical Inference"
  ],
  "AP Studio Art: 2-D Design": [
    "Design Principles",
    "Drawing and Painting",
    "Digital Media",
    "Mixed Media"
  ],
  "AP Studio Art: 3-D Design": [
    "Sculpture",
    "Functional Design",
    "Mixed Media",
    "Installation Art"
  ],
  "AP Studio Art: Drawing": [
    "Drawing Techniques",
    "Rendering",
    "Composition",
    "Expressive Techniques"
  ],
  "AP U.S. Government & Politics": [
    "Constitutional Underpinnings",
    "Political Beliefs and Behaviors",
    "Political Parties, Interest Groups, and Mass Media",
    "Institutions of National Government",
    "Public Policy",
    "Civil Rights and Civil Liberties"
  ],
  "AP U.S. History": [
    "Period 1: 1491–1607",
    "Period 2: 1607–1754",
    "Period 3: 1754–1800",
    "Period 4: 1800–1848",
    "Period 5: 1844–1877",
    "Period 6: 1865–1898",
    "Period 7: 1890–1945",
    "Period 8: 1945–1980",
    "Period 9: 1980–Present"
  ],
  "AP World History: Modern": [
    "The Global Tapestry",
    "Networks of Exchange",
    "Land-Based Empires",
    "Transoceanic Interconnections",
    "Revolutions",
    "Consequences of Industrialization",
    "Global Conflict",
    "Cold War and Decolonization",
    "Globalization"
  ]
};

// Add "Miscellaneous" to each subject's subtopics
Object.keys(subjectsWithSubtopics).forEach(subject => {
  subjectsWithSubtopics[subject].push("Miscellaneous");
});




export default function Home() {
  const [subject, setSubject] = useState("");
  const [subtopic, setSubtopic] = useState("");
  const [difficulty, setDifficulty] = useState("Easy"); // New state for difficulty
  const [problem, setProblem] = useState("");
  const [choices, setChoices] = useState([]);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [correctChoice, setCorrectChoice] = useState(null);
  const [streak, setStreak] = useState(0);
  const [override, setOverride] = useState(false);
  const [previousStreak, setPreviousStreak] = useState(0);

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
    setSubtopic("");
  };

  

  const generateProblem = async (retryCount = 0) => {
    if (!subject || !subtopic) {
      alert("Please select both subject and subtopic.");
      return;
    }
  
    const uniqueId = `${new Date().getTime()}-${Math.floor(Math.random() * 1000)}`;
    const promptText = `
      Generate a ${difficulty.toLowerCase()} difficulty practice problem for the subject ${subject} and subtopic ${subtopic}. The problem should be formatted EXACTLY as follows, including the line breaks, don't use any text formatting (no $, no **, ):
  
      **Practice Problem: ${subject} - ${subtopic}**
  
      [Problem statement goes here (NO LINE BREAKS / no longer than 25 words)]
  
      A) [First answer choice]
      B) [Second answer choice]
      C) [Third answer choice]
      D) [Fourth answer choice]
  
      Correct Answer: [Correct answer choice letter]
  
      Ensure that: 
      - The problem statement is clear and concise.
      - Each answer choice is distinct and plausible.
      - The answer choices are listed in alphabetical order.
      - The correct answer is included in the problem text in a way that's not immediately obvious. Unique Identifier: ${uniqueId}
    
      Output should be in plain text and formatted as shown above.
    `;
  
    try {
      const res = await fetch("/api/llm-response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify({
          data: { prompt: promptText },
        }),
      });
  
      const text = await res.text();
      const parsedContent = parseProblemAndChoices(text);
      setProblem(parsedContent.problem);
      setChoices(parsedContent.choices);
      setCorrectChoice(parsedContent.correctChoice);
      setSelectedChoice(null);
      setOverride(false);
      setPreviousStreak(streak);
    } catch (error) {
      console.error("Error generating problem:", error);
  
      if (retryCount < 3) { // Retry up to 3 times
        console.log(`Retrying... Attempt ${retryCount + 1}`);
        generateProblem(retryCount + 1);
      } else {
        setProblem("Error generating problem.");
        setChoices([]);
      }
    }
  };

  const handleChoiceSelection = (choice) => {
    setSelectedChoice(choice);
    const selectedLetter = choice.charAt(0);

    if (selectedLetter === correctChoice) {
      setStreak(streak + 1);
    } else {
      setPreviousStreak(streak);
      setStreak(0);
    }
  };

  const handleOverride = () => {
    setOverride(true);
    setStreak(previousStreak);
  };

  const parseProblemAndChoices = (response) => {
    const responseString = response.trim();
    const lines = responseString.split("\n").map(line => line.trim()).filter(Boolean);

    const problemLineIndex = lines.findIndex(line => line.startsWith("**Practice Problem"));
    if (problemLineIndex === -1) {
      throw new Error("Problem format is incorrect.");
    }

    const problem = lines[problemLineIndex + 1];
    const choiceLines = lines.slice(problemLineIndex + 2, problemLineIndex + 6);
    const choices = choiceLines.map(choice => choice.trim());

    const correctAnswerLine = lines.find(line => line.startsWith("Correct Answer:"));
    if (!correctAnswerLine) {
      throw new Error("Correct answer format is incorrect.");
    }
    const correctChoice = correctAnswerLine.split(":")[1]?.trim();

    if (!["A", "B", "C", "D"].includes(correctChoice)) {
      throw new Error("Correct answer is not in a valid format.");
    }

    return { problem, choices, correctChoice };
  };

  return (
    <div className="bg-black">
      <main className="w-full flex min-h-screen flex-col items-center justify-center p-6 text-orange-400">
        <h1 className="text-xs sm:text-sm md:text-base text-white bg-opacity-50 bg-black p-4 mb-4 md:mb-8 opacity-40 z-40 text-center">
          This app is in beta, report issues to <span className="font-bold">meer.r.patel@gmail.com</span> / Created by <span className="font-bold">Meer Patel</span>
        </h1>
        <h1 className="text-3xl sm:text-5xl md:text-8xl font-bold text-gray-700 bg-opacity-50 mb-6 sm:mb-8 md:mb-12 z-40">
          quickfire
        </h1>
  
        <div className="w-full flex flex-wrap justify-center gap-4 mb-4 z-40">
          <select
            value={subject}
            onChange={handleSubjectChange}
            className="bg-gray-800 text-white outline-none w-full sm:w-48 md:w-60 px-4 py-2 h-12 rounded-sm hover:bg-gray-700 transition-colors"
          >
            <option value="" disabled>Choose a Subject</option>
            {Object.keys(subjectsWithSubtopics).map((sub, index) => (
              <option key={index} value={sub}>{sub}</option>
            ))}
          </select>
          {subject && (
            <select
              value={subtopic}
              onChange={(e) => setSubtopic(e.target.value)}
              className="bg-gray-800 text-white outline-none w-full sm:w-48 md:w-60 px-4 py-2 h-12 rounded-sm hover:bg-gray-700 transition-colors"
            >
              <option value="" disabled>Choose a Unit</option>
              {subjectsWithSubtopics[subject].map((subtopic, index) => (
                <option key={index} value={subtopic}>{subtopic}</option>
              ))}
            </select>
          )}
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="bg-gray-800 text-white outline-none w-full sm:w-32 md:w-40 px-4 py-2 h-12 rounded-sm hover:bg-gray-700 transition-colors"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
  
        <div className="flex justify-center items-center flex-wrap">
          <div className="flex flex-col md:flex-row items-center mb-4">
            <button
              onClick={generateProblem}
              className="w-full md:w-60 bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-500 transition-colors mt-4 md:mr-6 h-12"
            >
              Generate Problem
            </button>
            <div className="flex justify-center items-center mt-4 md:mt-0">
              <p className="text-white text-2xl sm:text-3xl md:text-4xl">🔥{streak}</p>
            </div>
          </div>
        </div>
  
        <div className={`w-full max-w-lg px-6 py-4 rounded-lg shadow-lg mt-4 ${problem ? 'bg-gray-900' : ''}`}>
          {problem && (
            <div className="w-full mb-4 p-4 rounded-md">
              <h2 className="text-lg md:text-xl font-semibold mb-6 text-white">{problem}</h2>
              <ul className="mt-2">
                {choices.map((choice, index) => (
                  <li key={index} className="mt-2">
                    <button
                      onClick={() => handleChoiceSelection(choice)}
                      className={`w-full px-4 py-2 rounded-sm text-left ${
                        selectedChoice && selectedChoice.charAt(0) === correctChoice
                          ? selectedChoice === choice
                            ? "bg-green-500 text-white font-bold"
                            : "bg-gray-700 text-white"
                          : selectedChoice === choice
                            ? "bg-red-500 text-white font-bold"
                            : "bg-gray-700 text-white"
                      } hover:bg-gray-600 transition-colors`}
                    >
                      {choice}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="flex justify-center items-center">
                <button
                  onClick={generateProblem}
                  className="w-full md:w-60 bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-500 transition-colors mt-6 mb-4 h-12 mx-8"
                >
                  Next
                </button>
              </div>
  
              <div className="flex justify-center">
                <button
                  onClick={handleOverride}
                  className="w-full md:w-180 text-cyan-500 hover:text-cyan-400 py-2 rounded-lg transition-colors h-4 mx-8"
                >
                  Override Incorrect Answer
                </button>
              </div>
            </div>
          )}
        </div>
        <h1 className="text-xs sm:text-sm md:text-base text-white bg-opacity-50 bg-black p-4 opacity-40 z-40 mt-8 text-center">
          Donate HERE so I can invest in a better AI model to make better questions
        </h1>
      </main>
    </div>
  );
}
