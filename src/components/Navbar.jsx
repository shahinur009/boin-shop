import { Link } from "react-router-dom";
import logo from '../../public/logo.png'

const Navbar = () => {

    // const handleLogOut = () => {
    //     logOut()
    //         .then(() => { })
    //         .catch(error => console.log(error))

    // }


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
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow uppercase font-semibold text-black">
                            <li><Link>Home</Link></li>
                            <li><Link>All Products</Link></li>
                            <li><Link>Contact us</Link></li>
                            {/* {user ? <>
                                <button onClick={handleLogOut} className="btn btn-ghost">LogOut</button>

                            </>

                                : <><li><Link to='/login'>Login</Link></li></>} */}
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
                        <li><Link>Login</Link></li>
                        {/* {user ? <>
                            <button onClick={handleLogOut} className="btn btn-ghost">LogOut</button>

                        </>

                            : <><li><Link to='/login'>Login</Link></li></>} */}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Navbar;