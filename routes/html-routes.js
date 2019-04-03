var express = require('express');
var router = express.Router();

//Models
var Article = require("../models/Article");
var Note = require("../models/Note");
var site_scraper = require('../scraper/scrape');


// Routes

// Home page will display articles we scraped from the mongoDB
router.get('/', function (req, res) {
    console.log('! You have been discovered !');

    Article.find({}, function (err, doc) {
        if (err) console.log("There is a error: ", error);

        res.render('index', { title: "Scraper", articles: doc });
    });
});

router.get('/scrape', function (req, res) {
    site_scraper.site_scraper(function () {
        res.redirect('/');
    });
});

router.get('/note/:id', function (req, res) {
    Article.findOne({ _id: req.params.id })
        .populate("note")
        .exec(function (err, doc) {
            if (err) console.log("There is a Note Error:", error);
            res.send(doc.note);
        });
});

router.post('/new_note/:id', function (req, res) {
    var new_note = new Note(req.body);
    new_note.save(function (err, doc) {
        Article.findOneAndUpdate(
            { _id: req.params.id },
            { $push: { note: doc._id } },
            { new: true },

            function (err, new_document) {
                if (err) console.log("Error has occured", error);
                res.sendStatus(new_document);
            });
    });
});