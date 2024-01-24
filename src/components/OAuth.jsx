import React from 'react'
import { app } from '../firebase/firebase'
import { Button } from 'flowbite-react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { useGoogleUserMutation } from '../redux/services/auth'
import { useDispatch } from 'react-redux'
import { currentUser } from '../redux/features/authSlice'
import { useNavigate } from 'react-router-dom';

const OAuth = () => {


    const dispatch = useDispatch()

    const naviagte = useNavigate()
    const [googleUser, { isLoading }] = useGoogleUserMutation();

    const handlGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            provider.setCustomParameters({ prompt: 'select_account' })
            const result = await signInWithPopup(auth, provider);

            const userData = {
                username: result.user.displayName,
                email: result.user.email,
                avatar: result.user.photoURL
            }

            const { data } = await googleUser(userData)
            const { user, token } = data
            dispatch(currentUser({ user, token }))
            naviagte('/dashboard')

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Button
            disabled={isLoading}
            onClick={handlGoogle}
            className='w-full h-10'
            type='button'
            gradientDuoTone={'purpleToPink'}
            outline
        >
            <AiFillGoogleCircle className='w-5 h-5 mr-2' />
            Continue with Google
        </Button>
    )
}

export default OAuth