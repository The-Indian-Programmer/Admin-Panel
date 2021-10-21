import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import UserInfoItem from "./UserInfoItem/UserInfoItem";
import { removeUser } from "../../action/index";
const HomePage = () => {
  const [usersData, setUsersData] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    let allData = localStorage.getItem("allData");
    if (allData === null) {
      history.push("/signin");
      return;
    }
    setUsersData(JSON.parse(allData));
  }, []);
  useEffect(() => {
    if (user === null) {
      history.push("/signin");
    }
  }, []);

  const deleteUser = (useremail) => {
    let allData = localStorage.getItem("allData");
    let newData = JSON.parse(allData).filter((item) => {
      return item.email !== useremail;
    });
    setUsersData(newData);
    localStorage.setItem("allData", JSON.stringify(newData));
    if (user.email === useremail) {
      dispatch(removeUser());
      history.push("/signin");
    }
  };
  return (
    <>
      {user !== null && (
        <div className="home_page mt-5">
          <div className="top flex flex-row w-3/4 m-auto justify-center items-center">
            <p class=" text-center font-bold m-5 text-gray-700 text-3xl">
              All Employee
            </p>
            {user !== null && user.role !== "employee" && (
              <button className="btncreate_user bg-blue-500 py-2 px-5 text-white rounded-md hover:bg-blue-400">
                <Link to="/createuser">Create Employee</Link>
              </button>
            )}
          </div>
          <table class="rounded-t-lg m-5 w-5/6 mx-auto bg-gray-200 text-gray-800">
            <tr class="text-left border-b-2 border-gray-300">
              <th class="px-4 py-3">Email</th>
              <th class="px-4 py-3">Name</th>
              <th class="px-4 py-3">Age</th>
              <th class="px-4 py-3">Gender</th>
              <th class="px-4 py-3">Role</th>
              {user !== null && user.role !== "user" && (
                <th class="px-4 py-3">Action</th>
              )}
            </tr>

            {usersData.map((user, index) => {
              return (
                <UserInfoItem key={index} data={user} deleteUser={deleteUser} />
              );
            })}
          </table>
        </div>
      )}
    </>
  );
};

export default HomePage;
