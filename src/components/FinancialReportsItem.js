
export const FinancialReportsItem = ({title, quotes }) => {
    const getTitleClass = () => {
        switch (title) {
            case "Declined":
                return 'declined'
            case "Accepted":
                return 'accepted'
            default:
                break;
        }
    }
    return(
        <div className="reports-lists-item shadow">
            <div className="reports-lists-item__title">
                <h3 className={getTitleClass()}>{title}</h3>
            </div>
            <div className="reports-lists-item__quotes">
                {quotes.map(quote => (
                    <div key={quote.id} className="quotes-item">
                        <div className="quotes-item__info">
                            <div className="quotes-item__title">
                                {quote.title}
                            </div>
                            <div className="quotes-item__viewed">
                                Viewed by {quote.client.firstName} {quote.client.surname}
                            </div>
                        </div>
                        <div className="quotes-item__price">
                            {
                                [...quote.selectedGeneralServices, ...quote.selectedIndividualServices].reduce((sum, service) => sum + service.price, 0) 
                            }$
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}