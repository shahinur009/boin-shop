import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from '../../../public/logo.png';
import { useContext, useState } from "react";
import { AuthContext } from "../../Router/AuthProvider";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import GoogleLogin from "../../components/GoogleLogin";

const Register = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [registerError, setRegisterError] = useState('');

    const { register, reset, handleSubmit, formState: { errors }, } = useForm();

    // User creation and profile update
    const onSubmit = (data) => {
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        console.log('user profile info updated')
                        reset();
                        Swal.fire({
                            position: "top-middle",
                            icon: "success",
                            title: "User register successful",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    })
                    .catch(error => console.log(error))
                navigate(location?.state ? location.state : '/')

            })
    }

    return (
        <>
            <div className="md:flex justify-center items-center gap-10 rounded-md border-2 shadow-md p-5 bg-pink-900">
                <div>
                    <img src={logo} alt="logo picture" className="rounded-full" />
                </div>
                <div className="w-full max-w-md p-5 space-y-3 rounded-xl bg-pink-400 shadow-xl">
                    <h1 className="text-2xl font-bold text-center uppercase">Register Form</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-1 text-sm">
                            <label htmlFor="name" className="block dark:text-gray-600">Username</label>
                            <input type="text" name="name" placeholder="Username" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600 outline"{...register("name", { required: true })} />
                            {errors.name && <span className='text-red-600'>Name is required</span>}
                        </div>
                        <div className="space-y-1 text-sm">
                            <label htmlFor="email" className="block dark:text-gray-600">Email</label>
                            <input type="email" name="email" placeholder="Email" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600 outline"{...register("email", { required: true })} />
                            {errors.email && <span className='text-red-600'>Email is required</span>}
                        </div>
                        <div className="space-y-1 text-sm">
                            <label htmlFor="photo" className="block dark:text-gray-600">Photo URL</label>
                            <input type="text" placeholder="Photo URL" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600 outline"{...register("photoURL", { required: true })} />
                            {errors.photoURL && <span className='text-red-600'>photo URL is required</span>}
                        </div>
                        <div className="space-y-1 text-sm">
                            <label htmlFor="password" className="block dark:text-gray-600">Password</label>
                            <input type="password" name="password" placeholder="Your Password" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600 outline" {...register("password", {
                                required: true,
                                minLength: 6,
                                maxLength: 12,
                            })} />
                            {errors.password?.type == 'required' && <span className='text-red-600'>Password is required</span>}
                            {errors.password?.type == 'minLength' && <span className='text-red-600'>Password minimum 6 characters</span>}
                            {errors.password?.type == 'maxLength' && <span className='text-red-600'>Password maximum 12 characters</span>}
                        </div>
                        <input type="submit" value="Register" className="block w-full p-3 text-center rounded-sm dark:text-gray-50 dark:bg-violet-600 uppercase btn bg-pink-500 hover:bg-pink-400" />
                    </form>
                    {registerError && <p className="text-red-600 text-center mt-4">{registerError}</p>}
                    <div className="flex items-center pt-4 space-x-1">
                        <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
                        <p className="px-3 text-sm dark:text-gray-600">Register with social accounts</p>
                        <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
                    </div>
                    <div className="flex justify-center space-x-4">
                        <GoogleLogin></GoogleLogin>
                    </div>
                    <p className="text-xs text-center sm:px-6 dark:text-gray-600">Already have an account?
                        <Link to='/login' className="underline dark:text-gray-800"> Login</Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Register;
