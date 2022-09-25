var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var db = require('../db');
var generator = require('../generate');

router.get('/:articleId', function(req, res, next) {

    var articleId = parseInt(req.params.articleId);

    var queries = [
        `SELECT * FROM projectdata.boards_list_table;`,
        `SELECT * FROM projectdata.post_content_table WHERE postId=${articleId};`,
        `Update projectdata.posts_list_table Set postViewCount = postViewCount + 1 Where postId=${articleId};`
    ];
    db.query(queries.join(' '), [1, 2], (err, results, fields) => {
        if(err) {
            console.log("query Error")
            throw err;
        }

        res.render('article', {
            boardList: generator.generateBoardList(results[0]),
            articleContent: results[1][0].postContent,
            returnLink: req.headers.referer
        });
    });
});

module.exports = router;