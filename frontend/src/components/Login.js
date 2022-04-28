import {signInWithPopup, GoogleAuthProvider, getAuth} from 'firebase/auth'
import {initializeApp} from 'firebase/app'
import {Container} from 'react-bootstrap'
import GoogleButton from 'react-google-button'
import firebaseConfig from './firebase_credentials.json'

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

const SignInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result)=> {
    }).catch((err) => console.log(err))
}

function Login() {
    return <Container className='google_button'><GoogleButton onClick={SignInWithGoogle}>Sign in with google</GoogleButton></Container>
}

export default Login;