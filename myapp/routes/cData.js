var express = require('express');
var router = express.Router();

var db = require('../db');

/* GET home page. */
router.post('/', function(req, res, next) {

    console.log(req.body.$date)

    let x = typeof req.body.$x != 'undefined' ? req.body.$x : -1;
    let y = typeof req.body.$y != 'undefined' ? req.body.$y : -1;
    let leftclick = typeof req.body.$leftclick !== 'undefined' ? 1 : 0;
    let rightclick = typeof req.body.$rightclick !== 'undefined' ? 1 : 0;
    let middleclick = typeof req.body.$middleclick !=='undefined' ? 1 : 0;

    // let date = req.body.$date != 'undefined' ? req.body.$date : -1;

    var queries = [
        `
            INSERT INTO visitordata.visitor_table
            (
                visitorName, mouseX, mouseY, leftClick, rightClick, middleClick, date
            )
            VALUES
            (
                "${req.sessionID}", ${x}, ${y}, ${leftclick}, ${rightclick}, ${middleclick}, "${req.body.$date}"
            );
        `
        ,
        `
            delete
            from visitordata.visitor_table
            where id not in (
                select * from (
                    select id
                    from visitordata.visitor_table
                    where visitorName = '${req.sessionID}'
                    order by date desc
                    limit 1000
                ) as tmp
            )
            AND id not in (
                select * from (
                    select id
                    from visitordata.visitor_table
                    where visitorName <> '${req.sessionID}'
                ) as tmp2
            )
        `
    ];
    db.query(queries.join(' '), (err, results, fields) => {
        if(err) {
            console.log("query Error")
            throw err;
        }

        console.log("Done!");

    });

    res.send("good")

});

module.exports = router;
