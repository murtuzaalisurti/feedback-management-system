import { useState, useEffect } from "react";
import React from "react";
import '../styles/questions.css'
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../contexts/AuthContext";


function Questions() {

    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState("");

    const [formId, setFormId] = useState("");

    const navigate = useNavigate()
    const { logout } = useAuth()

    async function handleLogout() {
        setErrMsg("")

        try {
            await logout()
            navigate("/loginAdmin")
        } catch (e) {
            console.error(e)
            setErrMsg("Failed to log out")
        }
    }

    useEffect(() => {
        let url_string = window.location.href;
        let url = new URL(url_string);
        let formId = url.searchParams.get("id");
        setFormId(formId)
    }, [])

    const [question, setQuestion] = useState([{
        QuestionText: "Question",
        type: "",
        option: [{ OptionText: "Option 1" }]
    }]);


    const QuesType = (text, index) => {
        var changeQuesType = [...question];
        changeQuesType[index].type = text;
        setQuestion(changeQuesType);
    }

    const addOption = (index) => {
        var choices = [...question];

        choices[index].option.push({ OptionText: "Option " + (choices[index].option.length + 1) });

        setQuestion(choices);
    }

    const addQues = (index) => {

        if (question[index].QuestionText === "Question" || question[index].QuestionText === "") {
            setErr(true);
            setErrMsg("Please Fill All Required Fields");
        } else {
            console.log(question)

            var quest = [...question];
            
            quest[index].option.length = 1
            setQuestion(quest);

            setErr(false);
            setSuccess("Successfully Added");
        }
    }

    const quesText = (text, index) => {
        var changeQuesText = [...question];
        changeQuesText[index].QuestionText = text;
        setQuestion(changeQuesText);
    }

    const optionText = (text, index, indexs) => {
        var optionsOfQuestion = [...question];
        optionsOfQuestion[index].option[indexs].OptionText = text;
        setQuestion(optionsOfQuestion);
    }

    const setUserResponse = (text, index, indexs) => {
        var userResponse = [...question];
        userResponse[index].option[indexs].OptionText = text;
        setQuestion(userResponse);
    }

    return (
        <>
            <button onClick={handleLogout}>Logout</button>
            <section className="error">
                <p className={err ? "errorMsg" : "successMsg"}>{err ? errMsg : success}
                </p>
            </section>
            <section className="questionArea">
                <h2>Add Question</h2>
                {question.map((element, index) => {
                    return (
                        <div key={index}>
                            <div className='container'>
                                <div className='question'>
                                    <textarea value={element.QuestionText} rows="3" cols="35" onChange={(e) => { quesText(e.target.value, index) }} />
                                </div>
                            </div>

                            <div className="selectType">
                                <label htmlFor='type'>Select Type of Question :</label>
                                <select name='question' onChange={(e) => { QuesType(e.target.value, index) }}>
                                    <option></option>
                                    <option value="singleChoice">Single Choice</option>
                                    <option value="multipleChoice">Multiple Choice</option>
                                    <option value="text">Single Line</option>
                                </select>
                            </div>
                            {element.type === "singleChoice" ? <div className='App'>
                                {element.option.map((options, indexs) => {
                                    return (
                                        <>
                                            <div className='options'>
                                                <input type="radio" value={element.option[indexs].OptionText} name={element.type} />
                                                <textarea value={element.option[indexs].OptionText} rows="1" cols="7" onChange={(e) => { optionText(e.target.value, index, indexs) }} />
                                            </div>
                                            {element.option.length - 1 === indexs ? <div className='addOption'>
                                                <button onClick={() => { addOption(index) }}>Add Option</button>
                                            </div> : null}
                                        </>
                                    )
                                })}
                            </div> : null}

                            {element.type === "multipleChoice" ? <div className='App'>
                                {element.option.map((options, indexs) => {
                                    return (
                                        <>
                                            <div className='options' key={indexs}>
                                                <input type="checkbox" value={element.option[indexs].OptionText} name={element.type} />
                                                <textarea value={element.option[indexs].OptionText} rows="1" cols="7" onChange={(e) => { optionText(e.target.value, index, indexs) }} />
                                            </div>
                                            {element.option.length - 1 === indexs ? <div className='addOption'>
                                                <button onClick={() => { addOption(index) }}>Add Option</button>
                                            </div> : null}
                                        </>
                                    )
                                })}
                            </div> : null}

                            {element.type === "text" ? <div className='App'>
                                {element.option.map((options, indexs) => {
                                    { element.option.length = 1 }
                                    return (
                                        <>
                                            <div className='options' key={indexs}>
                                            <input type="text" value={element.option.OptionText}  placeholder="Enter Your Response" onChange={(e)=>{setUserResponse(e.target.value, index, indexs)}}/>
                                            </div>
                                        </>
                                    )
                                })}
                            </div> : null}

                            {question.length - 1 === index ? <div className='addQuestion'>
                                <button onClick={() => { addQues(index) }}>Add Question</button>
                            </div> : null}
                        </div>
                    )
                })}

            </section>
        </>
    )
}

export default Questions