import { useId } from "react";

const Profile = ({ formData, setFormData, error }) => {
  const name_id = useId();
  const age_id = useId();
  const email_id = useId();
  const { name, age, email } = formData;

  const handleInput = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <div>
        <label htmlFor={name_id}>Name:</label>
        <input id={name_id} value={name} onChange={handleInput} name="name" />
        <span className="error-msg">{error.name}</span>
      </div>
      <div>
        <label htmlFor={age_id}>Age:</label>
        <input
          type="number"
          id={age_id}
          value={age}
          onChange={handleInput}
          name="age"
        />
        <span className="error-msg">{error.age}</span>
      </div>
      <div>
        <label htmlFor={email_id}>Email:</label>
        <input
          id={email_id}
          value={email}
          onChange={handleInput}
          name="email"
        />
        <span className="error-msg">{error.email}</span>
      </div>
    </>
  );
};

export default Profile;
