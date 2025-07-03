import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router";
import Loader from "../../components/Loader";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredentials(res));
      } catch (error) {
        console.error("Register Error:", error);
        toast.error(error?.data?.error || error.error || "Register failed");
      }
    } else {
      toast.error("Passwords do not match");
    }
  };

  return (
    <div>
      <section className="pl-[10rem] flex flex-wrap">
        <div className="mr-[4rem] mt-[5rem]">
          <h1 className="text-2xl font-semibold mb-4">Register</h1>

          <form onSubmit={submitHandler} className="container w-[40rem]">
            <div className="my-[2rem]">
              <label htmlFor="username" className="block text-sm font-medium">
                Username
              </label>

              <input
                type="name"
                id="username"
                className="mt-1 p-2 rounded w-full bg-gray-100"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="my-[2rem]">
              <label htmlFor="email" className="block text-sm font-medium">
                Email Address
              </label>

              <input
                type="email"
                id="email"
                className="mt-1 p-2 rounded w-full bg-gray-100"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="my-[2rem]">
              <label htmlFor="email" className="block text-sm font-medium">
                Password
              </label>

              <input
                type="password"
                id="password"
                className="mt-1 p-2 rounded w-full bg-gray-100"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="my-[2rem]">
              <label htmlFor="email" className="block text-sm font-medium">
                Confirm Password
              </label>

              <input
                type="password"
                id="confirmPassword"
                className="mt-1 p-2 rounded w-full bg-gray-100"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointermy-[1rem] cursor-pointer hover:bg-pink-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>

            {isLoading && <Loader />}
          </form>

          <div className="mt-4">
            <p>
              Already A Customer? {""}
              <Link
                to={redirect ? `/login?redirect=${redirect}` : "/login"}
                className="text-pink-500 hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
