import s from '../../../styles/components/calculator.module.scss';

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
    return (
        <main className={s.calculator}>
            <div className={s['calculator__display']}>
                <p className={s['calculator__value']}>123 +</p>
            </div>
            <div className={s['calculator__controls']}>
                {buttons.length > 0 && buttons.map((button) => (
                    <button
                        className={`
                            ${s['calculator__button']} 
                            ${button.type === 'operator' ? s['calculator__button--operator'] : ''} 
                            ${button.type === 'clear' ? s['calculator__button--clear'] : ''} 
                            ${button.type === 'equal' ? s['calculator__button--equal'] : ''} 
                        `}
                    >
                        {button.content}
                    </button>
                ))}
            </div>
        </main>
    )
}
