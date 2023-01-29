import {useState} from 'react';
import './App.scss';

function App() {
  const [result, setResult] = useState('0');
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [value, setValue] = useState(null);
  const [operator, setOperator] = useState(null);
  
  const inputValue = (digit) => {
    const newResult = waitingForOperand ? digit : result === '0' ? digit : result + digit;
    setResult(newResult);
    setWaitingForOperand(false);
  }

  const handleOperator = (nextOperator) => {
    const currentValue = parseFloat(result);
    if(value == null){
      setValue(currentValue);
    }else if(operator){
      const newValue = performCalculation[operator](value, currentValue);
      setValue(newValue);
      setResult(String(newValue));
    }
    setWaitingForOperand(true);
    setOperator(nextOperator);
  }

  const equal = () => {
    if (operator && !waitingForOperand) {
      const currentValue = parseFloat(result);
      const newValue = performCalculation[operator](value, currentValue);
      setValue(newValue);
      setResult(String(newValue));
      setOperator(null);
    }
  }

  const performCalculation = {
    '/': (prevValue, nextValue) => prevValue / nextValue,
    '*': (prevValue, nextValue) => prevValue * nextValue,
    '+': (prevValue, nextValue) => prevValue + nextValue,
    '-': (prevValue, nextValue) => prevValue - nextValue,
    '=': (prevValue, nextValue) => nextValue
  };

  const reset = () => {
    setValue(null);
    setResult('0');
    setOperator(null);
    setWaitingForOperand(false);
  }

  const dot = () => {
    if (waitingForOperand) {
      setResult('.');
    } else if (result.indexOf('.') === -1) {
      setResult(result + '.');
    }
  }

  const minusPlus = () => {
    const currentValue = parseFloat(result);
    setResult(String(-currentValue));
  }

  const percent = () => {
    const currentValue = parseFloat(result);
    if(value == null){
      const newValue = currentValue / 100;
      setResult(String(newValue));
    } else {
      const newValue = (currentValue / 100) * value;
      setResult(String(newValue));
    }
  }

  return (
    <div className="container">
        <div id="border">
            <div id="result">{result}</div>
            <div id="keyboard">
                    <div className="grey" onClick={reset}>AC</div>
                    <div className="grey" onClick={minusPlus}>+/-</div>
                    <div className="grey" onClick={percent}>%</div>
                    <div className="orange" onClick={() => handleOperator('/')}>÷</div>
                    <div onClick={()=>inputValue("7")}>7</div><div onClick={()=>inputValue("8")}>8</div><div onClick={()=>inputValue("9")}>9</div><div className="orange" onClick={() => handleOperator('*')}>x</div>
                    <div onClick={()=>inputValue("4")}>4</div><div onClick={()=>inputValue("5")}>5</div><div onClick={()=>inputValue("6")}>6</div><div className="orange" onClick={() => handleOperator('-')}>-</div>
                    <div onClick={()=>inputValue("1")}>1</div><div onClick={()=>inputValue("2")}>2</div><div onClick={()=>inputValue("3")}>3</div><div className="orange" onClick={() => handleOperator('+')}>+</div>
                    <div onClick={()=>inputValue("0")}><span>0</span></div><div onClick={dot}>.</div><div className="orange" onClick={equal}>=</div>
            </div>
        </div>
    </div>
  );
}

export default App;