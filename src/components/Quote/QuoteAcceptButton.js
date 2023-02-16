export const QuoteBlueButton = ({onClick ,title}) => {
    return (
        <button>
            <div onClick={onClick} className='form_buttons__item accept'>
                {title}
            </div>
        </button>
    )
}