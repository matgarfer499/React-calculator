import { useState } from 'react';
import CalculatorButton from "./components/CalculatorButton";
import SignButton from "./components/SignButton";
import Screen from "./components/Screen";

function App() {
    const [number, setNumbers] = useState(0);
    const [operator1, setOperator1] = useState(null)
    const [sign, setSign] = useState(null)
    const [erase, setErase] = useState('AC')

    const calculatorValues = [
                                erase, '±', '%', '÷',
                                '7', '8', '9', '×',
                                '4', '5', '6', '-',
                                '1', '2', '3', '+',
                                '0', '.', '='
                            ]

    const operations = (operator1, operator2, sign) => {
        let result = 0
        let op1 = parseFloat(operator1)
        let op2 = parseFloat(operator2)
        switch(sign){
            case '+':
                result = op1 + op2
                break;
            case '-':
                result = op1 - op2
                break;
            case '÷':
                result = op1 / op2
                break;
            case '×':
                result = op1 * op2
                break;
        }
        setOperator1(result)
        setNumbers(result)
        
    }

    const result = () => {
        if(number === 0 && sign === '÷'){
            setNumbers('Error')
            setTimeout(() => {
                setNumbers(0)
            }, 2000)
        }else {
            operations(operator1, number, sign)
        }
    }

    const reset = () => {
        if(erase === 'AC'){
            setOperator1(null)
            setSign(null)
        } else {
            setErase('AC')
        }
        setNumbers(0)
    }

    const signHandler =  (event) => {
        if(operator1 === null){
            setOperator1(number)
        }
        setNumbers(0)
        setSign(event.target.value)
    }

    const printNumber = (event) => {
        let clickedNumber = event.target.value
        let newNumber
        if(number === 0 && clickedNumber !== '±' && clickedNumber !== '0'){
            newNumber = parseFloat(clickedNumber)
        }else if(clickedNumber === '±'){
            newNumber = parseFloat(number * -1)
        }else if(clickedNumber === '%'){
            newNumber = parseFloat(number / 100)
        }else{
            newNumber = parseFloat(number + clickedNumber)
        }
        setErase('C')
        setNumbers(newNumber)
    }

    const dotHandler = (event) => {
        let dot = event.target.value
        let numberString = number.toString()
      
        if (!numberString.includes('.')) {
            setNumbers(number + dot)
        }
    }
      

    return (
        <main className="w-screen h-screen flex flex-wrap justify-center items-center">
            <h1 className="w-full text-center text-2xl font-semibold text-[#EDEDED]">
                IPHONE CALCULATOR
            </h1>
            <div className="w-full sm:w-3/4 md:w-2/4 lg:w-[380px] 2xl:1/4 h-4/5 sm:border-2 rounded-xl">
                <Screen value={number}/>
                <div className="w-full sm:w-5/6 m-auto grid grid-cols-4">
                    {
                        calculatorValues.flat().map((btn, i) =>{
                            return (
                                btn === erase || btn === '±' || btn === '%' ? (
                                    <CalculatorButton key={i} onClick={btn === erase ? reset : printNumber} value={btn} className={'w-[70px] h-[70px] text-[#000000] bg-[#9f9f9f] rounded-full text-2xl mb-4 font-semibold m-auto'}/>
                                ) : btn === '÷' || btn === '×' || btn === '-' || btn === '+' || btn === '=' ? (
                                    <SignButton key={i} onClick={btn === '=' ? result : signHandler} value={btn}/>
                                ) :
                                <CalculatorButton key={i} onClick={btn === '.' ? dotHandler : printNumber} value={btn} className={btn === '0' ? 'w-4/5 h-[70px] text-white bg-[#313131] rounded-full text-2xl mb-4 font-semibold text-left pl-8 m-auto col-span-2' : 'w-[70px] h-[70px] text-white bg-[#313131] rounded-full text-2xl mb-4 font-semibold m-auto'}/>
                            )
                        })
                    }
                </div>
            </div>
        </main>
    );
}

export default App;
