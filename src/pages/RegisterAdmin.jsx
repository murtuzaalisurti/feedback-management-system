import React, { useRef, useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

import '../styles/RegisterAdmin.module.css'

const RegisterAdmin = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup, currentUser } = useAuth()
    const navigate = useNavigate()

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if(currentUser) {
            navigate('/dashboard')
        }
    }, [])

    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }

        try {
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            navigate("/loginAdmin")
        } catch(e) {
            console.log(e)
            setError("Failed to create an account")
        }

        setLoading(false)
    }

    return (
        <>
            <section className='container'>
                <p className={"errmsg"} aria-live="assertive">{error}</p>
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        id="email"
                        ref={emailRef}
                        autoComplete="off"
                        required
                        aria-describedby="uidnote"
                        placeholder='Your email..'
                    />

                    <input
                        type="password"
                        id="password"
                        required
                        ref={passwordRef}
                        aria-describedby="pwdnote"
                        placeholder='Password'
                    />
                    
                    <input
                        type="password"
                        id="confirm_pwd"
                        required
                        ref={passwordConfirmRef}
                        aria-describedby="confirmnote"
                        placeholder='Confirm Password'
                    />

                    <button disabled={loading}>Sign Up</button>
                </form>
                <p className='already-cta'>
                    Already registered?
                    <span className="line">
                        <Link to="/loginAdmin">Sign In</Link>
                    </span>
                </p>
            </section>
        </>
    )
}

export default RegisterAdmin