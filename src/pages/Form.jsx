import React from 'react'
import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useParams, Link, useNavigate } from 'react-router-dom'

import styles from '../styles/Form.module.scss'

const Form = () => {

    const { id } = useParams()
    const [formData, setFormData] = useState()
    const [loading, setLoading] = useState(true)
    const [deleted, setDeleted] = useState(false)

    const navigate = useNavigate()
    const { logout } = useAuth()


    async function handleLogout() {

        try {
            await logout()
            navigate("/loginAdmin")
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        fetch('http://localhost:5000/getForm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                formId: id
            })
        }).then((res) => {
            return res.json()
        }).then((data) => {
            console.log(data)
            setFormData(data.data)
        })
    }, [id])

    useEffect(() => {
        formData !== undefined ? setLoading(false) : setLoading(true)
    }, [formData])

    function deleteForm() {
        fetch(`http://localhost:5000/removeForm`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                formId: id
            })
        }).then((res) => {
            return res.json()
        }).then((data) => {
            console.log(data.data, data.err)
            if (data.err) {
                console.log('deleting failed')
            } else {
                setDeleted(true)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <>
            {
                !deleted ? (
                    loading ? 'loading' : (
                        <>
                            <section className={styles.header}>
                                <h2><Link to='/dashboard'>Dashboard</Link>{` > Form`}</h2>
                                <div className={styles.headerCta}>
                                    <Link to={`/dashboard/form/responses/${id}`}>See responses</Link>
                                    <button onClick={handleLogout}>Logout</button>
                                </div>
                            </section>
                            <section className={styles.formContent}>
                                <div className={styles.formMetaData}>
                                    <h1 className={styles.formTitle}>
                                        {formData.title}
                                    </h1>
                                    <h2 className={styles.formDesc}>
                                        {formData.desc}
                                    </h2>
                                </div>
                                <div className={styles.questions}>{
                                    formData.questions.length >= 1 ? (
                                        formData.questions.map((question, index) => {
                                            return (
                                                <div key={index} className={styles.question}>
                                                    <div className={styles.quesNumber}>Q:- {index + 1}</div>
                                                    <div className={styles.questionText}>
                                                        {question.QuestionText}
                                                    </div>
                                                    <div className={styles.inputContainer}>
                                                        <div className={styles.inputs}>
                                                            {question.Option.length > 0 ? (
                                                                question.Option.map((option, index) => {
                                                                    return (question.type === 'multipleChoice') ? <label key={index}><input type='checkbox' value={option.OptionText} name={question._id} />{option.OptionText}<br /></label> : <label key={index}><input type='radio' value={option.OptionText} name={question._id} />{option.OptionText}<br /></label>
                                                                })
                                                            ) : (
                                                                question.type === 'text' && <input type='text' placeholder='Type your answer' />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    ) : (
                                        <p>{`No questions!    `}<Link to={`/dashboard/form/addQues/${id}`}>Add questions</Link></p>
                                    )
                                }</div>
                                <div className={styles.deleteOrSubmitBtn}>
                                    <button onClick={() => deleteForm()}>Delete form</button>
                                </div>
                            </section>
                        </>
                    )
                ) : (
                    <div className={styles.formDeletedOrSubmittedMsg}>Form Successfully Deleted</div>
                )
            }
        </>
    )
}

export default Form