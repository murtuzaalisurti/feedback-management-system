import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import '../styles/dashboard.css'

const Dashboard = () => {

    const [error, setError] = useState()
    const navigate = useNavigate()
    const { currentUser, logout } = useAuth()

    const [forms, setForms] = useState()

    async function handleLogout() {
        setError("")

        try {
            await logout()
            navigate("/loginAdmin")
        } catch (e) {
            console.error(e)
            setError("Failed to log out")
        }
    }

    function handleNewForm() {
        fetch('http://localhost:5000/addForm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: 'form10',
                desc: 'form10 desc'
            })
        }).then((res) => {
            return res.json()
        }).then((data) => {
            console.log(data)
            navigate(`/newForm?id=${data.formId}`)
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        fetch('http://localhost:5000/allForms').then((res) => {
            return res.json()
        }).then((data) => {
            console.log(data.data)
            setForms(data.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    
    return (
        <>
            <p className={"errmsg"} aria-live="assertive">{error}</p>
            <div>Dashboard</div>
            {currentUser && <p>Email: {currentUser.email}</p>}
            <button onClick={handleNewForm}>Create a new form</button>
            <button onClick={handleLogout}>Logout</button>

            <h1>Forms</h1>
            {forms ? forms.map((form, index) => {
                return (
                    <div className='formCard' onClick={() => navigate(`/dashboard/form/${form._id}`)} key={index}>
                        <p>{form.title}</p>
                        <p>{form.desc}</p>
                    </div>
                )
            }) : (
                <p>No forms created</p>
            )}
            
        </>
    )
}

export default Dashboard