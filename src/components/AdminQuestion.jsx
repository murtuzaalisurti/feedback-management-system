import { useState } from "react";
import React from "react";

function AdminQuestion() {

    const [question, setQuestion] = useState([{
        QuestionText: "Question",
        QID: 0,
        type: "",
        option: [{ OptionText: "Option 1" }]
    }]);

    const [type, setType] = useState();

    const QuesType = (event) => {
        setType(event.target.value);
    }

    const addOption = (index) => {
        var choices = [...question];

        choices[index].option.push({ OptionText: "Option " + (choices[index].option.length + 1) });

        setQuestion(choices);
    }

    const addQues = (index) => {

        if (question[index].QuestionText === "Question") {
            alert("Please Enter the required Fields");
        } else {
            console.log(question)

            var quest = [...question];
            quest[index].QID = quest[index].QID + 1;
            quest[index].type = type
            setQuestion(quest);
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

    return (
        <>
            {question.map((element, index) => {
                return (
                    <>
                        <div className='container' key={index}>
                            <div className='question'>
                                <textarea value={element.QuestionText} rows="3" cols="50" onChange={(e) => { quesText(e.target.value, index) }} />
                            </div>
                        </div>

                        <label htmlFor='type'>Select Type of Question :</label>
                        <select name='question' onChange={QuesType}>
                            <option></option>
                            <option value="Single Choice">Single Choice</option>
                            <option value="Multiple Choice">Multiple Choice</option>
                            <option value="Single Line">Single Line</option>
                        </select>

                        {type == "Single Choice" ? <div className='App'>
                            {element.option.map((options, indexs) => {
                                return (
                                    <>
                                        <div className='options'>
                                            <input type="radio" value={element.option[indexs].OptionText} name={element.QID} />
                                            <textarea value={element.option[indexs].OptionText} rows="1" cols="7" onChange={(e) => { optionText(e.target.value, index, indexs) }} />
                                        </div>
                                    </>
                                )
                            })}
                        </div> : null}

                        {type == "Multiple Choice" ? <div className='App'>
                            {element.option.map((options, indexs) => {
                                return (
                                    <>
                                        <div className='options'>
                                            <input type="checkbox" value={element.option[indexs].OptionText} name={element.QID} />
                                            <textarea value={element.option[indexs].OptionText} rows="1" cols="7" onChange={(e) => { optionText(e.target.value, index, indexs) }} />
                                        </div>
                                    </>
                                )
                            })}
                        </div> : null}

                        <div className='addOption'>
                            <button onClick={() => { addOption(index) }}>Add Option</button>
                        </div>

                        {question.length - 1 === index ? <div className='addQuestion'>
                            <button onClick={() => { addQues(index) }}>Add Question</button>
                        </div> : null}
                    </>
                )
            })}


        </>
    )
}

export default AdminQuestion