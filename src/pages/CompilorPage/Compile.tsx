import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {  Sun, Moon } from "lucide-react";
import ExampleComponent  from  "../../components/ui/CompilorAnimation";
import {  useNavigate } from "react-router-dom"; 
import { FaHome } from "react-icons/fa";
const Compile = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
  const [fileName, setFileName] = useState("main.js");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  const navigate = useNavigate(); 
 
  const handleLanguageChange = (e: { target: { value: any; }; }) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);

    const fileExtensions = {
      javascript: "main.js",
      python: "main.py",
      php: "main.php",
      typescript: "main.ts",
      rust: "main.rs",
      ruby: "main.rb",
      c: "main.c",
    } as const;
    setFileName(fileExtensions[selectedLanguage as keyof typeof fileExtensions] || "main.js");
  };

  const executeCode = async () => {
    setLoading(true);
    try {
      const response = await axios.post("https://backedai-production.up.railway.app/ai/execute-code", {
        code,
        language,
      });
      setOutput(response.data.output || response.data.error);
    } catch (error) {
      console.error("Execution error:", error);
      setOutput("Error  of executing code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center   p-6 transition-all duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <ExampleComponent />
      <button
              // href="/add-rental"
              onClick={() => navigate("/")}
              className="fixed bottom-20 right-20 p-4 z-50 bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 rounded-full shadow-lg hover:from-yellow-500 hover:to-amber-600 transition-all duration-500 transform hover:scale-110 focus:ring-2 focus:ring-yellow-300 animate-[bounce_2s_ease-in-out_infinite]"
            >
              <FaHome size={24}/>
              </button>
      <motion.h2 
        className="text-2xl font-bold mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Code Compiler
      </motion.h2>

      <button onClick={toggleTheme} className=" absolute top-4 right-4 px-4 py-2 p-2 rounded-md flex items-center gap-2">
            {darkMode ? <Sun size={22} /> : <Moon size={22} />}
          </button>

      <p className="mb-2 text-gray-400">Editing: <strong>{fileName}</strong></p>
      
      <textarea
        className={`w-full max-w-2xl p-3 rounded-md border outline-none transition-all duration-300 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`}
        rows={10}
        placeholder="Write your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      ></textarea>
      
      <div className="mt-4 flex gap-4">
        <select
          className={`p-2 rounded-md border transition-all duration-300 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`}
          value={language}
          onChange={handleLanguageChange}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python 🐍</option>
          <option value="php">PHP</option>
          <option value="typescript">TypeScript (TS)</option>
          <option value="rust">Rust 🦀</option>
          <option value="ruby">Ruby</option>
          <option value="c">C</option>
        </select>

        <motion.button
          className="px-4 py-2 bg-blue-600 rounded-md text-white shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={executeCode}
          disabled={loading}
        >
          {loading ? "Executing..." : "Run Code"}
        </motion.button>
      </div>
      
      <motion.pre 
        className={`mt-4 p-4 rounded-md w-full max-w-2xl border overflow-auto transition-all duration-300 ${darkMode ? 'bg-gray-800 border-gray-700 text-green-400' : 'bg-white border-gray-300 text-green-600'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {output || "Output will be displayed here..."}
      </motion.pre>
    </div>
  );
};

export default Compile;