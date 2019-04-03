var request = require("request"); 
var cheerio = require("cheerio"); 
var Article = require("../models/Article");

var site_to_scrape = "https://www.yahoo.com";

function site_scraper(callback){
    request(site_to_scrape, function(error, response, html){
        var $ = cherrio.load(html); 

        $("article h2").each(function(i, element){
            var result = {};

            result.title = $(this).children("a").text().trim(); 
            result.link = $(this).children("a").attr("href");

            var entry = new Article(result);

            entry.save(function(err, doc){
                if(err){
                    console.log("Can not be saved: ", err);
                }
                else{
                    console.log(doc);
                }
            });
        });
        callback(); 
    });
}

exports.site_scraper = site_scraper;