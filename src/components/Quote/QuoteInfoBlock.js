export const QuoteBlockInfo = ({title, description}) => {
    return(
        <div className="offer-data__info">
            <div className="title">{title}</div>
            <div className="desc">{description}</div>
        </div>
    )
}