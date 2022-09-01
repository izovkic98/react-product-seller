import { useEffect, useState } from "react";
import { FormattedMessage, IntlProvider } from "react-intl";
import { I18nProvider, LOCALES } from "../../i18n";

const Pagination = ({ pages, setCurrentPage, currentObjects, sortedObjects }) => {


    const numOfPages = [];

    for (let i = 1; i <= pages; i++) {
        numOfPages.push(i);
    }

    const [currentButton, setCurrentButton] = useState(1);

    useEffect(() => {
        setCurrentPage(currentButton);
    }, [currentButton, setCurrentPage])

    return (
        <I18nProvider locale={localStorage.getItem("language")}>
            <div className="clearfix">
                <div className="hint-text"><FormattedMessage id='showing' />  <b>{currentObjects?.length}</b> <FormattedMessage id='out_of' /> <b>{sortedObjects?.length}</b>  <FormattedMessage id='entries' /></div>
                <ul className="pagination">
                    <li className={`${currentButton === 1 ? "page-item disabled" : "page-item"}`}><a className="page-link" href="#!"
                        onClick={() => setCurrentButton((prev) => prev === 1 ? prev : prev - 1)}
                    > <FormattedMessage id='previous' /></a></li>
                    {
                        numOfPages.map((page, index) => {
                            return (
                                <li key={index} className={`${currentButton === page ? 'page-item active' : 'page-item'}`}><a href="#!" className="page-link"
                                    onClick={() => setCurrentButton(page)}
                                >{page}</a></li>
                            )
                        })

                    }

                    <li className={`${currentButton === numOfPages.length ? "page-item disabled" : "page-item"}`}><a className="page-link" href="#!"
                        onClick={() => setCurrentButton((next) => next === numOfPages.length ? next : next + 1)}
                    > <FormattedMessage id='next' /></a></li>
                </ul>
            </div>
        </I18nProvider>
    )
}

export default Pagination;
