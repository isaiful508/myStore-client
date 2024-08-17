import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";

const SignUp = () => {

 const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { createUser, signOut, loginWithGoogle } = useContext(AuthContext);

  const handleSignUp = async (e) => {
    e.preventDefault();


    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photo = e.target.photo.value;
    console.log(name, email, photo, password);

  
    createUser(email, password)
      .then((result) => {
        // console.log(result.user)
        toast.success('Registration Successfully');
        signOut();
        navigate("/login");


        //update profile

        updateProfile(result.user, {
          displayName: name,
          photoURL: photo

        })
          .then(() =>{
            
          } )
          .catch()


      })
      .catch(error => {
        console.error(error)

      })


  };

  const handleGoogleLogin = async (e) => {
    loginWithGoogle()
    .then((result) => {
        const googleUser = result.user
        setUser(googleUser);
console.log(user);
        toast.success("Login Successfully")

        navigate(location?.state ? location.state : '/');
      

    })
    .catch(error => console.error(error))
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
        <form onSubmit={handleSignUp} className="space-y-12">
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
                placeholder="Saiful islam"
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
                className="block mb-2 text-sm"
                htmlFor="photo"
              >
                Photo URL
              </label>
              <input
                id='photo'
                autoComplete='photo'
                name='photo'
                className='w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800'
                type='text'
              />
            </div>
          </div>
          <div className="space-y-2">
            <div>
             
                <button
                  type="submit"
                  className="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50"
                >
                  Sign Up
                </button>
              
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
