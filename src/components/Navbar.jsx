import { Link, NavLink } from "react-router-dom";
import logo from '../../public/logo.png'
import { useContext } from "react";
import { AuthContext } from "../Router/AuthProvider";
import Swal from "sweetalert2";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error))
        Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Log out successful",
            showConfirmButton: false,
            timer: 1500
        });

    }


    return (
        <>
            <div className="navbar  bg-pink-500 text-[#FFFFFF] h-20 container mx-auto py-8 px-8 sticky top-0 left-0 right-0 z-50 mb-4">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow uppercase font-semibold text-black ">
                            <li><Link>Home</Link></li>
                            <li><Link>All Products</Link></li>
                            <li><Link>Contact us</Link></li>
                        </ul>
                    </div>
                    
                    <div className="hidden md:block">
                        <Link to='/'>
                            <img src={logo} alt="" className="h-20 w-48 blur-0" />
                        </Link>
                    </div>
                    <h1 className="block md:hidden">
                        <Link to='/'>BOIN SHOP</Link>
                    </h1>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 uppercase font-semibold">
                        <li><Link>Home</Link></li>
                        <li><Link>All Products</Link></li>
                        <li><Link>Contact us</Link></li>
                    </ul>
                </div>
                <div className="navbar-end text-pink-500">
                    {
                        user?.email ? <div className="dropdown dropdown-end" title={user?.displayName}>
                            <label tabIndex={0} className="avatar">
                                <div className="w-12 rounded-full">
                                    <img src={user?.photoURL || "https://i.ibb.co/s5c4Ncx/tshahinur-islam.jpg"} />
                                </div>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-4 z-[999] relative p-3 shadow bg-base-200 rounded-box w-48">
                                <li>
                                    <button className="btn btn-sm  btn-ghost">{user?.displayName || 'user name not found'}</button>

                                </li>
                                <li>
                                    <button
                                        onClick={handleLogOut}
                                        className="btn btn-sm  btn-ghost">Logout</button>

                                </li>
                            </ul>
                        </div>
                            :
                            <NavLink to='/login' className="btn">Login</NavLink>
                    }
                </div>
            </div>
        </>
    );
};

export default Navbar;