import Otp from "/src/components/Otp/Otp";
import ProgressBar from "/src/components/ProgressBar/ProgressBar";
import FileFolderStructure from "/src/components/FileFolderStructure/FileFolderStructure";
import { main_container } from "./App.module.css";

function App() {
  const progressBars = [10, 50, 100];
  return (
    <div className={main_container}>
      <Otp />
      {progressBars.map((progress) => (
        <ProgressBar progress={progress} key={progress} />
      ))}
      <FileFolderStructure />
    </div>
  );
}

export default App;
