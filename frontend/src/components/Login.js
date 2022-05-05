import {signInWithPopup, GoogleAuthProvider, getAuth} from 'firebase/auth'
import {initializeApp} from 'firebase/app'
import {Container} from 'react-bootstrap'
import GoogleButton from 'react-google-button'
import firebaseConfig from './firebase_credentials.json'

//firebase variables
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

/**
 * Will use the firebase method SignInWithPopup to display the google login in another tab
 */
const SignInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result)=> {
    }).catch((err) => console.log(err))
}

/** 
 * return the google button that will be used to sign in with google
*/
function Login() {
    return <Container className='google_button'><GoogleButton onClick={SignInWithGoogle}>Sign in with google</GoogleButton></Container>
}

export default Login;