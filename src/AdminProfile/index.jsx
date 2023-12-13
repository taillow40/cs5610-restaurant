import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "src/store/api";
import { useState, useEffect } from "react";
import "./index.css";
import Cookies from "js-cookie";
import SignupForm from "src/Profile/Signup/SignupForm";

function AdminProfile() {
  const cookieToken = Cookies.get("user");
  const [profile, setProfile] = useState(null);
  const [allUser, setAllUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const fetchedProfile = await client.account();
      if (fetchedProfile) {
        setProfile(fetchedProfile?.data);
      } else {
        navigate("/login");
      }
    };
    fetchProfile();
  }, [cookieToken, navigate]);

  useEffect(() => {
    const findAllUsers = async () => {
      const findAllUser = await client.findAllUsers();
      if (findAllUser) {
        setAllUser(findAllUser);
      } else {
        navigate("/login");
      }
    };
    findAllUsers();
  }, [navigate]);

  const [p, setP] = useState({
    email: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    password: "",
    type: "USER",
  });

  const addSaveRef = useRef(null);
  const addModalRef = useRef(null);

  const [up, setUp] = useState({
    email: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    password: "",
    type: "USER",
  });
  const updateSaveRef = useRef(null);
  const updateModalRef = useRef(null);

  const updateAUser = async (p) => {
    const user = await client.updateUser(p);
    let modal = document.getElementById("updateModal");
    modal.classList.toggle("d-none");
    if (user) {
      if (updateModalRef.current) {
        const findAllUser = await client.findAllUsers();
        if (findAllUser) {
          setAllUser(findAllUser);
          const saveButton = updateSaveRef.current;

          // Add data-bs-dismiss attribute to enable Bootstrap dismissal behavior
          saveButton.setAttribute("data-bs-dismiss", "modal");

          // Simulate a click on the button to trigger dismissal
          saveButton.click();
        }
      }
    }
  };

  const handleDel = async (user) => {
    const del = await client.deleteUser(user);
    if (del) {
      const findAllUser = await client.findAllUsers();
      if (findAllUser) {
        setAllUser(findAllUser);
      }
    }
  };
  const createAUser = async (p) => {
    const user = await client.createUser(p);
    if (user) {
      if (addModalRef.current) {
        const findAllUser = await client.findAllUsers();
        if (findAllUser) {
          setAllUser(findAllUser);
          const saveButton = addSaveRef.current;

          // Add data-bs-dismiss attribute to enable Bootstrap dismissal behavior
          saveButton.setAttribute("data-bs-dismiss", "modal");

          // Simulate a click on the button to trigger dismissal
          saveButton.click();
        }
      }
    }
  };
  return (
    <div className="profile">
      {profile?.type === "ADMIN" ? (
        <div className="p-3">
          <div className="d-flex justify-content-between my-4">
            <h2>Users info's</h2>
            <button
              className="btn btn-primary"
              onClick={() => {
                let user = document.getElementById("addModal");
                user.classList.toggle("d-none");
              }}
            >
              Add User
            </button>
          </div>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th
                  scope="col"
                  className=""
                  style={{
                    width: "35%",
                  }}
                >
                  Email
                </th>
                <th scope="col">Password</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Phone</th>
                <th scope="col">User Type</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allUser &&
                allUser?.map((user, i) => {
                  return (
                    <tr className="" key={i}>
                      <td>{user?.email}</td>
                      <td>
                        {user?.password?.split("").map((s) => (
                          <span>*</span>
                        ))}
                      </td>
                      <td>{user.first_name}</td>
                      <td>{user.last_name}</td>
                      <td>{user.phone_number}</td>
                      <td>{user.type}</td>
                      <td className="row  g-4">
                        <button
                          style={{
                            border: "none",
                            background: "none",
                            margin: "0",
                            fontSize: "20px",
                          }}
                          onClick={() => {
                            setUp(user);
                            let modal = document.getElementById("updateModal");
                            modal.classList.toggle("d-none");
                          }}
                          className="col "
                        >
                          Edit
                        </button>
                        <button
                          style={{
                            border: "none",
                            background: "none",
                            margin: "0",
                            fontSize: "20px",
                          }}
                          className="col cursor-pointer"
                          onClick={() => handleDel(user)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>

          {/* resturant */}
        </div>
      ) : (
        <p>You don't have permission to view this page</p>
      )}
      {/* user */}
      <aside
        style={{
          backgroundColor: "rgba(0,0,0,0.075)",
          position: "absolute",
          width: "100%",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
        className="d-none"
        id="addModal"
      >
        <div>
          <div
            className="modal-dialog fixed "
            style={{
              maxWidth: "50%",
            }}
          >
            <div className="modal-content w-100">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="addModalLabel">
                  Add An User
                </h1>
                <button
                  type="button"
                  style={{ marginTop: "2rem" }}
                  className="btn btn-secondary"
                  onClick={() => {
                    let modal = document.getElementById("addModal");
                    modal.classList.toggle("d-none");
                  }}
                >
                  x
                </button>
              </div>
              <SignupForm
                style={{ padding: "2rem" }}
                onClick={() => {
                  let modal = document.getElementById("addModal");
                  modal.classList.toggle("d-none");
                  window.location.reload();
                }}
                isAdmin={true}
              />
            </div>
          </div>
        </div>
      </aside>
      {/* update */}
      <aside
        style={{
          backgroundColor: "rgba(0,0,0,0.075)",
          position: "absolute",
          width: "100%",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
        className="d-none"
        id="updateModal"
      >
        <div>
          <div
            className="modal-dialog fixed "
            style={{
              maxWidth: "50%",
            }}
          >
            <div className="modal-content w-100">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="updateModalLabel">
                  Update An User
                </h1>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    let modal = document.getElementById("updateModal");
                    modal.classList.toggle("d-none");
                  }}
                >
                  x
                </button>
              </div>
              <div className="modal-body w-100">
                <div className="edit__grid">
                  <div className="edit__first-name">
                    <label>First Name</label>
                    <input
                      type="text"
                      placeholder="First Name"
                      value={up.first_name}
                      onChange={(e) =>
                        setUp({
                          ...up,
                          first_name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="edit__last-name">
                    <label>Last Name</label>
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={up.last_name}
                      onChange={(e) =>
                        setUp({
                          ...up,
                          last_name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mt-5">
                    <label>Email</label>
                    <input
                      type="text"
                      placeholder="Email"
                      value={up.email}
                      onChange={(e) =>
                        setUp({
                          ...up,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mt-5">
                    <label>Password</label>
                    <input
                      type="password"
                      placeholder="Password"
                      value={up.password}
                      onChange={(e) =>
                        setUp({
                          ...up,
                          password: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div
                    className=""
                    style={{
                      marginTop: "80px",
                    }}
                  >
                    <label>Phone</label>
                    <input
                      type="text"
                      placeholder="Phone Number"
                      value={up.phone_number}
                      onChange={
                        (e) =>
                          setUp({
                            ...up,
                            phone_number: e.target.value,
                          })
                        //   dispatch(setProfile({ ...profile, last_name: e.target.value }))
                      }
                    />
                  </div>
                  <div
                    className="form-group"
                    style={{
                      marginTop: "80px",
                    }}
                  >
                    <label>User Type:</label>
                    <select
                      // value={fromData.type}
                      value={up?.type}
                      onChange={(e) => setUp({ ...up, type: e.target.value })}
                    >
                      <option value="USER">User</option>
                      <option value="RESTAURANT">Restaurant</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                  </div>
                  {/* <div></div> */}

                  <div
                    className=""
                    style={{
                      display: " grid",

                      marginTop: "30px",
                    }}
                  >
                    <button
                      className="edit__save w-75"
                      onClick={() => {
                        updateAUser(up);
                      }}
                    >
                      Update User
                    </button>

                    <button
                      className="edit__cancel w-75"
                      data-bs-dismiss="modal"
                      ref={updateSaveRef}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
export default AdminProfile;
