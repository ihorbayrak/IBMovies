export const formatNumbers = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export const createPages = (pagesArr, pagesCount, current) => {
    if (pagesCount > 5) {
        if (current >= 5) {
            for (let i = current - 2; i <= current + 2; i++) {
                pagesArr.push(i);
                if (i === pagesCount) break;
            }
        } else {
            for (let i = 1; i <= 5; i++) {
                pagesArr.push(i);
                if (i === pagesCount) break;
            }
        }
    } else {
        for (let i = 1; i <= pagesCount; i++) {
            pagesArr.push(i);
        }
    }
};
