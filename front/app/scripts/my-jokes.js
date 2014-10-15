
var exports, jokeList;

jokeList = document.getElementById('joke-list');

exports = {
  render: function(jokes){
    var newDiv;
    for (var i = 0; i < jokes.length; i++) {
      newDiv = document.createElement('div');
      newDiv.innerText = jokes[i].content;
      jokeList.appendChild(newDiv);
    };
  }
}

module.exports = exports;
