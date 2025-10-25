import { deleteUser } from "../services/users";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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

  //   const handleUpdate = () => {};

  return (
    <>
      <div>{user.username} Profile </div>
      <div className="hero-action-buttons">
        <Link to={`/users/${user.id}/edit`}>
          <button className="hero-detail-edit">Edit</button>
        </Link>
      </div>

      <button onClick={handleDelete}>Delete Account</button>
      <button onClick={handleLogOut}>Log Out</button>
    </>
  );
}

export default UserDetails;
