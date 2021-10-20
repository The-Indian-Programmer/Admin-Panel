import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import valiDateEmail from "../../utils/validateEmail";
import { setUser } from "../../action/index";
import { useDispatch, useSelector } from "react-redux";
const SignInPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [data, setData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const user = useSelector((state) => state.user);

  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = data;
    if (!email || !password) {
      return alert("All Fields are required");
    }
    const isEmailValid = valiDateEmail(email);
    if (isEmailValid) return alert(isEmailValid);

    LogInUser(email, password);
  };

  const LogInUser = (email, password) => {
    let allData = localStorage.getItem("allData");
    if (allData === null) {
      alert("This Email is not Registerd");
      return;
    }
    const validUser = JSON.parse(allData).filter((item) => {
      return item.email === email;
    });
    if (validUser.length === 0) return alert("This email is not registered");
    if (validUser[0].password !== password) {
      alert("Password does not match");
      return;
    }
    dispatch(setUser(validUser[0]));
    history.push("/");
  };

  return (
    <div className="login_page w-full sm:w-3/4 md:w-3/4 lg:w-3/4 xl:w-3/4 block m-auto h-full mt-4">
      <form
        action=""
        className="h-auto w-full p-5 flex flex-col shadow-xl"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center font-bold text-3xl text-gray-700">LogIn</h1>
        <div className="email_input w-full h-10 mt-2 ">
          <input
            className="w-full h-full outline-none border-2 border-gray-200 rounded-md px-5"
            type="text"
            name="email"
            id="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>

        <div className="password_input w-full h-10 mt-2 relative">
          <input
            className="w-full h-full outline-none border-2 border-gray-200 rounded-md px-5"
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            value={data.password}
            onChange={handleChange}
            placeholder="Enter Password"
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="cursor-pointer text-sm absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-700 select-none"
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>
        <button className="btn_submit mt-7 w-full sm:w-2/3 lg:w-3/4 bg-blue-500 block m-auto py-3 text-white font-bold cursor-pointer">
          Login
        </button>
      </form>
    </div>
  );
};

export default SignInPage;
