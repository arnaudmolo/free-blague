
/**
* Clean sentence of his typos.
*
* @param {String} A sentence.
* @return {String} A clean sentence.
*/

function cleanSentence(sentence){

	sentence = sentence.replace(/\?+/g, '?');                        // remove multiple ?
	sentence = sentence.replace(/\!+/g, '!');                        // remove multiple !
	sentence = sentence.replace(/\,+\,(?!\d)/g, ', ');               // remove multiple , and be careful of floats
	sentence = sentence.replace(/\s\,+/g, ', ');                     // remove space before comma
	sentence = sentence.replace(/\s+/g, ' ');                        // remove multiple spaces
	sentence = sentence.replace(/\s\.{2,}/g, '...');                 // force 3 dots
	sentence = sentence.replace(/\s\.+(?!\.{2})/g, '.');             // remove space before dot
	sentence = sentence.replace(/(^\s+)|(\s+$)/g, '');               // remove multiple begining or ending spaces
	sentence = sentence.toLowerCase();                               // remove capital letters
	sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1); // Capitalize first letter

	return sentence;
}


/**
* Clean joke of his typos.
*
* @param {String} A multi sentence or not String.
* @return {String} A clean multi sentence string.
*/

function cleanJoke(joke_content){

  joke_content = joke_content.replace(/[\.|\?|\!]$/, '.');
	joke_content = joke_content.match( /[^\.!\?]+[\.!\?]+/g );
	for(var i=0; i<joke_content.length;i++){
	  joke_content[i] = cleanSentence(joke_content[i])
	}

	joke_content = joke_content.join(' ');

	return joke_content;
}

module.exports = cleanJoke;