import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeUser } from "../../action/index";
import { useHistory } from "react-router-dom";
const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  console.log(user);
  const logOutUser = () => {
    dispatch(removeUser());
    history.push("/signin");
  };
  return (
    <div className="header w-full h-16 flex py-2  px-2 flex-row text-blue-500 justify-between items-center shadow-lg ">
      <h1 className="logo text-sm sm:text-xl md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold select-none">
        <Link to="/">Admin Panel</Link>
      </h1>
      {user !== null ? (
        <button
          onClick={() => logOutUser()}
          className="btn bg-blue-500 text-white py-2 px-5 rounded-md cursor-pointer hover:bg-blue-400"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={() => history.push("/signin")}
          className="btn bg-blue-500 text-white py-2 px-5 rounded-md cursor-pointer hover:bg-blue-400"
        >
          LogIn
        </button>
      )}
    </div>
  );
};

export default Header;
