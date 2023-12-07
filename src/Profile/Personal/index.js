import { useNavigate } from "react-router-dom";
import * as client from "src/store/api";
import React, { useRef } from "react";
import { useState, useEffect } from "react";
import "./index.css";
import Cookies from "js-cookie";

function Personal() {
  const cookieToken = Cookies.get("user");
  const [profile, setProfile] = useState(null);
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

  

  const [p, setP] = useState({
    email: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    password: "",
    type: "USER",
  });

  const addModalRef = useRef(null);

  const [up, setUp] = useState({
    email: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    password: "",
    type: "USER",
  });
  const updateModalRef = useRef(null);


  return (
    <div className="profile">
      {profile && (
        <div>
          <h1>Personal Profile</h1>
          <h3>
            Welcome, {profile?.first_name} {profile?.last_name}
          </h3>
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
              <span className="profile__email">
                Favorite Cousine: {profile.cuisine}
              </span>

              <button
                className="profile__edit"
                onClick={() => navigate(`/profile/edit`)}
              >
                Edit
              </button>
            </div>
          )}
        </div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Personal;
