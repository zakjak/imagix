import { Avatar, Button, Dropdown } from "flowbite-react"
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithRedirect } from 'firebase/auth'
import { app } from "../firebase"
import { useDispatch, useSelector } from "react-redux" 
import { toggleTheme } from '../redux/theme/themeSlice'
import {loginStart, loginSuccess, loginFailure, signOut} from '../redux/user/userSlice'
import { IoLogOutOutline } from "react-icons/io5";
import { FaMoon, FaSun } from 'react-icons/fa'
import { Link, useNavigate } from "react-router-dom"
import Search from "./Search"

function Navbar() {
    const dispatch = useDispatch()
    const { currentUser } = useSelector(state => state.user)
    const { theme } = useSelector(state => state.theme)

    const navigate = useNavigate()

    const handleSignIn = async() => {
        const auth = getAuth(app)
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        try{
            fetch('https://imagix-xwa1.onrender.com/api/auth/google', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username: user.displayName,
                    email: user.email,
                    picture: user.photoURL
                })
            }).then(res => res.json())
            .then(data => {
                loginStart()
                dispatch(loginSuccess(data))
            })
    
        }catch(err){
            console.log(err)
        }
        
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        }).catch(error => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
        })
    }
    const handleSignOut = () => {
        dispatch(signOut())
        navigate('/')
    }

  return (
    <nav className="h-16 z-50 sticky top-0 w-full bg-gray-200 dark:bg-[#0B0C0E] shadow-md dark:shadow-gray-900 flex items-center">
         <div className="w-[90%] mx-auto flex justify-between items-center">
            <div className="flex items-center flex-1">
                <Link onClick={() => homePage()} to='/' className="text-xl">
                    Ima<span className="text-2xl bg-gradient-to-r from-blue-500 to-red-300 text-transparent bg-clip-text">gix</span>
                </Link>
                
                <Search />
            </div>
            <div className="flex gap-3">
                    <span className="hidden md:flex items-center cursor-pointer focus:border" onClick={() => dispatch(toggleTheme())}>
                        {theme === 'light' ? <FaSun /> : <FaMoon /> }
                    </span>
                    {
                        currentUser ? (
                            <Dropdown className="w-[12rem]" label="" dismissOnClick={false} renderTrigger={() => 
                                <div className="shrink-0"><Avatar className="cursor-pointer" img={currentUser.picture} rounded alt={`${currentUser.name}`}  /></div>}
                            >
                                <div className="p-4">
                                    <div className="">
                                        <Avatar img={currentUser.picture} alt={`${currentUser.name} profile`} rounded />
                                    </div>
                                    <p className="text-xs text-center mt-1 text-gray-400">{currentUser.username}</p>
                                </div>
                                <div className="w-full border-t opacity-60" />
                                <Link to={`/profile/${currentUser._id}`}>
                                    <Dropdown.Item>Profile</Dropdown.Item>
                                </Link>
                                <Dropdown.Item className="flex md:hidden items-center cursor-pointer focus:border" onClick={() => dispatch(toggleTheme())}>
                                    {theme === 'light' ? 
                                    <Button color="none">
                                        Light mode <FaSun className="text-xs ml-1" />
                                    </Button> : 
                                    <Button color="none">
                                        Dark mode <FaMoon className="text-xs ml-1" />
                                    </Button> }
                                </Dropdown.Item>
                                <Dropdown.Item onClick={handleSignOut}><IoLogOutOutline /> <span>Sign out</span></Dropdown.Item>
                            </Dropdown>
                        ): (
                            <Button onClick={handleSignIn}>Sign in</Button>
                        )
                    }
                </div>
         </div>
    </nav>
  )
}

export default Navbar