var express = require('express');
var router = express.Router();

var db = require('../db');
var generator = require('../generate');

router.get('/:boardId', function(req, res, next) {

    var boardId = parseInt(req.params.boardId);

    var queries = [
        `SELECT * FROM projectdata.boards_list_table;`
    ];
    db.query(queries.join(' '), (err, results, fields) => {
        if(err) {
            console.log("query Error")
            throw err;
        }

        res.render('create', {
            boardList: generator.generateBoardList(results),
            boardId: boardId
        });
    });
});

router.post('/', (req, res, next) => {

    var query = `SELECT MAX(postId) AS maxPostId FROM projectdata.posts_list_table;`;

    db.query(query, (err, result, fields) => {
        if(err) {
            console.log("query 1 Error")
            throw err;
        }
        var newPostId = result[0].maxPostId + 1;

        var createQuery = [
            `
                INSERT INTO projectdata.posts_list_table
                (
                    postId, postTitle, postAuthor, postDate, postViewCount, boardId
                )
                VALUES
                (
                    ${newPostId}, "${req.body.title}", "${req.body.author === ""? "Anonymous":req.body.author}", "${new Date().toISOString().slice(0, 19).replace('T', ' ')}", ${0}, ${req.body.boardId}
                );
            `,
            `
                INSERT INTO projectdata.post_content_table
                (
                    postId, postContent
                )
                VALUES
                (
                    ${newPostId}, "${req.body.content}"
                );
            `
        ];
        console.log(createQuery[0]);
        console.log(createQuery[1]);
        db.query(createQuery.join(' '), (err, results, fields) => {
            if(err) {
                console.log("query 2 Error")
                throw err;
            }
            console.log("HERE")
        });

        res.redirect(`/article/${newPostId}`)
    });


});

module.exports = router;