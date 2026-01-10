import { items } from "./utils/constants";
import {
  accordion,
  accordion_item,
  accordion_title,
  accordion_content,
} from "./Accordion.module.css";
import { useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleToggling = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return !items || items.length === 0 ? (
    <p>No Items to Display</p>
  ) : (
    <div className={accordion}>
      {items.map((item, index) => {
        return (
          <div key={index} className={accordion_item}>
            <div
              className={accordion_title}
              onClick={() => handleToggling(index)}
            >
              {item.title}
              {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {activeIndex === index && (
              <div className={accordion_content}>{item.content}</div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
