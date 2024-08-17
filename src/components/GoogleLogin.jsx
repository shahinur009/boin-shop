import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../Router/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const GoogleLogin = () => {
    const { googleSignIn, user } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate()

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                // console.log(result?.user)
                const userInfo = {
                    email: user?.email,
                    name: user?.displayName
                }
                navigate(location?.state ? location.state : '/')
            })
    }
    return (
        <div>
            <button onClick={handleGoogleSignIn} aria-label="Log in with Google" className="p-3 rounded-sm">
                <FcGoogle className='text-4xl ' />
            </button>
        </div>
    );
};

export default GoogleLogin;