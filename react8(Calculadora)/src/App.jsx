import { useState, useEffect, useRef } from "react";
import { evaluate } from "mathjs";
import "./App.css";
import Alert from "./components/Alert.jsx";
import Button from "./components/Button.jsx";
import Input from "./components/Input.jsx";

export default function App() {
  const [text, setText] = useState("");
  const [alert, setAlert] = useState({ show: false });
  const [result, setResult] = useState("0");
  
  const lastCharRef = useRef("");

  function handleAlert({type, text}) {
    setAlert({ show: true, type, text });
    setTimeout(()=> {
      setAlert({show:false})
    },3000)
  }

  function clearAll() {
    setResult("0");
    setText("");
  }

  function handleClickNumber(val) {
    lastCharRef.current=val;
    setText(text => [...text, val])
  }

  function handleClickAction(val) {
    const actionKeys = ["+", "-", "*", "/", "."];
    
    if (!actionKeys.includes(lastCharRef.current)) {
      lastCharRef.current=val

      if(val==".") setText(text => [...text, val])
      else setText(text => [...text," " + val + " "]);
    }
    else handleAlert({type:"danger", text:"no puedes darle 2 veces seguidas mismo boton"})

  }

  const numberOfDecimals = 2;

  function calculate() {
    try {
      const input = text.join("").split(" ").join("");
      let rawResult = evaluate(input);
      let formatedResult = Number.isInteger(rawResult)?
        rawResult:parseFloat(rawResult.toFixed(numberOfDecimals))

      setResult(formatedResult);
      setText(formatedResult.toString());
      lastCharRef.current="";
    } catch(error) {
        clearAll();
        handleAlert({type:"danger", text:"la has liado parda"})
    }
  }

  return (
    <div className = "App">
      <div className="calc-wrapper">
        {alert.show && <Alert type={alert.type} text={alert.text} />}
        <Input text={text} result={result}/>
          <div className="row">
            <Button symbol="7" handleClick={handleClickNumber}/>
            <Button symbol="8" handleClick={handleClickNumber}/>
            <Button symbol="9" handleClick={handleClickNumber}/>
            <Button symbol="/" color="orange" handleClick={handleClickAction}/>
          </div>
          <div className="row">
            <Button symbol="4" handleClick={handleClickNumber}/>
            <Button symbol="5" handleClick={handleClickNumber}/>
            <Button symbol="6" handleClick={handleClickNumber}/>
            <Button symbol="*" color="orange" handleClick={handleClickAction}/>
          </div>
          <div className="row">
            <Button symbol="1" handleClick={handleClickNumber}/>
            <Button symbol="2" handleClick={handleClickNumber}/>
            <Button symbol="3" handleClick={handleClickNumber}/>
            <Button symbol="+" color="orange" handleClick={handleClickAction}/>
          </div>
          <div className="row">
            <Button symbol="0" handleClick={handleClickNumber}/>
            <Button symbol="." handleClick={handleClickAction}/>
            <Button symbol="=" color="blue" handleClick={calculate}/>
            <Button symbol="-" color="orange" handleClick={handleClickAction}/>
          </div>
          <Button symbol="Clear" color="red" handleClick={clearAll}/>
      </div>
    </div>
  );
}