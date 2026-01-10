import { CHECKBOX_DATA } from "./utils/constant";
import { check_box_group_container } from "./NestedCheckBoxes.module.css";
import { useState } from "react";

const CheckBoxAndLabel = ({ data, checkedData, setCheckedData }) => {
  const handleCheckedChange = (isChecked) => {
    setCheckedData((prev) => {
      const updatedState = { ...prev, [data.id]: isChecked };

      const markChildrenCheckedRecursive = (node) => {
        if (node?.children) {
          node.children.forEach((child) => {
            updatedState[child.id] = isChecked;
            markChildrenCheckedRecursive(child);
          });
        }
      };

      markChildrenCheckedRecursive(data);

      const markParentCheckedRecursive = (root) => {
        if (!root.children) {
          return updatedState[root.id];
        }
        const isEverythingChecked = root.children
          .map((node) => markParentCheckedRecursive(node))
          .every((val) => val === true);
        updatedState[root.id] = isEverythingChecked;
        return isEverythingChecked;
      };

      CHECKBOX_DATA.forEach((node) => markParentCheckedRecursive(node));

      return updatedState;
    });
  };

  return (
    <>
      <input
        type="checkbox"
        checked={!!checkedData[data.id]}
        onChange={(e) => handleCheckedChange(e.target.checked)}
      />
      <label>{data.name}</label>
    </>
  );
};

const CheckBoxGroup = ({ checkboxGroupData, checkedData, setCheckedData }) => {
  return (
    <div className={check_box_group_container}>
      <CheckBoxAndLabel
        data={checkboxGroupData}
        checkedData={checkedData}
        setCheckedData={setCheckedData}
      />
      {checkboxGroupData?.children &&
        checkboxGroupData.children.map((childData) => (
          <CheckBoxGroup
            key={childData.id}
            checkboxGroupData={childData}
            checkedData={checkedData}
            setCheckedData={setCheckedData}
          />
        ))}
    </div>
  );
};

const NestedCheckBoxes = () => {
  const [checkedData, setCheckedData] = useState({});

  return (
    <div>
      {CHECKBOX_DATA.map((item) => (
        <CheckBoxGroup
          key={item.id}
          checkboxGroupData={item}
          checkedData={checkedData}
          setCheckedData={setCheckedData}
        />
      ))}
    </div>
  );
};

export default NestedCheckBoxes;
