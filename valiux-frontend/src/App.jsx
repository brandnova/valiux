import { useState } from "react";
import LoginRegisterPage from "./components/LoginRegisterPage";
import NovelDetailsPage from "./components/NovelDetailsPage";
import NovelPlatform from "./components/NovelPlatform";
import NovelReader from "./components/NovelReader";

function App() {
  const [activePage, setActivePage] = useState("login");

  const renderPage = () => {
    switch (activePage) {
      case "login":
        return <LoginRegisterPage />;
      case "details":
        return <NovelDetailsPage />;
      case "platform":
        return <NovelPlatform />;
      case "reader":
        return <NovelReader />;
      default:
        return <LoginRegisterPage />;
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-gray-50 text-gray-800">
      {/* Full Page Content */}
      <div className="h-screen w-full p-6 overflow-auto">{renderPage()}</div>

      {/* Floating Navigation Panel */}
      <div className="fixed bottom-6 right-6 bg-white/90 shadow-lg rounded-lg border border-amber-500 backdrop-blur-sm">
        <div className="flex flex-col">
          <button
            onClick={() => setActivePage("login")}
            className={`px-4 py-2 text-sm font-medium hover:bg-amber-500 hover:text-white transition ${
              activePage === "login" ? "bg-amber-500 text-white" : "text-amber-600"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActivePage("details")}
            className={`px-4 py-2 text-sm font-medium hover:bg-amber-500 hover:text-white transition ${
              activePage === "details" ? "bg-amber-500 text-white" : "text-amber-600"
            }`}
          >
            Details
          </button>
          <button
            onClick={() => setActivePage("platform")}
            className={`px-4 py-2 text-sm font-medium hover:bg-amber-500 hover:text-white transition ${
              activePage === "platform" ? "bg-amber-500 text-white" : "text-amber-600"
            }`}
          >
            Platform
          </button>
          <button
            onClick={() => setActivePage("reader")}
            className={`px-4 py-2 text-sm font-medium hover:bg-amber-500 hover:text-white transition ${
              activePage === "reader" ? "bg-amber-500 text-white" : "text-amber-600"
            }`}
          >
            Reader
          </button>
        </div>
      </div>
    </div>
  );
}

export default App
