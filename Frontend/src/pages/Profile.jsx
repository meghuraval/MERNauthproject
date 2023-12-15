import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <Link to={"/signin"}>
      <div>Signout</div>
    </Link>
  );
}
