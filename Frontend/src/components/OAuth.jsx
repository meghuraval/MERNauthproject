import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/user.slice";

export default function OAuth() {
  const dispatch = useDispatch();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const res = await fetch("http://localhost:3000/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: result.user.displayName,
          email: result.user.email,
          profilePicture: result.user.photoURL,
        }),
      });

      const text = await res.text();
      console.log("TEXT: " + text);

      let data;
      try {
        data = JSON.parse(text);
        dispatch(signInSuccess(data));
      } catch (e) {
        console.log("this is the error: " + e);
      }
    } catch (error) {
      console.log("could not login with google", error);
    }
  };

  return (
    <button
      type="button"
      className="bg-red-600 text-white p-3 rounded-lg uppercase hover:opacity-95 hover:scale-105 hover:transition disabled:opacity-80 transition duration-300"
      onClick={handleGoogleClick}
    >
      Sign in with Google
    </button>
  );
}
