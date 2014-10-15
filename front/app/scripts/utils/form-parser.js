
import arrayify from 'arrayify';

module.exports = function(element){

  var inputs;

  inputs = arrayify(element.getElementsByTagName('input'));

  inputs.forEach(function(input){
    console.log("log", input);
  });

}
