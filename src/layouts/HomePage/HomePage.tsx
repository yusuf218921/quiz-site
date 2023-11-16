import RandomQuiz from "./components/RandomQuiz";
import Carousel from "./components/Carousel";
import { Heros } from "./components/Heros";
import { QuizServices } from "./components/QuizService";
import { Navbar } from "../NavbarAndFooter/Navbar";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <RandomQuiz />
      <Carousel />
      <Heros />
      <QuizServices />
    </div>
  );
};

export default HomePage;
