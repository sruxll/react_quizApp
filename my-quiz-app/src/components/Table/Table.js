import React, { useState } from 'react';
import './Table.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Table() {
    let [array, setArray] = useState([]);
    const [inputdata, setInputdata] = useState({quizID: "", question: "", questionType: "", correctAnswer: ""});
    let [index, setIndex]=useState();
    let [bolin, setBolin]=useState(false);
    let {quizID, question, questionType, correctAnswer} = inputdata;

    function data(e) {
      setInputdata({...inputdata, [e.target.name]: e.target.value})
    }

    function addInputdata(){
      if(quizID === "" || question === "" || questionType === "" || correctAnswer === "") {
        alert("Please enter all sufficient information!")
      } else { 
        setArray([...array, {quizID, question, questionType, correctAnswer}])
        setInputdata({quizID: "", question: "", questionType: "", correctAnswer: ""});
      }
    }

    function deletedata(i){
      let total=[...array]
      total.splice(i, 1)
      setArray(total)
    }

    function updatedata(i){
      let {quizID, question, questionType, correctAnswer}=array[i]
      setInputdata({quizID, question, questionType, correctAnswer});
      setBolin(true);
    }

    function updateinfo(){
      let total=[...array]
      total.splice(index,1,{quizID, question, questionType, correctAnswer});
      setArray(total);
      setBolin(false);
      setInputdata({quizID: "", question: "", questionType: "", correctAnswer: ""});
    }

    const handleSubmitData = () => {
      if (array) {
        axios.post('/api/uploadquizdata', array)
          .then(response => {
            // Handle response from the server
            toast.success("File Uploaded Successfully");
            setArray([]);
          })
          .catch(error => {
            // Handle error
            toast.error("File Uploaded Failed");
          });
      }
    };
  
  return (
    <div>
      <div className='quiz'>
          <input type="text" value={inputdata.quizID || ""} name='quizID' autoComplete='off' placeholder='Enter quizID' onChange={data} />
          <input type="text" value={inputdata.question || ""} name='question' autoComplete='off' placeholder='Enter question' onChange={data} />
          <input type="text" value={inputdata.questionType || ""} name='questionType' autoComplete='off' placeholder='Enter questionType (e.g mc, fib)' onChange={data} />
          <input type="text" value={inputdata.correctAnswer || ""} name='correctAnswer' autoComplete='off' placeholder='Enter correct answer' onChange={data} />
          <button onClick={!bolin?addInputdata:updateinfo}>{!bolin?`Add data`:`Update data`}</button>
          <br />
          <table border="1" width="100%">
            <tr>
              <th>quizID</th>
              <th>question</th>
              <th>questionType</th>
              <th>correctAnswer</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
            {
              array && array.map(
                (item, i)=>{
                  return(
                    <tr key={i}>
                      <td>{item.quizID}</td>
                      <td>{item.question}</td>
                      <td>{item.questionType}</td>
                      <td>{item.correctAnswer}</td>
                      <td><button onClick={()=>updatedata(i)}>update</button></td>
                      <td><button onClick={()=>deletedata(i)}>delete</button></td>
                    </tr>
                  )
                }
              )
            }
          </table>
      </div>
      <div>
          <button className='button' onClick={handleSubmitData}>SubmitData</button>
          <ToastContainer />
      </div>
    </div>
  )
}

export default Table