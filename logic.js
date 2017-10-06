function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

var words;

$(document).ready(function(){
    $("#wordButton").click(function() {
		//e.preventDefault();
    	var regex = /\s|\t|\r|\n|\f/;
    	words = $("#userText").val().split(regex);
		$("#test").html("Results will appear here");
		console.log(words);
		$("#resultBox")[0].style.display = "inline-block";
		$("#myProgress")[0].style.display = "block";
		
		wordReplace(0);
    });
	
	$("#wordButton2").click(function() {
		//e.preventDefault();
    	var regex = /\s|\t|\r|\n|\f/;
    	words = $("#userText").val().split(regex);
		$("#test").html("Results will appear here");
		console.log(words);
		$("#resultBox")[0].style.display = "inline-block";
		$("#myProgress")[0].style.display = "block";
		
		wordReplace2(0);
    });
	
	function wordReplace(index) {
		console.log($("#myBar"));
		$("#myBar")[0].style.width = ((index / words.length) * 100) + '%';
		if (index < words.length) {
			var parsedWord = words[index];
			
			if (parsedWord.length > 2) {
			
				var ending = parsedWord[parsedWord.length - 1];
				var punctuation = "!,.?:;";
				var location = punctuation.indexOf(ending);
				var endPuncutation;
				if (location != -1) {
					endPuncutation = punctuation[location];
					parsedWord = parsedWord.slice(0, -1);
				}
				else {
					endPuncutation = '';
				}
			
				$.ajax({
					url:'https://wordsapiv1.p.mashape.com/words/'+parsedWord+'/synonyms',
					headers: {
						'X-Mashape-Key': 'VI2uIn59BkmshYYnXVBZG179D6gCp1UDruSjsnXs9R9JiOAlhU',
						'Accept': 'application/x-fs-v1+json'
					},
					method: 'GET',
					dataType: 'json',
					async: true,
					success:function(data){
						console.log(data);
						if(data["synonyms"].length > 0) {
							var result = data["synonyms"][getRandomInt(0, data["synonyms"].length)];
							words[index] = result+endPuncutation;
							wordReplace(index+1);
						}
						else {
							wordReplace(index+1);
						}
					},
					error:function(){
						wordReplace(index+1);
					}
				});
			}
			else {
				wordReplace(index+1);
			}
		}
		else {
			$("#test").html(words.join(" "));
			$("#myProgress")[0].style.display = "none";
		}
	}
	
	function wordReplace2(index) {
		console.log("2");
		console.log($("#myBar"));
		$("#myBar")[0].style.width = ((index / words.length) * 100) + '%';
		if (index < words.length) {
			var parsedWord = words[index];
			
			if (parsedWord.length > 2) {
			
				var ending = parsedWord[parsedWord.length - 1];
				var punctuation = "!,.?:;";
				var location = punctuation.indexOf(ending);
				var endPuncutation;
				if (location != -1) {
					endPuncutation = punctuation[location];
					parsedWord = parsedWord.slice(0, -1);
				}
				else {
					endPuncutation = '';
				}
			
				$.ajax({
					url:'https://wordsapiv1.p.mashape.com/words/'+parsedWord+'/antonyms',
					headers: {
						'X-Mashape-Key': 'VI2uIn59BkmshYYnXVBZG179D6gCp1UDruSjsnXs9R9JiOAlhU',
						'Accept': 'application/x-fs-v1+json'
					},
					method: 'GET',
					dataType: 'json',
					async: true,
					success:function(data){
						console.log(data);
						if(data["antonyms"].length > 0) {
							var result = data["antonyms"][getRandomInt(0, data["antonyms"].length)];
							words[index] = result+endPuncutation;
							wordReplace2(index+1);
						}
						else {
							wordReplace2(index+1);
						}
					},
					error:function(){
						wordReplace2(index+1);
					}
				});
			}
			else {
				wordReplace2(index+1);
			}
		}
		else {
			$("#test").html(words.join(" "));
			$("#myProgress")[0].style.display = "none";
		}
	}
	
});