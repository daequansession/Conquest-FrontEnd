import { deleteUser } from "../services/users";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../css/userDetails.css";

// import { signOut } from "../services/users";

function UserDetails() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();
    console.log(user);
    await deleteUser(user.id);
    setUser(null);
    localStorage.removeItem("token");
    navigate("/register");
  };

  const handleLogOut = () => {
    // console.log("hello")
    navigate("/sign-out");
  };

  return (
    <div
      className="user-details"
      style={{ textAlign: "center", marginTop: "2rem" }}
    >
      <h2>{user.username}’s Profile</h2>

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

      {/* ✅ Display user info */}
      {user.email && <p>Email: {user.email}</p>}

      <div className="hero-action-buttons" style={{ marginTop: "1rem" }}>
        <Link to={`/users/${user.id}/edit`}>
          <button className="hero-detail-edit">Edit</button>
        </Link>
      </div>

      <button onClick={handleDelete} style={{ margin: "10px" }}>
        Delete Account
      </button>
      <button onClick={handleLogOut} style={{ margin: "10px" }}>
        Log Out
      </button>
    </div>
  );
}

export default UserDetails;
