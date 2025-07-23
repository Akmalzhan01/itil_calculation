import { useState } from "react";
import { CiInboxIn } from "react-icons/ci";
import { CiInboxOut } from "react-icons/ci";
import { IoBarChartOutline } from "react-icons/io5";
import logo from "./assets/logo.png";
import InCome from "./pages/InCome";
import Stats from "./pages/Stats";
import Сonsumption from "./pages/Сonsumption";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-50">
      {/* Header */}
      <header className="p-4 bg-white shadow-sm flex animate-pulse">
        <img className="mr-4" src={logo} width={40} alt="logo" />
        <h1 className="text-xl font-bold text-gray-800">ITил - финанс</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4">
        {/* Page Content - changes based on active tab */}
        {activeTab === "home" && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Статистика</h2>
            <Stats />
          </div>
        )}
        {activeTab === "search" && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Приход</h2>
            <InCome />
          </div>
        )}
        {activeTab === "favorites" && (
          <div>
            <Сonsumption />
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 flex justify-around items-center p-3">
        <button
          onClick={() => setActiveTab("home")}
          className={`flex flex-col items-center p-2 ${
            activeTab === "home" ? "text-blue-500" : "text-gray-500"
          }`}
        >
          <IoBarChartOutline className="text-xl" />
          <span className="text-xs mt-1">Статистик</span>
        </button>
        <button
          onClick={() => setActiveTab("search")}
          className={`flex flex-col items-center p-2 ${
            activeTab === "search" ? "text-green-600" : "text-gray-500"
          }`}
        >
          <CiInboxIn className="text-xl" />
          <span className="text-xs mt-1">Приход</span>
        </button>
        <button
          onClick={() => setActiveTab("favorites")}
          className={`flex flex-col items-center p-2 ${
            activeTab === "favorites" ? "text-red-500" : "text-gray-500"
          }`}
        >
          <CiInboxOut className="text-xl" />
          <span className="text-xs mt-1">Расход</span>
        </button>
      </nav>
    </div>
  );
}
