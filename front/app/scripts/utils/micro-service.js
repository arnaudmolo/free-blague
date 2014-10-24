
/**
* Clean sentence of his typos.
*
* @param {String} A sentence.
* @return {String} A clean sentence.
*/
function cleanSentence(raw_sentence){
	var cleaned = raw_sentence;

	cleaned = cleaned.replace(/\?+/g, '?');                       // remove multiple ?
	cleaned = cleaned.replace(/\!+/g, '!');                       // remove multiple !
	cleaned = cleaned.replace(/\,+\,(?!\d)/g, ', ');              // remove multiple , and be careful of floats
	cleaned = cleaned.replace(/\s\,+/g, ', ');                    // remove space before comma
	cleaned = cleaned.replace(/\s+/g, ' ');                       // remove multiple spaces
	cleaned = cleaned.replace(/\s\.{2,}/g, '...');                // force 3 dots
	cleaned = cleaned.replace(/\s\.+(?!\.{2})/g, '.');            // remove space before dot
	cleaned = cleaned.replace(/(^\s+)|(\s+$)/g, '');              // remove multiple begining or ending spaces
	cleaned = cleaned.toLowerCase();                              // remove capital letters
	cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1); // Capitalize first letter

	return cleaned;
}


/**
* Clean joke of his typos.
*
* @param {String} A multi sentence or not String.
* @return {String} A clean multi sentence string.
*/
function cleanJoke(raw_joke){
	var cleaned = raw_joke;

	var sentences = cleaned.match( /[^\.!\?]+[\.!\?]+/g );
	for(i=0; i<sentences.length;i++){
	  sentences[i] = cleanSentence(sentences[i])
	  console.log(sentences[i]);
	}

	cleaned = sentences.join(' ');

	return cleaned;
}