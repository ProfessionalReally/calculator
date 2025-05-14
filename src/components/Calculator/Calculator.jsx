import s from '../../styles/components/calculator.module.scss';
import {useEffect, useRef, useState} from "react";
import {
    CALCULATOR_BUTTONS as buttons,
    CALCULATOR_BUTTONS_TYPE as buttonsType,
    ENUM_SIGNS as signs
} from "../../constants";

const toFormatResult = (result) => {
    const rounded = +result.toPrecision(9);
    let strResult = rounded.toString();
    if (strResult.includes(signs.Comma)) {
        strResult = strResult.replace(/\.?0+$/, '');
    }
    return strResult;
}

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

        if (operand1 === signs.Infinity) {
            handleClickClear();
            return;
        }

        if (operator === '') {
            setOperand1(prev => prev + operand);
            return;
        }
        setOperand2(prev => prev + operand);
    }

    const handleClickOperator = (newOperator) => {
        if (isResult) {
            setIsResult(false);
        }

        if (operand1 && operator && operand2) {
            handleClickEqual();
            setIsResult(false);
            setOperator(newOperator);
            return;
        }

        if (operand1 === signs.Infinity) {
            return;
        }

        if (operand1 === '' && newOperator === signs.Minus) {
            setOperand1(newOperator);
            return;
        }

        if (operand1 === signs.Minus && newOperator === signs.Plus) {
            setOperand1('');
            return;
        }

        if ((operand1 === '' || operand1 === signs.Minus) && newOperator) {
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

        console.log(operator);

        let result;
        switch (operator) {
            case signs.Plus:
                result = num1 + num2;
                break;
            case signs.Minus:
                result = num1 - num2;
                break;
            case signs.Multiplication:
                result = num1 * num2;
                break;
            case signs.Division:
                result = num2 ? num1 / num2 : signs.Infinity;
                break;
            case signs.Percent:
                result = (num1 * num2) / 100;
                break;
            default:
                console.error('Unsupported operator');
        }

        result = toFormatResult(result);

        setOperand1(result);
        setOperator('');
        setOperand2('');
        setIsResult(true);
    }

    const handleClickComma = () => {
        if (isResult) {
            setOperand1(`0${signs.Comma}`);
            setIsResult(false);
            return;
        }

        if (operator) {
            if (!operand2.includes('.')) {
                setOperand2(!operand2 ? `0${signs.Comma}` : operand2 + signs.Comma);
            }
        } else {
            if (!operand1.includes('.')) {
                setOperand1(!operand1 ? `0${signs.Comma}` : operand1 + signs.Comma);
            }
        }
    }

    return (
        <main className={s.calculator}>
            <div className={s['calculator__display']} ref={displayRef}>
                <p className={`${s['calculator__value']} 
                ${isResult ? s['calculator__value--result'] : ''}`}
                >
                    {operand1}{operator}{operand2}
                </p>
            </div>
            <div className={s['calculator__controls']}>
                {buttons.length > 0 && buttons.map(({content, type}) => {
                    let onClickHandler, classButton = '';
                    if (type === buttonsType.Number) {
                        onClickHandler = () => handleClickNumbers(content);
                    } else if (type === buttonsType.Operator) {
                        onClickHandler = () => handleClickOperator(content);
                        classButton = s['calculator__button--operator'];
                    } else if (type === buttonsType.Clear) {
                        onClickHandler = () => handleClickClear();
                        classButton = s['calculator__button--clear'];
                    } else if (type === buttonsType.Equal) {
                        onClickHandler = () => handleClickEqual();
                        classButton = s['calculator__button--equal'];
                    } else if (type === buttonsType.Comma) {
                        onClickHandler = () => handleClickComma();
                    }
                    return (
                        <button
                            className={`${s['calculator__button']} ${classButton}`}
                            onClick={onClickHandler}
                            key={content}
                        >
                            {content}
                        </button>
                    )
                })}
            </div>
        </main>
    )
}
