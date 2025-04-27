import s from '../../../styles/components/calculator.module.scss';
import {useEffect, useRef, useState} from "react";

const buttons = [
    {content: '7', type: 'number'},
    {content: '8', type: 'number'},
    {content: '9', type: 'number'},
    {content: 'C', type: 'clear'},
    {content: '4', type: 'number'},
    {content: '5', type: 'number'},
    {content: '6', type: 'number'},
    {content: '+', type: 'operator'},
    {content: '1', type: 'number'},
    {content: '2', type: 'number'},
    {content: '3', type: 'number'},
    {content: '-', type: 'operator'},
    {content: '0', type: 'number'},
    {content: '=', type: 'equal'},
]

export default function Calculator() {
    const [operand1, setOperand1] = useState('');
    const [operator, setOperator] = useState('');
    const [operand2, setOperand2] = useState('');
    const [isResult, setIsResult] = useState(false);
    const displayRef = useRef(null);

    useEffect(() => {
        if (displayRef.current) {
            displayRef.current.scrollLeft = displayRef.current.scrollWidth;
        }
    }, [operand1, operator, operand2]);

    const handleClickNumbers = (operand) => {
        if (isResult && !operator) {
            setOperand1(operand);
            setOperand2('');
            setOperator('');
            setIsResult(false);
            return;
        }
        if (operator === '') {
            setOperand1(prev => prev + operand);
        } else {
            setOperand2(prev => prev + operand);
        }
    }

    const handleClickOperator = (newOperator) => {
        if (operand1 && operator && operand2) {
            handleClickEqual();
            setOperator(newOperator);
        } else if (operand1 === '' && newOperator === '-') {
            setOperand1(newOperator);
        } else if (operand1 === '-' && newOperator === '+') {
            setOperand1('');
        } else if (operand1 === '' || operand1 === '-' && newOperator) {
            return;
        }
        setOperator(newOperator);
    }

    const handleClickClear = () => {
        setOperand1('');
        setOperand2('');
        setOperator('');
        setIsResult(false);
    }

    const handleClickEqual = () => {
        if (!operand1 || !operator || !operand2) {
            console.warn('Incomplete expression');
            return;
        }

        const num1 = Number(operand1);
        const num2 = Number(operand2);

        if (isNaN(num1) || isNaN(num2)) {
            console.warn('Invalid number input');
            return;
        }

        let result;
        switch (operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            default:
                console.error('Unsupported operator');
        }

        setOperand1(result.toString());
        setOperator('');
        setOperand2('');
        setIsResult(true);
    }

    return (
        <main className={s.calculator}>
            <div className={s['calculator__display']} ref={displayRef}>
                <p className={s['calculator__value']}>{operand1}{operator}{operand2}</p>
            </div>
            <div className={s['calculator__controls']}>
                {buttons.length > 0 && buttons.map((button) => {
                    let onClickHandler, classButton = '';
                    if (button.type === 'number') {
                        onClickHandler = () => handleClickNumbers(button.content);
                    } else if (button.type === 'operator') {
                        onClickHandler = () => handleClickOperator(button.content);
                        classButton = s['calculator__button--operator'];
                    } else if (button.type === 'clear') {
                        onClickHandler = () => handleClickClear();
                        classButton = s['calculator__button--clear'];
                    } else if (button.type === 'equal') {
                        onClickHandler = () => handleClickEqual();
                        classButton = s['calculator__button--equal'];
                    }

                    return (
                        <button
                            className={`${s['calculator__button']} ${classButton}`}
                            onClick={onClickHandler}
                            key={button.content}
                        >
                            {button.content}
                        </button>
                    )
                })}
            </div>
        </main>
    )
}
