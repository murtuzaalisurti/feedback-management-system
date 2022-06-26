import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Form = () => {

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
                                formData.questions.map((question) => {
                                    return JSON.stringify(question)
                                })
                            ) : (
                                <div>{'No questions'}</div>
                            )
                        }</div>
                    </div>
                )
            }
        </>
    )
}

export default Form