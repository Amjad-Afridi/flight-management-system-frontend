import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const inputStyle = "p-4 mb-8 text-lg border-b-[1px] rounded-md";
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

    console.log("email is", email);
    console.log("password is", password);

    try {
      const response = await axios.post(`http://localhost:3001/user/login`, {
        email: email,
        password: password,
      });
      if (response.status === 200) {
        setError(null);
        setEmail("");
        setPassword("");
        dispatch(login(response.data));
        navigate("/");
      }
      if (response.status === 400) {
        setError("invalid email or password");
      }
    } catch (e) {
      setError(e.message);
      console.log(e);
    }
  };
  const gotoRegistration = () => {
    navigate("/user/register");
  };
  return (
    <div className="bg-blue-950 w-full h-[100vh] p-0 pt-32">
      <div className="border-[2px] border-white w-fit min-w-[40%] mx-auto rounded-lg">
        <h1 className="flex justify-center bg-blue-950 my-8 p-4 text-white text-4xl rounded-md ">
          User Login Form
        </h1>
        <form
          onSubmit={submitForm}
          className="flex flex-col gap-3 text-2xl bg-white p-8 rounded-lg"
        >
          <lable> Email </lable>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            required
            className={inputStyle}
            onChange={handleEmailChange}
          />
          <lable> Password </lable>
          <input
            type="text"
            placeholder="Enter Password"
            value={password}
            required
            className={inputStyle}
            onChange={handlePasswordChange}
          />
          <div className="flex gap-2">
            <button className="bg-blue-950 text-white min-w-[65%] p-4 my-4 rounded-md">
              {" "}
              Login
            </button>
            <button
              onClick={gotoRegistration}
              className="bg-blue-500 text-white p-4 my-4 w-full rounded-md"
            >
              Register instead!{" "}
            </button>
          </div>

          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
};
export default Login;
