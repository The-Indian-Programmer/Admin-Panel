import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import validateData from "../../utils/validateAuthData";
const CreateUser = () => {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const [data, setData] = useState({
    email: "",
    name: "",
    age: "",
    gender: "male",
    role: "employee",
    password: "",
    cpassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setshowCPassword] = useState(false);
  let name, value;

  // console.log(JSON.parse(localStorage.getItem("admin")));
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valiDateValue = validateData(data);
    if (valiDateValue) {
      alert(valiDateValue);
      return;
    }
    createUser(data);
  };

  const createUser = (data) => {
    let allData = localStorage.getItem("allData");
    if (allData === null) {
      localStorage.setItem("allData", JSON.stringify([data]));
      clearFormData();
      history.push("/");
      return;
    }
    let emailCheck = JSON.parse(allData).filter((item) => {
      return item.email === data.email;
    });

    if (emailCheck.length !== 0) {
      alert("Email already exists");
      return;
    }
    let newData = JSON.parse(allData).concat(data);
    localStorage.setItem("allData", JSON.stringify(newData));
    clearFormData();
    history.push("/");
  };
  const clearFormData = () => {
    setData({
      email: "",
      name: "",
      age: "",
      gender: "male",
      role: "employee",
      password: "",
      cpassword: "",
    });
  };
  return (
    <div className="register_page w-full sm:w-3/4 md:w-3/4 lg:w-3/4 xl:w-3/4 block m-auto h-full mt-4">
      <form
        action=""
        className="h-auto w-full p-5 flex flex-col shadow-xl"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center font-bold text-3xl text-gray-700">
          Create Account
        </h1>
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
        <div className="name_input w-full h-10 mt-2 ">
          <input
            className="w-full h-full outline-none border-2 border-gray-200 rounded-md px-5"
            type="text"
            name="name"
            id="name"
            value={data.name}
            onChange={handleChange}
            placeholder="Name"
          />
        </div>
        <div className="age_input w-full h-10 mt-2 ">
          <input
            className="w-full h-full outline-none border-2 border-gray-200 rounded-md px-5"
            type="number"
            name="age"
            id="age"
            value={data.age}
            onChange={handleChange}
            placeholder="Age"
          />
        </div>
        <div className="gender_input w-full h-10 mt-2 ">
          <select
            name="gender"
            id="gender"
            className="w-full h-full px-5 bg-none text-gray-800"
            value={data.gender}
            onChange={handleChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="admin_input w-full h-10 mt-2 ">
          <select
            name="role"
            id="role"
            className="w-full h-full px-5 bg-none text-gray-800"
            value={data.role}
            onChange={handleChange}
          >
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
            {user.role === "founder" && (
              <option value="founder">Founder</option>
            )}
          </select>
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
        <div className="cpassword_input h-10 mt-2 relative">
          <input
            className="w-full h-full outline-none border-2 border-gray-200 rounded-md px-5"
            type={showCPassword ? "text" : "password"}
            name="cpassword"
            id="cpassword"
            value={data.cpassword}
            onChange={handleChange}
            placeholder="Confirm Password"
          />
          <span
            onClick={() => setshowCPassword(!showCPassword)}
            className="cursor-pointer text-sm absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-700 select-none"
          >
            {showCPassword ? "Hide" : "Show"}
          </span>
        </div>
        <button className="btn_submit mt-7 w-full sm:w-2/3 lg:w-3/4 bg-blue-500 block m-auto py-3 text-white font-bold cursor-pointer">
          Register
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
