export const QuoteLightButton = ({title, callback}) => {
    return (
        <button onClick={callback}>
            <div className='form_buttons__item decline'>
                {title}
            </div>
        </button>
    )
}