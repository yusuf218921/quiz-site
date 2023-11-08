import "./App.css";

import "./fonts/alev.ttf";
import HomePage from "./layouts/HomePage/HomePage";
import { Footer } from "./layouts/NavbarAndFooter/Footer";

import { Navbar } from "./layouts/NavbarAndFooter/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <HomePage />
      <Footer />
    </>
  );
}

export default App;
