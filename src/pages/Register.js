import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const inputStyle = "p-4 mb-4 outline-none border-[1px] text-lg rounded-md";
  const navigate = useNavigate();
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3001/user/register`, {
        username: username,
        email: email,
        password: password,
      });

      setError(null);
      setEmail("");
      setPassword("");
      setUsername("");
      alert("user registered successfully");
      navigate("/user/login");
    } catch (e) {
      setError(e.response.data);
    }
  };
  const gotoLogin = () => {
    navigate("/user/login");
  };
  return (
    <div className="bg-background-image bg-cover bg-center w-full h-[100vh] p-0 pt-16">
      <div className="border-[2px] border-white w-[30%] mx-auto rounded-lg">
        <h1 className="flex justify-center bg-blue-950 py-12 text-white text-4xl rounded-md ">
          User Registration Form
        </h1>
        <form
          onSubmit={submitForm}
          className="flex flex-col gap-3 text-2xl bg-white p-8 rounded-lg"
        >
          <label> Username </label>
          <input
            type="text"
            placeholder="Enter Username"
            required
            value={username}
            className={inputStyle}
            onChange={handleUsername}
          />
          <label> Email </label>
          <input
            type="email"
            placeholder="Enter Email"
            required
            value={email}
            className={inputStyle}
            onChange={handleEmailChange}
          />
          <label> Password </label>
          <input
            type="password"
            placeholder="Enter Password"
            required
            value={password}
            className={inputStyle}
            onChange={handlePasswordChange}
          />
          <div className="flex gap-2">
            <button className="bg-blue-950 text-white w-full p-4 my-4 rounded-md">
              {" "}
              Register
            </button>
          </div>
          <div className="my-4">
            Already registered ?{" "}
            <span onClick={gotoLogin} className="text-blue-500 cursor-pointer">
              login now!
            </span>
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
};
export default Register;
