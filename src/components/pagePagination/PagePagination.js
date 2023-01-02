import { createPages } from '../../utils/functions/functions';

import './pagePagination.scss';

const PagePagination = ({ currentPage, setCurrentPage }) => {
    const totalPages = 100;

    const pages = [];
    createPages(pages, totalPages, currentPage);

    const incPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const decPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const goToFirstPage = () => {
        setCurrentPage(1);
    };

    const goToLastPage = () => {
        setCurrentPage(totalPages);
    };

    const renderPages = (arr) => {
        let clazz = 'pages__button';

        return arr.map((page) => {
            return (
                <li key={page}>
                    <button
                        className={currentPage === page ? `${clazz} pages__button_current` : clazz}
                        onClick={() => setCurrentPage(page)}
                    >
                        {page}
                    </button>
                </li>
            );
        });
    };

    const elements = renderPages(pages);

    return (
        <nav className='pages'>
            <ul className='pages__buttons'>
                <li>
                    <button
                        className='pages__button'
                        disabled={currentPage === 1}
                        onClick={goToFirstPage}
                    >
                        &#10094;&#10094;
                    </button>
                </li>
                <li>
                    <button
                        className='pages__button'
                        disabled={currentPage === 1}
                        onClick={decPage}
                    >
                        &#10094;
                    </button>
                </li>
                {elements}
                <li>
                    <button
                        className='pages__button'
                        disabled={currentPage === totalPages}
                        onClick={incPage}
                    >
                        &#10095;
                    </button>
                </li>
                <li>
                    <button
                        className='pages__button'
                        disabled={currentPage === totalPages}
                        onClick={goToLastPage}
                    >
                        &#10095;&#10095;
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default PagePagination;
