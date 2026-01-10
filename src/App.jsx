import { main_container } from "./App.module.css";
import Otp from "/src/components/Otp/Otp";
import ProgressBar from "/src/components/ProgressBar/ProgressBar";
import FileFolderStructure from "/src/components/FileFolderStructure/FileFolderStructure";
import SearchBar from "/src/components/SearchBar/SearchBar";
import Pagination from "./components/Pagination/Pagination";
import TabForm from "./components/TabForm/TabForm";
import NestedCheckBoxes from "./components/NestedCheckBoxes/NestedCheckBoxes";
import Chips from "./components/Chips/Chips";
import TodoList from "./components/TodoList/TodoList";
import Accordion from "./components/Accordion/Accordion";

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
      {/* <Pagination /> */}
      {/* <TabForm /> */}
      {/* <NestedCheckBoxes /> */}
      {/* <Chips /> */}
      {/* <TodoList /> */}
      <Accordion />
    </div>
  );
}

export default App;
