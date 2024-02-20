import { Avatar, Button, Flex } from '@radix-ui/themes'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../redux/theme/themeSlice'
import { FaMoon, FaSun } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { loginSuccess } from '../redux/user/userSlice'

function NavComponent() {
    const { theme } = useSelector(state => state.theme)

    const { currentUser } = useSelector(state => state.user)


    const dispatch = useDispatch()

    const auth = getAuth(app)
    const provider = new GoogleAuthProvider()

    const handleLogin = () => {
        signInWithPopup(auth, provider)
        .then(async (result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result)
            const token = credential.accessToken;

            const user = result.user
            const res = await fetch('http://localhost:3000/api/users/google', {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: user.displayName,
                    email: user.email,
                    picture: user.photoURL
                })
            })

            const data = await res.json()
            
            if(res.ok){
                dispatch(loginSuccess(data))
                console.log('success')
            }
        }).catch((err) => {
            const errorCode = err.code;
            const errorMessage = err.message;
            // The email of the user's account used.
            const email = err.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(err)
        })
    }



  return (
    <nav className="flex h-16 shadow-md items-center bg-white">
        <div className="flex w-[90%] mx-auto justify-between">
                <Link to='/' className="text-xl">
                    Ima<span className="text-2xl bg-gradient-to-r from-green-900 to-red-500 bg-clip-text text-transparent">gix</span>
                </Link>
                <div className="">Search</div>
                <div className="flex items-center gap-2">
                    <div className="cursor-pointer text-black"  onClick={() => dispatch(toggleTheme())}>
                        {theme === 'light' ? <FaSun />: <FaMoon />}
                    </div>
                    {
                        currentUser ? (
                                <Avatar src={currentUser?.picture} size='3' radius='full' className='text-white bg-black' fallback={currentUser?.name.slice(0, 1)} />
                        ) : (
                            <Button className='bg-black text-white text-sm px-2 py-1 rounded-md font-bold' onClick={handleLogin}>Sign in</Button>
                        )
                    }
                </div>
            </div>
    </nav>
  )
}

export default NavComponent