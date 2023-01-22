export const QuoteComment = ({ comment }) => {
    return (
        <div className="additional-comm-conteiner">
            <div className="additional-comm-conteiner__title">Additional Comments</div>
            <div className="additional-comm-conteiner__comment-conteiner">
                <div className="comment-text">
                    {comment}
                </div>
            </div>
        </div>
    )
}