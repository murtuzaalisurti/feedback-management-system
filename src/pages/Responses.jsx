import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Responses = () => {

    const { id } = useParams()
    const [formData, setFormData] = useState()
    const [loading, setLoading] = useState(true)

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

    return (
        <>
            {
                loading ? 'loading' : (
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
                                    // console.log(question.responses)
                                    return question.responses.length >= 1 ? (
                                        <div key={index} className="question">
                                            <div className='quesNumber'>Q:- {index + 1}</div>
                                            <div className="questionText">
                                                {question.QuestionText}
                                            </div>
                                            <div className="responses">
                                            {
                                                question.responses.map((response, resIndex) => {
                                                    return (
                                                        <div className="inputs response" key={resIndex}>
                                                            {question.Option.length > 0 ? (
                                                                question.Option.map((option, optIndex) => {
                                                                    if(question.type === 'multipleChoice') {
                                                                        var check = false;
                                                                        response.resText.forEach((res, index) => {
                                                                            if(option.OptionText === res) {
                                                                                check = true
                                                                            }
                                                                        })
                                                                    }

                                                                    return (question.type === 'multipleChoice') ? 
                                                                    (   
                                                                        <label key={optIndex}>
                                                                            <input type='checkbox' checked={check} value={option.OptionText} name={question._id} disabled={true} />
                                                                            {option.OptionText}<br />
                                                                        </label>
                                                                    ) : (
                                                                        <label key={optIndex}><input type='radio' checked={response.resText[0] === option.OptionText} disabled={true} value={option.OptionText} name={response.resId} />{option.OptionText}<br /></label>
                                                                    )
                                                                })
                                                            ) : (
                                                                question.type === 'text' && <input type='text' value={response.resText[0]} disabled={true} />
                                                            )}
                                                        </div>
                                                    )
                                                })
                                            }
                                            </div>
                                        </div>
                                    ) : (
                                        index === formData.questions.length - 1 ? <div key={index}>No responses</div> : <div key={index}></div>
                                    )
                                })
                            ) : (
                                <div>{'No questions'}</div>
                            )
                        }</div>
                        <button>Delete form</button>
                    </div>
                )
            }
        </>
    )
}

export default Responses