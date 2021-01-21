import React, {useState} from "react";
import style from './Pagination.module.css'

type PropsType = {
    pageCount: number
    currentPage?: (currentPage: number) => void
}

export const Pagination = (props: PropsType) => {
    const [countItems, setCountItems] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const pageTotalCount = props.pageCount;
    const pages = [];
    for (let i = 0; i < pageTotalCount; i++) {
        if (i + 1 === 1 || i + 1 === pageTotalCount) {
            pages.push((
                <button
                    key={i + 1}
                    className={currentPage === i + 1 ? style.activeButton : ''}
                    onClick={() => setCurrentPage(i + 1)}
                >
                    {i + 1}
                </button>
            ));
        }
        if (i + 1 === currentPage - 3 || i + 1 === currentPage + 3) {
            pages.push(` ... `)
        } else if (i + 1 < currentPage - 3 || i + 1 > currentPage + 3 || i + 1 === 1 || i + 1 === pageTotalCount) {

        } else {
            pages.push((
                <button
                    key={i + 1}
                    className={currentPage === i + 1 ? style.activeButton : ''}
                    onClick={() => setCurrentPage(i + 1)}
                >
                    {i + 1}
                </button>
            ));
        }
    }

    return (
        <div className={style.wrapperContainer}>
            <select value={countItems} onChange={e => setCountItems(Number(e.currentTarget.value))}>
                <option value={4}>4</option>
                <option value={7}>7</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
            </select>
            {pages}
        </div>
    );
};