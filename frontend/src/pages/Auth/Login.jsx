import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

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

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials(res));
      toast.success("Login successful");
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(error?.data?.error || error?.error || "Login failed");
    }
  };

  return (
    <section className="pl-[10rem] flex flex-wrap">
      <div className="mr-[4rem] mt-[5rem]">
        <h1 className="text-2xl font-semibold mb-4">Sign In</h1>

        <form onSubmit={submitHandler} className="container w-[40rem]">
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
            New Customer? {""}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
              className="text-pink-500 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>

      <img
        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
        alt=""
        className="h-[40rem] w-[40rem] xl:block md:hidden sm:hidden rounded-lg pr-3"
      />
    </section>
  );
};

export default Login;
