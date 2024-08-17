import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";
import baseUrl from "../../hooks/useBaseUrl";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import toast from "react-hot-toast";
const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { setUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photo = e.target.photUrl.files[0];

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
        { image: photo },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      const url = await res.data.data.url;

      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: url,
      });
      const { data } = await baseUrl.post("/signup", {
        name,
        email,
        photoUrl: url,
      });
      console.log(data);
      localStorage.setItem("token", data.token);

      setUser({
        name: userCredentials?.user?.displayName,
        email: userCredentials?.user?.email,
        uid: userCredentials?.user?.uid,
        photoUrl: userCredentials?.user?.photoURL,
        role: "user",
      });

      setLoading(false);
      navigate(from, { replace: true });
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
      console.log(error);
    }
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = await result.user;
      const { data } = await baseUrl.post("/signup", {
        name: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
      });
      localStorage.setItem("token", data.token);
      setUser({
        name: user.displayName,
        email: user.email,
        uid: user.uid,
        photoUrl: user.photoURL,
        role: "user",
      });
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 dark:bg-gray-50 dark:text-gray-800">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign up</h1>
          <p className="text-sm dark:text-gray-600">
            Sign up to access your account
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-12">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                placeholder="Tajbir islam"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="leroy@jenkins.com"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                minLength={6}
                required
                placeholder="*****"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
              />
            </div>
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="file_input"
              >
                Upload Photo
              </label>
              <input
                required
                className="block w-full text-lg cursor-pointer bg-gray-50 focus:outline-none"
                id="photUrl"
                name="photUrl"
                type="file"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div>
              {loading ? (
                <div className="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50">
                  <div className="w-6 h-6 m-auto border-4 border-dashed rounded-full animate-spin dark:border-white"></div>
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50"
                >
                  Sign Up
                </button>
              )}
            </div>
            <div className="my-6 space-y-4">
              <button
                aria-label="Login with Google"
                type="button"
                onClick={handleGoogleLogin}
                className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600 hover:bg-blue-900 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  className="w-5 h-5 fill-current"
                >
                  <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                </svg>
                <p>Login with Google</p>
              </button>
            </div>
            <p className="px-6 text-sm text-center dark:text-gray-600">
              Do you have an account?
              <Link
                to={"/login"}
                className="hover:underline dark:text-violet-600"
              >
                Sign in
              </Link>
              .
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
