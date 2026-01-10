import { useId } from "react";

const Settings = ({ formData, setFormData }) => {
  const dark_theme_id = useId();
  const light_theme_id = useId();
  const { theme } = formData;

  const handleInput = (e) => {
    setFormData((prev) => ({ ...prev, theme: e.target.value }));
  };

  return (
    <>
      <div>
        <label htmlFor={dark_theme_id}>Dark Theme : </label>
        <input
          id={dark_theme_id}
          type="radio"
          value="dark"
          name="theme"
          onChange={(e) => handleInput(e)}
          checked={theme === "dark"}
        />
      </div>
      <div>
        <label htmlFor={light_theme_id}>Light Theme : </label>
        <input
          id={light_theme_id}
          type="radio"
          value="light"
          name="theme"
          onChange={(e) => handleInput(e)}
          checked={theme === "light"}
        />
      </div>
    </>
  );
};

export default Settings;
