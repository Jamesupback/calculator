import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { useState } from 'react';
import {evaluate, isNumber} from 'mathjs'
function App(){
const[oldstate,newstate]=useState("");
const[olddisp,newdisp]=useState("");
const[hasclicked,sethasclicked]=useState(false)

function clear(){
  newstate("0");
  newdisp("");
}
function click(event){
  const display=document.getElementById("display");
  if(hasclicked && /\d/.test(event.target.innerText))
  display.innerText="";
  sethasclicked(false)
  const data=display.innerText+event.target.textContent;
  const filterzeros=data.replace(/(?<!\.)0+(?=[1-9])/g,"")
  const filtermultiples=filterzeros.replace(/(?<=\.\d*)\./g,"")
  const filter=filtermultiples.replace(/[\+,\-,\/,\*]+(?=[\+,\*,\/](\-)?\d)/g,"")
  newstate(filter)
  newdisp(filter);
}
function eva(){
  sethasclicked(true)
  try{
    
  const result=evaluate(oldstate);
  newstate(result);
  }
  catch(error){
    newdisp("error")
    console.log(error)
  }
}

  return(
  <div id="calculator">
    <div id="panel">
      <div id="calcs">{olddisp}</div>
      <div id="display">{oldstate}</div>
    </div>
    <div id="clickables">
    <div id="clear" className="butt grid-col-span-2" onClick={clear}>clear</div>
    <div id="multiply" className="butt" onClick={click}>*</div>
    <div id="divide" className="butt" onClick={click}>/</div>
    <div id="seven" className="butt" onClick={click}>7</div>
    <div id="eight" className="butt" onClick={click}>8</div>
    <div id="nine" className="butt" onClick={click}>9</div>
    <div id="add" className="butt" onClick={click}>+</div>
    <div id="four" className="butt" onClick={click}>4</div>
    <div id="five" className="butt" onClick={click}>5</div>
    <div id="six" className="butt" onClick={click}>6</div>
    <div id="subtract" className="butt" onClick={click}>-</div>
    <div id="one" className="butt" onClick={click}>1</div>
    <div id="two" className="butt" onClick={click}>2</div>
    <div id="three" className="butt" onClick={click}>3</div>
    <div id="equals"className="butt grid-row-span-2" onClick={eva}>=</div>
    <div id="zero" className="butt grid-col-span-2" onClick={click}>0</div>
    <div id="decimal" className="butt" onClick={click}>.</div>
    </div>
  </div>
)}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
