import { Routes, Route } from "react-router-dom";
import ChatBotUi from "./pages/ChatbotUI/BotUI";
import CompilePage from "./pages/CompilorPage/Compile";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ChatBotUi />} />
      <Route path="/compile" element={<CompilePage />} />
    </Routes>
  );
};

export default App;
