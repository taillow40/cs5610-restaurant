import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BsFillCheckCircleFill,
  BsPencil,
  BsTrash3Fill,
  BsPlusCircleFill,
} from "react-icons/bs";
import * as client from "./client";
function UserTable() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    username: "",
    password: "",
    role: "USER",
  });
  const deleteUser = async (user) => {
    try {
      await client.deleteUser(user._id);
      setUsers(users.filter((u) => u._id !== user._id));
    } catch (err) {
      console.log(err);
    }
  };
  const createUser = async () => {
    console.log("calling")
    try {
      const newUser = await client.createUser(user);
      alert("created");
      setUsers([newUser, ...users]);
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.message);
    }
  };
  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const selectUser = async (user) => {
    console.log("selecting.............. user")
    try {
      console.log("selecting.............. inside")
      const u = await client.findUserById(user);
      setUser(u);
      console.log("selecting.............. u", u)
    } catch (err) {
    console.log(err?.response?.data?.message);
        alert(err?.response?.data?.message);
    }
  };

  
  const updateUser = async () => {
    try {
      const status = await client
        .updateUser(user)
        .then(() => alert("updated !!"))
        .catch((err) => alert(err.response.data.message));
      setUsers(users.map((u) => (u._id === user._id ? user : u)));
    } catch (err) {
      console.log(err);
      alert(err.response.data.message);
    }
  };

  console.log("userrrrrrrr", users)
  return (
    <div>
      <h1>User List</h1>
      <table className="table">
        <thead>
          <tr>
            <th>email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>phone number</th>
            <th>Role</th>
            <th>Password</th>
            <th>Action</th>
          </tr>
          <tr>
            <td>
              <input
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </td>
            <td>
              <input
                value={user.first_name}
                onChange={(e) =>
                  setUser({ ...user, first_name: e.target.value })
                }
              />
            </td>
            <td>
              <input
                value={user.last_name}
                onChange={(e) => setUser({ ...user, last_name: e.target.value })}
              />
            </td>
            <td>
              <input
                value={user.phone_number}
                onChange={(e) => setUser({ ...user, phone_number: e.target.value })}
              />
            </td>
            <td>
              <select
                value={user.type}
                onChange={(e) => setUser({ ...user, type: e.target.value })}
              >
                <option value="RESTAURANT">RESTAURANT</option>
                <option value="USER">USER</option>
                <option value="MODERATOR">MODERATOR</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </td>
            <td>
              <input
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </td>
            <td className="text-nowrap">
             
              <BsPlusCircleFill
                onClick={createUser}
                className="me-2 text-success fs-1 text"
                style={{width:"25px", height:"26px"}}
              />
              <BsFillCheckCircleFill
                onClick={user?._id ? () => updateUser() : () => {}}
                opacity={user?._id ? 1 : 0.7}
                className="me-2 text-success fs-1 text"
                style={{width:"25px", height:"26px"}}
              />
            </td>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user._id}>
              <td>
                <Link to={`/Kanbas/account/${user._id}`}>{user.email}</Link>
              </td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.phone_number}</td>
              <td>{user.type}</td>
              <td>{user.password}</td>
              <td className="d-flex">
                <button className="btn btn-danger me-2">
                  <BsTrash3Fill  onClick={() => deleteUser(user)} />
                </button>
                <button  className="btn btn-warning me-2">
                  <BsPencil onClick={() => selectUser(user)} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default UserTable;
