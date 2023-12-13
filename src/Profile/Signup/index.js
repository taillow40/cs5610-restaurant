import React, { useState } from "react";
import SignupForm from "./SignupForm";

function Signup() {
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");


  

  return (
    <div className="auth-container">
      <h1>Register</h1>
      {error && <div className="error-message">{error}</div>}
      {successMsg && <div>{successMsg}</div>}

      <SignupForm error={error} success={successMsg} setError={setError} setSuccessMsg={setSuccessMsg} />
    </div>
  );
}

export default Signup;
