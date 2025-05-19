import s from "../../styles/components/calculator.module.scss";

export default function Button({className, onClick, children}) {
    return (
        <button
            className={`${s['calculator__button']} ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
