import { useState, useEffect } from "react";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.username, userInfo.email]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
    } else {
      try {
        const res = await updateProfile({
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Profile updated successfully!");
        setPassword("");
        setConfirmPassword("");
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error(
          error?.data?.error || error?.error || "Profile update failed."
        );
      }
    }
  };

  return (
    <div className="container mx-auto p-4 mt-[10rem]">
      <div className="flex justify-center items-center md:flex md:space-x-4 flex-col">
        <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>

        <form onSubmit={submitHandler} className="container w-[40rem]">
          <div className="my-[2rem]">
            <label htmlFor="username" className="block text-sm font-medium">
              Email Address
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
            />
          </div>

          <div className="my-[2rem]">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium"
            >
              Confirm Password
            </label>

            <input
              type="password"
              id="confirmPassword"
              className="mt-1 p-2 rounded w-full bg-gray-100"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            disabled={loadingUpdateProfile}
            type="submit"
            className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointermy-[1rem] cursor-pointer hover:bg-pink-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loadingUpdateProfile ? "Saving Changes..." : "Update"}
          </button>

          {loadingUpdateProfile && <Loader />}
        </form>
      </div>
    </div>
  );
};

export default Profile;
