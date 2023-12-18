import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [image, setImage] = useState(null);
  const [imagePercent, setImagePercent] = useState();
  const [imageError, setImageError] = useState(null);
  const [formData, setFormData] = useState({});
  console.log(formData);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("upload is " + progress + "% done");
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        console.log("hello maine");
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold my-7 text-center">
        Profile Details
      </h1>

      <input
        type="file"
        ref={fileRef}
        hidden
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <img
        src={formData.profilePicture || currentUser.profilePicture}
        className="h-24 w-24 rounded-full cursor-pointer mx-auto mb-10 hover:opacity-80 hover:scale-105"
        alt="profile"
        onClick={() => fileRef.current.click()}
      ></img>

      <p className="text-sm text-center">
        {imageError ? (
          <span className="bg-red-600">{`error uploading image (File size must be less than 2 MB)`}</span>
        ) : imagePercent > 0 && imagePercent < 100 ? (
          <span>{`uploading image... ${imagePercent}%`}</span>
        ) : imagePercent === 100 ? (
          <span className="ring-green-600">uploaded successfully</span>
        ) : (
          ""
        )}
      </p>

      <form className="flex flex-col">
        <input
          defaultValue={currentUser.username}
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-100 my-3 p-3 rounded-lg hover:bg-slate-200 transition duration-300"
          onChange={handleChange}
        ></input>
        <input
          defaultValue={currentUser.email}
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 my-3 p-3 rounded-lg hover:bg-slate-200 transition duration-300"
          onChange={handleChange}
        ></input>
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 my-3 p-3 rounded-lg hover:bg-slate-200 transition duration-300"
          onChange={handleChange}
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
