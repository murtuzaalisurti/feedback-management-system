import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../styles/form.css'

const ClientForm = () => {

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

    function handleSubmit(e) {
        e.preventDefault();
        const responses = []

        function pushResponses(typeValue, textValue, qid) {
            responses.push({
                qID: qid,
                resText: textValue,
                resType: typeValue
            })
        }
        
        document.querySelectorAll(`.${e.target.className} .questions .question .inputs`).forEach((field) => {
            const questionID = field.dataset.qid;
            document.querySelectorAll(`.input-${questionID} input`).forEach((input) => {
                if(input.type === 'text') {
                    pushResponses(input.type, input.value, questionID)
                } else if(input.type === 'checkbox') {
                    if(input.checked === true) {
                        pushResponses(input.type, input.value, questionID)
                    }
                } else if(input.type === 'radio') {
                    if(input.checked === true) {
                        pushResponses(input.type, input.value, questionID)
                    }
                }
            })
        })
        console.log(responses)

        fetch(`http://localhost:5000/addResponse`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                formId: id,
                responses: responses
            })
        })
    }

    return (
        <>
            {
                loading ? 'loading' : (
                    <form className='formdata' onSubmit={(e) => handleSubmit(e)}>
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
                                            <div className={`inputs input-${question._id}`} data-qid={question._id}>
                                                {question.Option.length > 0 ? (
                                                    question.Option.map((option, index) => {
                                                        return (question.type === 'multipleChoice') ? <label key={index}><input type='checkbox' value={option.OptionText} name={question._id} />{option.OptionText}<br /></label> : <label key={index}><input type='radio' value={option.OptionText} name={question._id} />{option.OptionText}<br /></label>
                                                    })
                                                ) : (
                                                    question.type === 'text' && <input type='text' name={question._id} placeholder='Type your answer' />
                                                )}
                                            </div>
                                        </div>
                                    )
                                })
                            ) : (
                                <div>{'No questions'}</div>
                            )
                        }</div>
                        <br />
                        <button>Submit</button>
                    </form>
                )
            }
        </>
    )
}

export default ClientForm