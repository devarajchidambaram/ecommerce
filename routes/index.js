var express = require('express');
var router = express.Router();
var elastic = require('../models/elastic');



/* GET home page. */
router.get('/', function(req, res, next) {
    //res.render('index', { title: 'Express' });
    elastic.search(query, function(status, data) {
        res.send(data);

    });

});








module.exports = router;




const query = {
    "aggs": {
        "categories": {
            "filter": {},
            "aggs": {
                "type.raw": {
                    "filter": {},
                    "aggs": {
                        "type.raw": {
                            "terms": {
                                "field": "type_raw",
                                "size": 0
                            }
                        }
                    }
                }
            }
        },
        "metascore": {
            "filter": { "range": { "metaScore": { "gte": 0, "lte": 100 } } },
            "aggs": {
                "metascore": {
                    "histogram": {
                        "field": "metaScore",
                        "interval": 5,
                        "min_doc_count": 0,
                        "extended_bounds": {
                            "min": 0,
                            "max": 100
                        }
                    }
                }
            }
        },
        "imdbRating": {
            "filter": { "range": { "imdbRating": { "gte": 0, "lte": 10 } } },
            "aggs": {
                "imdbRating": {
                    "histogram": {
                        "field": "imdbRating",
                        "interval": 1,
                        "min_doc_count": 0,
                        "extended_bounds": {
                            "min": 0,
                            "max": 10
                        }
                    }
                }
            }
        },
        "actors.raw6": {
            "filter": {},
            "aggs": {
                "actors.raw": { "terms": { "field": "actors_raw", "size": 10 } },
                "actors.raw_count": { "cardinality": { "field": "actors.raw" } }
            }
        },
        "writers.raw7": {
            "filter": {},
            "aggs": {
                "writers.raw": { "terms": { "field": "writers_raw", "size": 10 } },
                "writers.raw_count": {
                    "cardinality": {
                        "field": "writers.raw"
                    }
                }
            }
        },
        "countries.raw8": {
            "filter": {},
            "aggs": {
                "countries.raw": {
                    "terms": {
                        "field": "countries_raw",
                        "size": 10
                    }
                },
                "countries.raw_count": { "cardinality": { "field": "countries_raw" } }
            }
        },
        "runtimeMinutes": {
            "filter": {},
            "aggs": {
                "runtimeMinutes": {
                    "range": {
                        "field": "runtimeMinutes",
                        "ranges": [{ "key": "All" }, {
                            "key": "up to 20",
                            "from": 0,
                            "to": 20
                        }, { "key": "21 to 60", "from": 21, "to": 60 }, { "key": "60 or more", "from": 61, "to": 1000 }]
                    }
                }
            }
        }
    },
    "size": 12,
    "sort": [{ "_score": "desc" }],
    "highlight": { "fields": { "title": {}, "plot": {} } },
    "_source": ["plot", "title", "poster", "imdbId", "imdbRating", "year"]
}
