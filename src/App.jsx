import Calculator from "./components/Calculator/Calculator.jsx";
import s from './app.module.scss';

export default function App() {
    return (
        <div className={s.app}>
            <h1 className={s['app__title']}>Calculator</h1>
            <Calculator/>
        </div>
    )
}
