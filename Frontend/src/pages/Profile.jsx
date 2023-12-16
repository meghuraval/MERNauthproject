import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold my-7 text-center">
        Profile Details
      </h1>

      <img
        src={currentUser.profilePicture}
        className="h-24 w-24 rounded-full cursor-pointer mx-auto mb-10"
        alt="profile"
      ></img>

      <form className="flex flex-col">
        <input
          defaultValue={currentUser.username}
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-100 rounded-lg my-3 p-3"
        ></input>
        <input
          defaultValue={currentUser.email}
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg my-3 p-3"
        ></input>
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg my-3 p-3"
        ></input>
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 hover:scale-105 transition duration-300">
          Update
        </button>
      </form>

      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer hover:underline">
          Delete Account 😔
        </span>
        <Link to={"/signin"}>
          <span className="text-red-700 cursor-pointer hover:underline">
            Sign Out ✌️
          </span>
        </Link>
      </div>
    </div>
  );
}
