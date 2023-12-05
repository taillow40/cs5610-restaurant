import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as client from "src/store/api";
import React, { useRef } from "react";
import { useState, useEffect } from "react";
import "./index.css";
import Cookies from "js-cookie";
import { faK } from "@fortawesome/free-solid-svg-icons";
import { user } from "fontawesome";

function Personal() {
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

  return (
    <div className="profile">
      {(profile && profile?.type === "USER") ||
      profile?.type === "RESTAURANT" ? (
        <div>
          <h1>Personal Profile</h1>
          {profile && (
            <div className="profile-grid">
              <span className="profile__first-name">
                first_name: {profile.first_name}
              </span>
              <span className="profile__last-name">
                last_name: {profile.last_name}
              </span>
              <span className="profile__phone">email: {profile.email}</span>
              <span className="profile__email">
                phone_number: {profile.phone_number}
              </span>
              <span className="profile__email">user_type: {profile.type}</span>
              <button
                className="profile__edit"
                onClick={() => navigate(`/profile/edit`)}
              >
                Edit
              </button>
            </div>
          )}
        </div>
      ) : (
        profile?.type === "ADMIN" && (
          <div className="p-3">
            <div className="d-flex justify-content-between my-4">
              <h2>Users info's</h2>
              <button
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#addModal"
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
                  allUser.map((user, i) => {
                    return (
                      <tr className="" key={i}>
                        <td>{user?.email}</td>
                        <td>{user?.password}</td>
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
                            }}
                            className="col "
                            data-bs-toggle="modal"
                            data-bs-target="#updateModal"
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
        )
      )}
      {/* user */}
      <div
        className="modal fade "
        id="addModal"
        tabIndex="-1"
        aria-labelledby="addModalLabel"
        aria-hidden="true"
        ref={addModalRef}
      >
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
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                yes
              </button>
            </div>
            <div className="modal-body w-100">
              <div className="edit__grid">
                <div className="edit__first-name">
                  <label>First Name</label>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={p.first_name}
                    onChange={(e) =>
                      setP({
                        ...p,
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
                    value={p.last_name}
                    onChange={(e) =>
                      setP({
                        ...p,
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
                    value={p.email}
                    onChange={(e) =>
                      setP({
                        ...p,
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
                    value={p.password}
                    onChange={(e) =>
                      setP({
                        ...p,
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
                    value={p.phone_number}
                    onChange={
                      (e) =>
                        setP({
                          ...p,
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
                    value={p?.type}
                    onChange={(e) => setP({ ...p, type: e.target.value })}
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
                      createAUser(p);
                    }}
                    ref={addSaveRef}
                  >
                    Add User
                  </button>

                  <button
                    className="edit__cancel w-75"
                    onClick={() => {
                      navigate(`/profile`);
                    }}
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* update */}
      <div
        className="modal fade "
        id="updateModal"
        tabIndex="-1"
        aria-labelledby="updateModalLabel"
        aria-hidden="true"
        ref={updateModalRef}
      >
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
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                yes
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
                    ref={updateSaveRef}
                  >
                    Update User
                  </button>

                  <button className="edit__cancel w-75" data-bs-dismiss="modal">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Personal;
