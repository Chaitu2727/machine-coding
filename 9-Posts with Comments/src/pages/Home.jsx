import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const userLoggedIn = localStorage.getItem("isLoggedin");
  const handleSubmit = (e) => {
    e.preventDefault();
    if ((e.target.email.value, e.target.password.value)) {
      localStorage.setItem("isLoggedin", true);
      navigate("/posts");
    }
  };
  if (userLoggedIn) {
    return <h1>Welcom Back</h1>;
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          name="email"
          placeholder="Enter your email.."
          className="input-field"
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password.."
          className="input-field"
        />
        <button type="submit" className="btn btn-post">
          Login
        </button>
      </form>
    </div>
  );
};

export default Home;
