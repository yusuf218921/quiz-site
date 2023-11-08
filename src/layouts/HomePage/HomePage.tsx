import RandomQuiz from "./components/RandomQuiz";
import Carousel from "./components/Carousel";
import { Heros } from "./components/Heros";
import { QuizServices } from "./components/QuizService";

const HomePage = () => {
  return (
    <div>
      <RandomQuiz />
      <Carousel />
      <Heros />
      <QuizServices />
    </div>
  );
};

export default HomePage;
