import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "../services/users.js";
import { UserContext } from "../context/UserContext.jsx";

function EditUser() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [userData, setUserData] = useState({ username: "", email: "" });

  const [error, setError] = useState(null);

  let { userId } = useParams();

  //   useEffect(() => {}, [userId, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserData((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateUser(userId, userData);
      setUser((prev) => ({ ...prev, ...userData }));
      navigate(`/users/${userId}`);
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Failed to update user");
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="users-hero-root">
        <div className="user-hero-heading">
          <h2>Update {user.username}'s Info</h2>
        </div>
        <form className="edit-form" onSubmit={handleSubmit}>
          <input
            className="input-name"
            placeholder="Name"
            name="username"
            value={userData.username}
            onChange={handleChange}
            required
            autoFocus
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default EditUser;
