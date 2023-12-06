import "./styles.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProfile } from "src/Profile/profilesReducer";

function ModeratorDashboard() {
  const dispatch = useDispatch();
  const profiles = useSelector(
    (state) => state.profilesReducer.profiles
  ).filter((item) => item.type !== "moderator");

  return (
    <div className="moderatorContainer">
      <h2>Manage Users</h2>
      <table>
        <tr>
          <th>Name</th>
          <th>Role</th>
          <th>Phone number</th>
          <th>Action</th>
        </tr>
        {profiles.map((item) => {
          return (
            <tr>
              <td>{item.first_name + " " + item.last_name}</td>
              <td>{item.type}</td>
              <td>{item.phone_number}</td>
              <td>
                <button
                  onClick={() => {
                    dispatch(deleteProfile(item));
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default ModeratorDashboard;
