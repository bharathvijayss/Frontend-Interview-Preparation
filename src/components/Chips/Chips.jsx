import { useState } from "react";
import {
  chip_item,
  chip_list_container,
  remove_btn,
  chip_input_box,
  chip_container,
} from "./Chips.module.css";

const Chips = () => {
  const [chipText, setChipText] = useState("");
  const [chipList, setChipList] = useState([]);

  const handleEnterKey = (e) => {
    if (e.key === "Enter" && chipText.trim() !== "") {
      setChipList((prev) => [...prev, chipText]);
      setChipText("");
    }
  };

  const removeChip = (index) => {
    setChipList((prev) => {
      const updatedList = structuredClone(prev);
      updatedList.splice(index, 1);
      return updatedList;
    });
  };

  return (
    <div className={chip_container}>
      <input
        className={chip_input_box}
        type="text"
        value={chipText}
        onChange={(e) => setChipText(e.target.value)}
        onKeyDown={(e) => handleEnterKey(e)}
        placeholder="Type and press Enter to add a chip...."
      />
      <div className={chip_list_container}>
        {chipList.map((chip, index) => (
          <span className={chip_item} key={chip}>
            {chip}
            <span className={remove_btn} onClick={() => removeChip(index)}>
              ❌
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Chips;
