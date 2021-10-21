import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import valiDateEmail from "../../utils/validateEmail";
const EditUser = () => {
  const { email } = useParams();
  const history = useHistory();
  const [data, setData] = useState({
    email: "",
    name: "",
    role: "employee",
    age: "",
    gender: "male",
  });
  const user = useSelector((state) => state.user);

  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setData({ ...data, [name]: value });
  };
  const upDateUser = (e) => {
    let allData = localStorage.getItem("allData");

    e.preventDefault();
    const validEmail = valiDateEmail(data.email);
    if (validEmail) return alert(validEmail);

    let index = JSON.parse(allData).findIndex((item) => {
      return item.email === email;
    });
    let newArray = JSON.parse(allData).filter((item) => {
      return item.email !== email;
    });

    let updatedArray = newArray.concat(data);
    localStorage.setItem("allData", JSON.stringify(updatedArray));
    history.push("/");
  };

  useEffect(() => {
    let allData = localStorage.getItem("allData");
    let user = JSON.parse(allData).filter((item) => {
      return item.email === email;
    });
    if (user.length === 0) {
      history.push("/");
      return;
    }
    setData(user[0]);
  }, []);

  return (
    <div className="shadow-xl p-10 h-auto edit_user w-full sm:w-3/4 lg:w-34 xl:w-3/4 md:w-3/4 block m-auto">
      <form onSubmit={upDateUser}>
        <h1 className="text-center font-bold text-3xl text-gray-700">
          UpDate User
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
            name="user"
            id="user"
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

        <button className="btn_submit mt-7 w-full sm:w-2/3 lg:w-3/4 bg-blue-500 block m-auto py-3 text-white font-bold cursor-pointer">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditUser;
