import Otp from '/src/components/Otp/Otp';
import ProgressBar from '/src/components/ProgressBar/ProgressBar';
import { main_container } from './App.module.css';

function App() {
  const progressBars = [
    0, 1, 2, 3, 4, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100,
  ];
  return (
    <div className={main_container}>
      <Otp />
      {progressBars.map((progress) => (
        <ProgressBar progress={progress} />
      ))}
    </div>
  );
}

export default App;
