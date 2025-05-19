import {useEffect, useRef, useState} from "react";
import {ENUM_SIGNS as signs} from "../constants/index.js";

const toFormatResult = (result) => {
    const rounded = +result.toPrecision(9);
    let strResult = rounded.toString();
    if (strResult.includes(signs.Comma)) {
        strResult = strResult.replace(/\.?0+$/, '');
    }
    return strResult;
}

export const useCalculator = () => {
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

    return {
        operand1,
        operator,
        operand2,
        isResult,
        displayRef,
        handleClickClear,
        handleClickComma,
        handleClickEqual,
        handleClickOperator,
        handleClickNumbers
    }
}