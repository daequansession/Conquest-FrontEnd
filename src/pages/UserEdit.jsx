import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "../services/users.js";
import { UserContext } from "../context/UserContext.jsx";
import "../css/userEdit.css";

function EditUser() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [userData, setUserData] = useState({ username: "", email: "" });
  const [profilePicture, setProfilePicture] = useState(null);

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

  useEffect(() => {
    if (user) {
      setUserData({
        username: user.username || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("username", userData.username);
    if (profilePicture) {
      formData.append("profile_picture", profilePicture);
    }

    await updateUser(userId, formData);

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
        <form
          className="edit-form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <input
            className="input-name"
            placeholder={user.username}
            name="username"
            value={userData.username}
            onChange={handleChange}
            required
            autoFocus
          />
          <input
            type="file"
            name="profile_picture"
            accept="image/*"
            onChange={(e) => setProfilePicture(e.target.files[0])}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default EditUser;
