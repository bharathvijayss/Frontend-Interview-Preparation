import { useId } from "react";

const Interest = ({ formData, setFormData, error }) => {
  const { interest } = formData;

  const games_id = useId();
  const music_id = useId();
  const coding_id = useId();

  const handleInput = (e) => {
    if (e.target.checked) {
      setFormData((prev) => ({
        ...prev,
        interest: [...prev.interest, e.target.value],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        interest: [...prev.interest].filter((val) => val !== e.target.value),
      }));
    }
  };

  return (
    <div>
      <div>
        <label htmlFor={games_id}>Games:</label>
        <input
          id={games_id}
          type="checkbox"
          value="Games"
          onChange={handleInput}
          checked={interest.includes("Games")}
        />
      </div>

      <div>
        <label htmlFor={music_id}>Music:</label>
        <input
          id={music_id}
          type="checkbox"
          value="Music"
          onChange={handleInput}
          checked={interest.includes("Music")}
        />
      </div>

      <div>
        <label htmlFor={coding_id}>Coding:</label>
        <input
          id={coding_id}
          type="checkbox"
          value="Coding"
          onChange={handleInput}
          checked={interest.includes("Coding")}
        />
      </div>

      <div>
        <span className="error-msg">{error.interest}</span>
      </div>
    </div>
  );
};

export default Interest;
