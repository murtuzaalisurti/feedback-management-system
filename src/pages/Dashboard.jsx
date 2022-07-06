import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import styles from '../styles/Dashboard.module.scss'

const Dashboard = () => {

    const [error, setError] = useState()
    const navigate = useNavigate()
    const { currentUser, logout } = useAuth()

    const [forms, setForms] = useState()

    const [newForm, setNewForm] = useState({
        formName: '',
        formDesc: ''
    });
    
    const handleNewFormDetails = (e) => {
        setNewForm((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

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
        fetch('https://feedsys-server.netlify.app/.netlify/functions/api/addForm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: newForm.formName,
                desc: newForm.formDesc
            })
        }).then((res) => {
            return res.json()
        }).then((data) => {
            console.log(data)
            navigate(`/dashboard/form/addQues/${data.formId}`)
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        fetch('https://feedsys-server.netlify.app/.netlify/functions/api/allForms').then((res) => {
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
            <section className={styles.header}>
                <h2>Dashboard</h2>
                <button onClick={handleLogout}>Logout</button>
            </section>
            {/* {currentUser && <p>Email: {currentUser.email}</p>} */}
            <section className={styles.newFormSection}>
                <input type="text" placeholder='Form Name' className='newFormName' id='newFormName' value={newForm.formName} name='formName' onChange={(e) => handleNewFormDetails(e)} />
                <input type="text" placeholder='Form Description' id='newFormDesc' className='newFormDesc' value={newForm.formDesc} name='formDesc' onChange={(e) => handleNewFormDetails(e)} />
                <button onClick={handleNewForm} disabled={(newForm.formName !== '' && newForm.formDesc !== '') ? false : true}>Create a new form</button>
            </section>

            <section className={styles.allForms}>
                <h1 className={styles.allFormsHeading}>All Forms</h1>
                <div className={styles.forms}>
                    {forms ? forms.map((form, index) => {
                        return (
                            <div className={styles.formCard} onClick={() => navigate(`/dashboard/form/${form._id}`)} key={index}>
                                <p className={styles.formTitle}>{form.title}</p>
                                <p className={styles.formDesc}>{form.desc}</p>
                            </div>
                        )
                    }) : (
                        <p>No forms created</p>
                    )}
                </div>
            </section>
            
        </>
    )
}

export default Dashboard