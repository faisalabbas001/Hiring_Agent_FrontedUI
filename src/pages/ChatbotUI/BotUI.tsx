
 import { useState, useEffect, useRef } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import { Menu, X, Send, Copy, ClipboardCheck, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BeatLoader } from "react-spinners";
import imageSrc from "/profile.png";
import Accordion  from "../../components/ui/Accordion";
import {  useNavigate } from "react-router-dom"; 
import { Terminal } from "lucide-react";
 // Make sure you have this import  
 const BotUI = () => {

    const [code, setCode] = useState<string>("function sum() {\n  return 1 + 1;\n}");
    const [review, setReview] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
    const [copied, setCopied] = useState(false);
    const [darkMode, setDarkMode] = useState<boolean>(true);
    const chatEndRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate(); 
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth >= 768) {
          setSidebarOpen(true); // Open sidebar on larger screens
        } else {
          setSidebarOpen(false); // Close sidebar on smaller screens
        }
      };
  
      window.addEventListener("resize", handleResize);
      handleResize(); // Call on mount to set initial state
  
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);
  
    useEffect(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [review, loading]);
  
    const toggleTheme = () => {
      setDarkMode((prev) => !prev);
    };
  
    const copyToClipboard = async () => {
      await navigator.clipboard.writeText(review);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };
  
    const reviewCode = async () => {
      setLoading(true);
      setReview("");
      try {
        const response = await axios.post("https://backed-ai.vercel.app/ai/get-review", { code });
        setReview(response.data);
      } catch (error) {
        setReview("⚠️ Error: Failed to get review. Please try again.");
        console.error("Review API error:", error);
      }
      setLoading(false);
    };
   return (
    <div className={`flex h-screen w-full ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
    {/* Sidebar */}
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: sidebarOpen ? 0 : -300 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fixed md:relative w-64 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"} shadow-lg p-6 z-50 h-full`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          CodeGenius AI <span role="img" aria-label="sparkles">✨✨</span>
        </h2>
        <X className="md:hidden cursor-pointer" onClick={() => setSidebarOpen(false)} />
      </div>
      <div>
        <Accordion />
      </div>
    </motion.aside>

    {/* Main Content */}
    <main className="flex-1 flex flex-col p-4 md:p-6 w-full overflow-hidden">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col rounded-xl h-full w-full overflow-hidden">
        {/* Header */}
        <div className="border-b p-4 flex items-center justify-between flex-wrap">
          <button className="md:hidden p-2" onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <div className="flex-grow"></div>
          <button onClick={toggleTheme} className="p-2 rounded-md flex items-center gap-2">
            {darkMode ? <Sun size={22} /> : <Moon size={22} />}
          </button>
        </div>

        {/* Content Area */}
        <div className="max-w-full  overflow-y-auto p-4 space-y-6">
          {/* Code Editor Section */}
          <motion.div className={`rounded-lg p-4 shadow-lg ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
            <div className="flex justify-between items-center mb-4">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${darkMode ? "bg-blue-400" : "bg-blue-500"}`}>
                <img src={imageSrc} alt="icon" className="h-full w-full rounded-full" />
              </div>
              <button onClick={copyToClipboard} className="text-sm flex items-center gap-1">
                {copied ? <ClipboardCheck size={16} /> : <Copy size={16} />} Copy
              </button>
            </div>
            <Editor
              value={code}
              onValueChange={setCode}
              highlight={(code) => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={12}
              className={`font-mono ${darkMode ? "text-white bg-gray-800 border-gray-700" : "text-black bg-white border-gray-300"}`}
              style={{ minHeight: "150px", lineHeight: "1.5" }}
            />
            <button onClick={reviewCode} disabled={loading} className="mt-4 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium flex items-center justify-center gap-2">
              {loading ? <BeatLoader size={8} color="#ffffff" /> : <><Send size={18} /> Get Code Review</>}
            </button>
          </motion.div>

          {/* AI Response Section */}
          <AnimatePresence>
            {loading ? (
              <motion.div className="flex justify-center items-center">
                <video autoPlay loop muted className="w-full h-full">
                  <source src="/video.mp4" type="video/mp4" />
                </video>
              </motion.div>
            ) : review && (
              <motion.div className={`border rounded-lg p-4 max-w-full ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"} overflow-auto`}>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${darkMode ? "bg-blue-400" : "bg-blue-500"} text-white`}>AI</div>
                    <h3 className="font-medium text-lg">
                      Code Review <span role="img" aria-label="check mark">✅</span>
                    </h3>
                  </div>
                   

                  {/* <button   className="text-sm flex items-center gap-1"    >
                     Execute
                  </button>  */}

                  <button
              // href="/add-rental"
              onClick={() => navigate("/compile")}
              className="fixed bottom-20 right-20 p-4 z-50 bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 rounded-full shadow-lg hover:from-yellow-500 hover:to-amber-600 transition-all duration-500 transform hover:scale-110 focus:ring-2 focus:ring-yellow-300 animate-[bounce_2s_ease-in-out_infinite]"
            >
              
              <Terminal size={24} />
            </button>
                  <button onClick={copyToClipboard} className="text-sm flex items-center gap-1">
                    {copied ? <ClipboardCheck size={16} /> : <Copy size={16} />} Copy
                  </button>
                </div>
                <div className="max-w-full overflow-x-auto">
                  <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={chatEndRef} />
        </div>
      </motion.div>
    </main>
  </div>
   )
 }
 
 export default BotUI