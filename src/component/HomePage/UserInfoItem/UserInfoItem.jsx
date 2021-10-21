import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

const UserInfoItem = ({ data, deleteUser }) => {
  const user = useSelector((state) => state.user);
  const history = useHistory();

  return (
    <tr class="bg-gray-100 border-b border-gray-200">
      <td class="px-4 py-3">{data.email}</td>
      <td class="px-4 py-3">{data.name}</td>
      <td class="px-4 py-3 uppercase">{data.age}</td>
      <td class="px-4 py-3 uppercase">{data.gender}</td>
      <td class="px-4 py-3 uppercase">{data.role}</td>
      {user.user !== "user" && (
        <td class="px-4 py-3">
          {user.role === "founder" ? (
            <button
              onClick={() => deleteUser(data.email)}
              className="btn_delete_user bg-red-500 mr-2 py-1 px-2 rounded-md text-sm text-white"
            >
              Delete
            </button>
          ) : (
            ""
          )}
          {user.role === "manager" && data.role === "employee" ? (
            <button
              onClick={() => deleteUser(data.email)}
              className="btn_delete_user bg-red-500 mr-2 py-1 px-2 rounded-md text-sm text-white"
            >
              Delete
            </button>
          ) : (
            ""
          )}

          {/* edit btto    */}
          {user.role === "founder" ? (
            <button
              onClick={() => history.push(`edituser/${data.email}`)}
              className="btn_user_user bg-blue-500 ml-2 text-white py-1 px-4 text-sm rounded-md"
            >
              Edit
            </button>
          ) : user.role === "manager" && data.user !== "founder" ? (
            <button
              onClick={() => history.push(`edituser/${data.email}`)}
              className="btn_user_user bg-blue-500 ml-2 text-white py-1 px-4 text-sm rounded-md"
            >
              Edit
            </button>
          ) : (
            ""
          )}
        </td>
      )}
    </tr>
  );
};

export default UserInfoItem;
