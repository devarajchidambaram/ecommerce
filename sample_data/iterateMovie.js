var fs = require('fs');
var https = require('https');
var obj = JSON.parse(fs.readFileSync('./moviedb.js', 'utf8'));

// for (var i = 0; i < obj.hits.hits.length; i++) {
// 	//console.log(obj.hits.hits[i]._source.poster);
// 	downloadJPG(obj.hits.hits[i]._source.poster, i,  function(i){
// 		console.log('success=>',i);
// 	});
// }

//console.log(obj.hits.hits.length)

 function iterateMovie(i){
 	if(i >= obj.hits.hits.length){
 		return 0;
 	}

 	if(obj.hits.hits[i]._source.poster){


 // 		 downloadJPG(obj.hits.hits[i]._source.poster, i,  function(i){
	// 	console.log('success=>',i);
	// 	i++;
	// 	iterateMovie(i);
	// });

	fs.appendFile("test.json", '{ "create": { "_index": "movies", "_type": "movie", "_id": "'+ obj.hits.hits[i]._id+'" }}\n', function(err) {
    	if(err) {
       	 	return console.log(err);
    	}else{
    		

		let test = obj.hits.hits[i]._source;

		obj.hits.hits[i]._source.genres_raw = obj.hits.hits[i]._source.genres;
		obj.hits.hits[i]._source.directors_raw = obj.hits.hits[i]._source.directors;
		obj.hits.hits[i]._source.writers_raw = obj.hits.hits[i]._source.writers;
		obj.hits.hits[i]._source.actors_raw = obj.hits.hits[i]._source.actors;
		obj.hits.hits[i]._source.countries_raw = obj.hits.hits[i]._source.countries;
	
		console.log('..')
		console.log(obj.hits.hits[i]._source);
	
    		fs.appendFile("test.json", JSON.stringify(obj.hits.hits[i]._source)+'\n', function(err) {
    		i++;
		iterateMovie(i);

    	});
    	}	

   	 	//console.log("The file was saved!");
	}); 


 	}else{
console.log('---------------------------')
 		i++;
		iterateMovie(i);
 	}



 }

iterateMovie(0);


function downloadJPG(url, i, callback){
	console.log(i,"array==>",  url );
	//if(i == )
    try{
    var fileName =  'imdbimages/images/' + url.split('/')[5];
 
 //console.log(fileName);

var file = fs.createWriteStream(fileName);
var request = https.get(url, function(response) {
     response.pipe(file);
		callback(i);
	});

} catch(e){
	console.log('some error occured', e);
	callback(e);
}

}





