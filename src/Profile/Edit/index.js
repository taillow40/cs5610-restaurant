// import React from "react";
// import { useNavigate, useParams, Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import "./index.css"
// import {
//     addProfile,
//     deleteProfile,
//     updateProfile,
//     setProfile,
// } from "src/Profile/profilesReducer";
// function Edit() {
//     const profiles = useSelector((state) => state.profilesReducer.profiles);
//     const profile = useSelector((state) => state.profilesReducer.profile);
//     const dispatch = useDispatch();

//     const navigate = useNavigate();
//     return (
//         <div className="edit">
//             <h1>Edit Profile</h1>
//             <div className="edit__grid">
//                 <div className="edit__first-name">
//                     <label>First Name</label>
//                     <input type="text" placeholder="First Name" value={profile.first_name} onChange={(e) => dispatch(setProfile({ ...profile, first_name: e.target.value }))} />
//                 </div>
//                 <div className="edit__last-name">
//                     <label>Last Name</label>
//                     <input type="text" placeholder="Last Name" value={profile.last_name} onChange={(e) => dispatch(setProfile({ ...profile, last_name: e.target.value }))} />
//                 </div>

//                 <button className="edit__save"
//                     onClick={() => {
//                         dispatch(updateProfile(profile));
//                         navigate(`/profile`);
//                     }}>
//                     Save</button>

//                 <button className="edit__cancel"
//                     onClick={() => {

//                         navigate(`/profile`);
//                     }}>
//                     Cancel</button>

//             </div>
//         </div>
//     );

// }

// export default Edit;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./index.css";
import * as client from "src/store/api";

function Edit() {
  const navigate = useNavigate();

  const updateUser = async (user) => {
    const u = await client.updateUser(user);
    if (u?.modifiedCount) {
      navigate(`/profile`);
    }
  };

  const dispatch = useDispatch();
  const [p, setP] = useState({
    email: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    password: "",
    type: "USER",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const fetchedProfile = await client.account();
      if (fetchedProfile) {
        setP(fetchedProfile?.data);
      } else {
        navigate("/login");
      }
    };
    fetchProfile();
  }, [navigate]);

  return (
    <div className="edit">
      <h1>Edit Profile</h1>
      <div className="edit__grid">
        <div className="edit__first-name">
          <label>First Name</label>
          <input
            type="text"
            placeholder="First Name"
            value={p.first_name}
            onChange={
              (e) =>
                setP({
                  ...p,
                  first_name: e.target.value,
                })
              //   dispatch(setProfile({ ...profile, first_name: e.target.value }))
            }
          />
        </div>
        <div className="edit__last-name">
          <label>Last Name</label>
          <input
            type="text"
            placeholder="Last Name"
            value={p.last_name}
            onChange={
              (e) =>
                setP({
                  ...p,
                  last_name: e.target.value,
                })
              //   dispatch(setProfile({ ...profile, last_name: e.target.value }))
            }
          />
        </div>
        <div className="mt-4">
          <label>Email</label>
          <input
            type="text"
            placeholder="Email"
            value={p.email}
            onChange={
              (e) =>
                setP({
                  ...p,
                  email: e.target.value,
                })
              //   dispatch(setProfile({ ...profile, last_name: e.target.value }))
            }
          />
        </div>
        <div className="mt-4">
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
        <div className="mt-5">
          <label>User Type</label>
          <select
            value={p.type}
            onChange={(e) => setP({ ...p, type: e.target.value })}
          >
            <option value="USER">User</option>
            <option value="RESTAURANT">Restaurant</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
        <div></div>

        <div
          className=""
          style={{
            display: "block",
            columnSpan: "100%",
            marginTop: "30px",
          }}
        >
          <button
            className="edit__save mt-5 "
            onClick={() => {
              updateUser(p);
            }}
          >
            Save
          </button>

          <button
            className="edit__cancel "
            onClick={() => {
              navigate(`/profile`);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Edit;
