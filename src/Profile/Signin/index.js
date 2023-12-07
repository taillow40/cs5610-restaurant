import * as client from "src/Profile/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Signin() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const signin = async () => {
    try{ 
      console.log("Credentials:", credentials);
      const response = await client.signin(credentials);
      if (response.success) {
        const token = response.data;
        localStorage.setItem("token", token);
        navigate("/profile");
      }
      else{
        console.error("Login failed:", response.message);
      }
    }
    catch (error){
      console.log("Error during login:", error);
    }

  };
  return (
    <div>
      <h1>Signin</h1>
      <input value={credentials.username} onChange={(e) => setCredentials({...credentials, username: e.target.value})}/><br></br>
      <input value={credentials.password} onChange={(e) => setCredentials({...credentials, password: e.target.value})}/><br></br>
      <button onClick={signin}> Signin </button>
    </div>
  );
}
export default Signin;