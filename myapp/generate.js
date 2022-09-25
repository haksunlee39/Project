var moment = require('moment');

var generator = {
    generatePostList(dbResult, pageNum){

        resultHTML = ``;
    
        dbResult.forEach((value, i) => {
            var _date = moment(value.postDate)
            resultHTML += `
            <tr>
                <td><span>${(pageNum-1)*15 + i + 1}</span></td>
                <td><span><a href="/article/${value.postId}">${value.postTitle}</a></span></td>
                <td><span>${value.postAuthor}</span></td>
                <td><span>${_date.format("YYYY-MM-DD")}</span></td>
                <td><span>${value.postViewCount}</span></td>
            </tr>
            `
        });
    
        return resultHTML;
    },

    generateBoardList(dbResult){
        resultHTML = ``;
    
        dbResult.forEach((value) => {
            resultHTML += `
            <li><a href="/board/${value.boardId}/page/1">${value.boardName}</a></li>
            `
        });
    
        return resultHTML;
    },

    generatePageNumbers(currentBoard, currentPage, maxPage){
        resultHTML = ``;
    
        currentPage -= 1;
        currentPagePage = Math.floor(currentPage / 10);
        maxPagePage = Math.floor((maxPage-1) / 10)

        if (currentPagePage > 0) {
            resultHTML += `
            <a href="/board/${currentBoard}/page/${1}">&lt;&lt;</a>
            <a href="/board/${currentBoard}/page/${(currentPagePage - 1)*10 + 1}">&lt;</a>
            `
        }
    
        for (let i = 1; i <= 10; i++) {
            if (maxPage < currentPagePage*10 + i) { break; }
            resultHTML += `
            <a href="/board/${currentBoard}/page/${currentPagePage*10 + i}">${currentPagePage*10 + i}</a>
            `
        }

        if (currentPagePage < maxPagePage) {
            resultHTML += `
            <a href="/board/${currentBoard}/page/${(currentPagePage + 1)*10 + 1}">&gt;</a>
            <a href="/board/${currentBoard}/page/${maxPagePage*10 + 1}">&gt;&gt;</a>
            `
        }
    
        return resultHTML; 
    }
}

module.exports = generator;