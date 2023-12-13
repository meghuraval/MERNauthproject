import { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/auth/signup", {
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
        console.log(json.dir);
        setLoading(true);
        setError(false);
      } else {
        setLoading(false);
        setError(true);
      }
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign-up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
          value={form.username}
        />
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
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 scale-105 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign up"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        Have an account?
        <Link to="/signin">
          <span className="text-blue-500 hover:text-blue-700 hover:underline">
            Sign in
          </span>
        </Link>
      </div>
      {error && (
        <p className="bg-slate-200 rounded-lg text-red-700 p-2 border border-red-700 hover:scale-105 my-5 text-center transition duration-300 ease-in-out ">
          Username and Email are taken
        </p>
      )}
    </div>
  );
}
