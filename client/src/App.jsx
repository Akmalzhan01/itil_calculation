import logo from "./assets/logo.png";
import InCome from "./pages/InCome";
import Stats from "./pages/Stats";
import Сonsumption from "./pages/Сonsumption";
import Navigation from "./components/nav/Navigation";
import { Route, Routes } from "react-router-dom";

export default function App() {

  return (
      <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-50">
        {/* Header */}
        <header className="p-4 bg-white shadow-sm flex animate-pulse">
          <img className="mr-4" src={logo} width={40} alt="logo" />
          <h1 className="text-xl font-bold text-gray-800">ITил - финанс</h1>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4">
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <h2 className="text-lg font-semibold mb-4">Статистика</h2>
                  <Stats />
                </div>
              }
            />
            <Route
              path="/income"
              element={
                <div>
                  <h2 className="text-lg font-semibold mb-4">Приход</h2>
                  <InCome />
                </div>
              }
            />
            <Route
              path="/expense"
              element={
                <div>
                  <Сonsumption />
                </div>
              }
            />
          </Routes>
        </main>
        <Navigation />
      </div>
  );
}
