import { tabs } from "./utils/constants";
import {
  tabs_container,
  tab_block,
  tabs_content_container,
  tabs_action_buttons,
} from "./TabForm.module.css";
import { useState } from "react";

const TabForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    name: "bvss",
    age: "25",
    email: "ssbharathvijay@outlook.com",
    interest: ["Coding"],
    theme: "light",
  });

  const ActiveComponent = tabs[activeTab].component;

  const goToNextTab = () => {
    if (canGoOtherTab()) {
      setError({});
      setActiveTab((prev) => prev + 1);
    }
  };

  const submitData = () => {
    if (canGoOtherTab()) console.log("data :", formData);
  };

  const canGoOtherTab = () => {
    const err = tabs[activeTab].validate(formData);
    if (err) {
      setError(err);
      return false;
    }
    return true;
  };

  const changeTab = (index) => {
    if (index === activeTab) return;
    if (index < activeTab) {
      setActiveTab(index);
      return;
    }
    if (canGoOtherTab()) {
      setError({});
      setActiveTab(index);
    }
  };

  return (
    <div>
      <div className={tabs_container}>
        {tabs.map((tab, index) => (
          <span
            key={tab.id}
            className={tab_block}
            onClick={() => changeTab(index)}
          >
            {tab.name}
          </span>
        ))}
      </div>
      <div className={tabs_content_container}>
        <ActiveComponent
          formData={formData}
          setFormData={setFormData}
          error={error}
        />
      </div>
      <div className={tabs_action_buttons}>
        {activeTab !== 0 && (
          <button onClick={() => setActiveTab((prev) => prev - 1)}>
            Previous
          </button>
        )}
        {activeTab !== tabs.length - 1 && (
          <button onClick={goToNextTab}>Next</button>
        )}
        {activeTab === tabs.length - 1 && (
          <button onClick={submitData}>Submit</button>
        )}
      </div>
    </div>
  );
};

export default TabForm;
