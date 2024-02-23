import { Button } from "flowbite-react"
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from "../../firebase"

function Navbar() {

    const handleSignIn = () => {
        const auth = getAuth(app)
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
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
  return (
    <nav className="h-16 w-full shadow-md flex items-center">
         <div className="w-[90%] mx-auto flex justify-between items-center">
            <div className="flex gap-4">
                <div className="">
                    Ima<span className="">gix</span>
                </div>
                <div className="">
                    Search
                </div>
            </div>
            <div className="">
                    <Button onClick={handleSignIn}>Sign in</Button>
                </div>
         </div>
    </nav>
  )
}

export default Navbar