import { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";

function UserProfile() {
  const { user } = useContext(UserContext);

  if (!user || !user.username) {
    return <p>Loading user info...</p>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>{user.username}</h2>
      {user.email && <p>{user.email}</p>}

      {user.profile_picture ? (
        <img
          src={`http://localhost:8000${user.profile_picture}`}
          alt="Profile"
          width="150"
          height="150"
          style={{
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid #ccc",
            marginTop: "10px",
          }}
        />
      ) : (
        <p>No profile picture uploaded</p>
      )}
    </div>
  );
}

export default UserProfile;
