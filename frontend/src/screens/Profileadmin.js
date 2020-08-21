import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { logout } from "../actions/adminAction";

import { useDispatch, useSelector } from "react-redux";

function ProfileAdmin(props) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const adminSignup = useSelector((state) => state.adminSignup);

  const { adminInfo } = adminSignup;

  const handleLogout = () => {
    dispatch(logout());
    props.history.push("/signinadmin");
  };

  useEffect(() => {
    if (adminInfo) {
      console.log(adminInfo.name);
      setEmail(adminInfo.email);
      setName(adminInfo.name);
      setPassword(adminInfo.password);
    }

    return () => {};
  }, [adminInfo]);

  return (
    <div className="profile">
      <div className="profile-info">
        <div className="form">
          <form>
            <ul className="form-container">
              <li>
                <h2>admin Profile</h2>
              </li>

              <li>
                <label htmlFor="name">Name:{name}</label>
              </li>
              <li>
                <label htmlFor="email">Email: {email}</label>
              </li>

              <li>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="button secondary full-width"
                >
                  Logout
                </button>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileAdmin;
