import {
    CALCULATOR_BUTTONS as buttons,
    CALCULATOR_BUTTONS_TYPE as buttonsType
} from "../../constants/index.js";
import s from "../../styles/components/calculator.module.scss";
import Button from "../Button/Button.jsx";

const getButtonProps = (type, content, handlers) => {
    const {
        handleClickNumbers,
        handleClickOperator,
        handleClickClear,
        handleClickEqual,
        handleClickComma,
    } = handlers;

    switch (type) {
        case buttonsType.Number:
            return {
                onClick: () => handleClickNumbers(content),
                className: '',
            };
        case buttonsType.Operator:
            return {
                onClick: () => handleClickOperator(content),
                className: s['calculator__button--operator'],
            };
        case buttonsType.Clear:
            return {
                onClick: () => handleClickClear(),
                className: s['calculator__button--clear'],
            };
        case buttonsType.Equal:
            return {
                onClick: () => handleClickEqual(),
                className: s['calculator__button--equal'],
            };
        case buttonsType.Comma:
            return {
                onClick: () => handleClickComma(),
                className: '',
            };
        default:
            return {
                onClick: () => {},
                className: '',
            };
    }
}

export default function ButtonsList(handlers) {
    return (
        <>
            {
                buttons.length > 0 && buttons.map(({content, type}) => {
                    const {onClick, className} = getButtonProps(type, content, handlers);

                    return (
                        <Button
                            onClick={onClick}
                            className={className}
                            key={content}
                        >
                            {content}
                        </Button>
                    )
                })
            }
        </>
    )
}
