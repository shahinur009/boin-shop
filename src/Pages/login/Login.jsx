import React, { useContext } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../../public/logo.png';
import { AuthContext } from '../../Router/AuthProvider';
import Swal from 'sweetalert2';
import GoogleLogin from '../../components/GoogleLogin';

const Login = () => {
    const { signIn } = useContext(AuthContext)
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        signIn(email, password)
            .then(result => {
                const user = result.user;
                navigate(location?.state ? location.state : '/')
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Log in successful",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
    }
    return (
        <>
            <div className="md:flex justify-center items-center gap-10 rounded-md border-2 shadow-md p-5 bg-pink-900">
                <div>
                    <img src={logo} alt="logo picture" className="rounded-full" />
                </div>
                <div className="w-full max-w-md p-5 space-y-3 rounded-xl  bg-pink-400 shadow-xl">
                    <h1 className="text-2xl font-bold text-center uppercase">Login Form</h1>
                    <form onSubmit={handleLogin} noValidate="" action="" className="space-y-6">
                        <div className="space-y-1 text-sm">
                            <label htmlFor="email" className="block dark:text-gray-600">Email</label>
                            <input type="text" name="email" id="email" placeholder="email" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600 outline" />
                        </div>
                        <div className="space-y-1 text-sm">
                            <label htmlFor="password" className="block dark:text-gray-600">Password</label>
                            <input type="password" name="password" id="password" placeholder="Password" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600 outline" />
                            <div className="flex justify-end text-xs dark:text-gray-600">
                                <a rel="noopener noreferrer" href="#">Forgot Password?</a>
                            </div>
                        </div>
                        <button className="block w-full p-3 text-center rounded-sm dark:text-gray-50 dark:bg-violet-600 uppercase btn bg-pink-500 hover:bg-pink-400">Log In</button>
                    </form>
                    <div className="flex items-center pt-4 space-x-1">
                        <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
                        <p className="px-3 text-sm dark:text-gray-600">Login with social accounts</p>
                        <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
                    </div>
                    <div className="flex justify-center space-x-4">
                        <GoogleLogin></GoogleLogin>
                    </div>
                    <p className="text-xs text-center sm:px-6 dark:text-gray-600">Don't have an account?
                        <Link to='/register' rel="noopener noreferrer" href="#" className="underline dark:text-gray-800"> Register</Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Login;