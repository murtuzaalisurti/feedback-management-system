import React from 'react'
import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useParams, Link, useNavigate } from 'react-router-dom'

import styles from '../styles/Responses.module.scss'

const Responses = () => {

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

    function deleteForm() {
        fetch(`https://feedsys-server.netlify.app/.netlify/functions/api/removeForm`, {
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

    useEffect(() => {
        fetch('https://feedsys-server.netlify.app/.netlify/functions/api/getForm', {
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

    return (
        <>
            {
                !deleted ? (
                    loading ? 'loading' : (
                        <>
                            <section className={styles.header}>
                                <h2><Link to='/dashboard'>Dashboard</Link>{` > Response`}</h2>
                                <div className={styles.headerCta}>
                                    <Link to={`/dashboard/form/${id}`}>Go to form</Link>
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
                                            return question.responses.length >= 1 ? (
                                                <div key={index} className={styles.question}>
                                                    <div className={styles.quesNumber}>Q:- {index + 1}</div>
                                                    <div className={styles.questionText}>
                                                        {question.QuestionText}
                                                    </div>
                                                    <div className={styles.responses}>
                                                        {
                                                            question.responses.map((response, resIndex) => {
                                                                return (
                                                                    <div className={styles.inputContainer} key={resIndex}>
                                                                        <div className={`${styles.inputs} response`}>
                                                                            {question.Option.length > 0 ? (
                                                                                question.Option.map((option, optIndex) => {
                                                                                    if (question.type === 'multipleChoice') {
                                                                                        var check = false;
                                                                                        response.resText.forEach((res, index) => {
                                                                                            if (option.OptionText === res) {
                                                                                                check = true
                                                                                            }
                                                                                        })
                                                                                    }

                                                                                    return (question.type === 'multipleChoice') ?
                                                                                        (
                                                                                            <label key={optIndex}>
                                                                                                <input type='checkbox' checked={check} value={option.OptionText} name={question._id} />
                                                                                                {option.OptionText}<br />
                                                                                            </label>
                                                                                        ) : (
                                                                                            <label key={optIndex}><input type='radio' checked={response.resText[0] === option.OptionText} value={option.OptionText} name={response.resId} />{option.OptionText}<br /></label>
                                                                                        )
                                                                                })
                                                                            ) : (
                                                                                question.type === 'text' && <input type='text' value={response.resText[0]} />
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            ) : (
                                                index === formData.questions.length - 1 ? <p key={index}>No responses</p> : <div key={index}></div>
                                            )
                                        })
                                    ) : (
                                        <p>{'No questions'}</p>
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

export default Responses