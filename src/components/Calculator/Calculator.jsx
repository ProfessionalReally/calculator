import s from '../../styles/components/calculator.module.scss';
import {useCalculator} from "../../hooks/useCalculator.jsx";
import ButtonsList from "../ButtonsList/ButtonsList.jsx";

export default function Calculator() {
    const {
        operator,
        operand1,
        operand2,
        isResult,
        displayRef,
        ...handlers
    } = useCalculator();

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
                <ButtonsList {...handlers}/>
            </div>
        </main>
    )
}
