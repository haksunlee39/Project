var express = require('express');
var router = express.Router();

var db = require('../db');
var generator = require('../generate');

/* GET home page. */
router.get('/', function(req, res, next) {

    res.redirect('/board/1/page/1');

});

router.get('/board/:boardId/page/:pageNum', function(req, res, next) {

    let boardId = parseInt(req.params.boardId);
    let pageNum = req.params.pageNum;

    var queries = [
        `SELECT * FROM projectdata.posts_list_table WHERE boardId=${boardId} LIMIT ${(pageNum-1)*15}, ${15};`,
        `SELECT * FROM projectdata.boards_list_table;`,
        `SELECT COUNT(postId) AS postCount FROM projectdata.posts_list_table WHERE boardId=${boardId}`
    ];
    db.query(queries.join(' '), (err, results, fields) => {
        if(err) {
            console.log("query Error")
            throw err;
        }

        res.render('index', {
            boardList: generator.generateBoardList(results[1]),
            boardTitle: results[1].filter( x => x.boardId === boardId )[0].boardName,
            postCount: results[2][0].postCount,
            postList: generator.generatePostList(results[0], pageNum),
            boardId: boardId,
            pageIndex: generator.generatePageNumbers(boardId, pageNum, Math.ceil(results[2][0].postCount / 15))
        });
    });
});

module.exports = router;
