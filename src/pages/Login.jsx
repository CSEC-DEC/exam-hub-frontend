import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const [errMsg, setErrMsg] = useState("");

  const handleInputValue = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleLogin = () => {
    axios
      .post("http://localhost:8800/login", formData, { withCredentials: true })
      .then((res) => {
        navigate("/exams");
      })
      .catch((err) => {
        setErrMsg(err.response.data.error);
      });
  };

  return (
    <div className="flex flex-col items-start space-y-4">
      <label htmlFor="username" className="text-sm">
        Username
      </label>
      <input
        type="text"
        id="username"
        onChange={handleInputValue}
        className="border border-gray-400 outline-none bg-transparent px-2 py-1"
      />
      <label htmlFor="password" className="text-sm">
        Password
      </label>
      <input
        type="password"
        id="password"
        onChange={handleInputValue}
        className="border border-gray-400 order-0 outline-none bg-transparent px-2 py-1"
      />

      <p className="bg-red-100 text-red-500">{errMsg && errMsg}</p>

      <button
        onClick={handleLogin}
        className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
      >
        Login
      </button>
    </div>
  );
};

export default Login;
