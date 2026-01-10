import Otp from "/src/components/Otp/Otp";
import ProgressBar from "/src/components/ProgressBar/ProgressBar";
import FileFolderStructure from "/src/components/FileFolderStructure/FileFolderStructure";
import SearchBar from "/src/components/SearchBar/SearchBar";
import { main_container } from "./App.module.css";
import Pagination from "./components/Pagination/Pagination";

function App() {
  // const progressBars = [10, 50, 100];
  return (
    <div className={main_container}>
      {/* <Otp /> */}
      {/* {progressBars.map((progress) => (
        <ProgressBar progress={progress} key={progress} />
      ))} */}
      {/* <FileFolderStructure /> */}
      {/* <SearchBar /> */}
      <Pagination />
    </div>
  );
}

export default App;
