import { Route, Routes } from "react-router-dom";
import "./App.css";

import "./fonts/alev.ttf";
import HomePage from "./layouts/HomePage/HomePage";
import { Footer } from "./layouts/NavbarAndFooter/Footer";
import SearchQuizPage from "./layouts/SearchQuiz/SearchQuizPage";
import { Navbar } from "./layouts/NavbarAndFooter/Navbar";
import LoginPage from "./layouts/LoginPage/LoginPage";
import RegisterPage from "./layouts/RegisterPage/RegisterPage";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchQuizPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
