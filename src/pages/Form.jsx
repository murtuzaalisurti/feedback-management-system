import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

const Form = () => {

    const { id } = useParams()
    const [formData, setFormData] = useState()
    const [loading, setLoading] = useState(true)
    const [deleted, setDeleted] = useState(false)

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
                            <Link to={`/dashboard/form/responses/${id}`}>See responses</Link>
                            <div className='formdata'>
                                <div>{`Form #${formData._id}`}</div>
                                <h1 className="formTitle">
                                    {formData.title}
                                </h1>
                                <h2 className='formDesc'>
                                    {formData.desc}
                                </h2>
                                <div className="questions">{
                                    formData.questions.length >= 1 ? (
                                        formData.questions.map((question, index) => {
                                            return (
                                                <div key={index} className="question">
                                                    <div className='quesNumber'>Q:- {index + 1}</div>
                                                    <div className="questionText">
                                                        {question.QuestionText}
                                                    </div>
                                                    <div className="inputs">
                                                        {question.Option.length > 0 ? (
                                                            question.Option.map((option, index) => {
                                                                return (question.type === 'multipleChoice') ? <label key={index}><input type='checkbox' value={option.OptionText} name={question._id} />{option.OptionText}<br /></label> : <label key={index}><input type='radio' value={option.OptionText} name={question._id} />{option.OptionText}<br /></label>
                                                            })
                                                        ) : (
                                                            question.type === 'text' && <input type='text' placeholder='Type your answer' />
                                                        )}
                                                    </div>
                                                </div>
                                            )
                                        })
                                    ) : (
                                        <div>{'No questions'}</div>
                                    )
                                }</div>
                                <button onClick={() => deleteForm()}>Delete form</button>
                            </div>
                        </>
                    )
                ) : (
                    <div>Form Successfully Deleted</div>
                )
            }
        </>
    )
}

export default Form