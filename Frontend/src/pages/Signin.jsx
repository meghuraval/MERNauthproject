import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../redux/user/user.slice";

import { useDispatch, useSelector } from "react-redux";

export default function Signin() {
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  //adding form details to the backend mongodb server & connecing to teh server using fetch
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("http://localhost:3000/api/auth/signin", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setForm({
          username: "",
          email: "",
          password: "",
        });
        const json = await res.json();
        dispatch(signInSuccess(json));
        navigate("/");
      } else {
        dispatch(signInFailure("Incorrect credentials"));
        return;
      }
    } catch (error) {
      dispatch(signInFailure("Error occured while signing in"));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
          value={form.email}
        />
        <input
          type="password"
          placeholder="Passsword"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
          value={form.password}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 hover:scale-105 disabled:opacity-80 transition duration-300"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        Dont have an account?
        <Link to="/signup">
          <span className="text-blue-500 hover:text-blue-700 hover:underline">
            Sign up
          </span>
        </Link>
      </div>
      {error && (
        <p className="bg-slate-200 rounded-lg text-red-700 p-2 border border-red-700 hover:scale-105 my-5 text-center transition duration-300 ease-in-out ">
          Incorrect Credentials
        </p>
      )}
    </div>
  );
}
