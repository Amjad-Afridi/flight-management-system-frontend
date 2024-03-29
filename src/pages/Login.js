import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const inputStyle = "p-4 mb-4 text-lg border-b-[1px] rounded-md";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3001/user/login`, {
        email: email,
        password: password,
      });
      setError(null);
      setEmail("");
      setPassword("");
      dispatch(login(response.data));
      navigate("/");
    } catch (e) {
      setError(e.response.data);
      console.log(e);
    }
  };
  const gotoRegistration = () => {
    navigate("/user/register");
  };
  return (
    <div className="bg-background-image bg-cover bg-center w-full h-[100vh]  p-0 pt-24">
      <div className="border-[2px] border-white w-fit min-w-[30%] mx-auto rounded-lg">
        <h1 className="flex justify-center bg-blue-950 py-12 text-white text-4xl rounded-md ">
          User Login Form
        </h1>
        <form
          onSubmit={submitForm}
          className="flex flex-col gap-3 text-2xl bg-white p-8 rounded-lg"
        >
          <label> Email </label>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            required
            className={inputStyle}
            onChange={handleEmailChange}
          />
          <label> Password </label>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            required
            className={inputStyle}
            onChange={handlePasswordChange}
          />
          <div className="flex gap-2">
            <button className="bg-blue-950 text-white w-full p-4 my-4 rounded-md">
              {" "}
              Login
            </button>
          </div>
          <div className="my-4">
            Haven't registered Yet ?{" "}
            <span
              onClick={gotoRegistration}
              className="text-blue-500 cursor-pointer"
            >
              register now!
            </span>
          </div>

          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
};
export default Login;
