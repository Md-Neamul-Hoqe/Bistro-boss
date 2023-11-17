import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const SocialLogin = () => {
  const axios = useAxiosPublic();
  const navigate = useNavigate();
  const { googleSignInUser, setError } = useAuth();

  const handleGoogleSignIn = (e) => {
    e.preventDefault();
    // console.log("object");

    googleSignInUser()
      .then((res) => {
        const userInfo = {
          email: res?.user?.email,
          name: res?.user?.displayName,
        };
        axios.post("/users", userInfo).then((result) => {
          console.log(result.data);
          navigate("/");
        });

        console.log(res);
        if (!res.insertedId)
          Swal.fire({
            icon: "success",
            title: "User profile updated successfully.",
            showConfirmButton: false,
            timer: 1500,
          });

        navigate("/");
      })
      .catch((error) => setError(error));
  };

  return (
    <>
      <div>Or sign in with</div>
      <div className="flex justify-center gap-5">
        <Link className="rounded-full p-3 border border-black text-black hover:opacity-70">
          <FaFacebookF />
        </Link>
        <Link
          onClick={() => handleGoogleSignIn(event)}
          className="rounded-full p-3 border border-black text-black hover:opacity-70">
          <FaGoogle />
        </Link>
        <Link className="rounded-full p-3 border border-black text-black hover:opacity-70">
          <FaGithub />
        </Link>
      </div>
    </>
  );
};

export default SocialLogin;
