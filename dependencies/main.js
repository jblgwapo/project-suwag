$(document).ready(function(){
  var charset=`ABCDEFGHIJKLMNOPQRSTUVWXYZ.,'"?`
  for( i=0; i<charset.length; i++){
    var target = charset[i];
    console.log(target)
  }



  $("#centerImage").change(function() {
    readURL(this);
  });

});

//Global


var Image= '';




function Preview(){
  var header = Generate($('#headerText').val(), $('#headerTextAlign').val(), $('#headerIndent').prop("checked"));
  var upper  = Generate($('#upperText').val(), $('#upperTextAlign').val(), $('#upperIndent').prop("checked"));
  var lower  = Generate($('#lowerText').val(), $('#lowerTextAlign').val(), $('#lowerIndent').prop("checked"));

  img = ($('#showImage').prop("checked") ? `<div style="text-align:center;"><img src="${Image}" style="margin:auto; display:inline-block; height:3in; width:4in; margin-bottom:2mm"></div>` : '');
  $('#print').html(header+upper+img+lower);

};



function Save(){




};


function Print(){
  var mywindow = window.open('');

  mywindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="dependencies/print.css"><title>' + document.title  + '</title>');
  mywindow.document.write('</head><body >');
  mywindow.document.write(document.getElementById('print').innerHTML);
  mywindow.document.write('</body></html>');

  //mywindow.document.close(); // necessary for IE >= 10
  mywindow.focus(); // necessary for IE >= 10*/

  mywindow.print();
  //mywindow.close();

  return true;



};





function Generate(text, align ,tab){
  console.log(text);

  if(text=='' || text==null) return '<!--Empty-->';
  text = text.toUpperCase();
  text = text.replace(/\n/g, ' ~');
  text = text.split(' ');

  topDeviation    = $('#topDeviation').val();
  bottomDeviation = $('#bottomDeviation').val();
  leftDeviation = $('#leftDeviation').val();
  charDistance  = $('#charDistance').val();
  minWidth  = $('#minWidth').val();
  maxWidth  = $('#maxWidth').val();

  code=`<div style="text-align:${align};"><div id="tab" style="margin-left:0.${ (tab ? random.number(525,475) : 0) }in;"></div>`;
  for(i=0; i<text.length; i++){
    code+=`<div id="word" style="margin-right:0.${random.number(max=400, min=200)}cm !important; margin-left:${random.number(max=leftDeviation, min=0)}mm !important;">`;
    for(x=0; x<text[i].length; x++){
      var path='char/'+ text[i][x] +'/'+ random.number(7) + '.png';
      if( text[i][x]=='.'){ path='char/dot/0.png';}

      if( text[i][x]=='~'){code+=`</div><br><div id="tab" style="margin-left:0.${ (tab ? random.number(525,475) : 0) }in;"></div><div id="word" style="margin-right:0.${random.number(max=400, min=200)}cm !important; margin-left:${random.number(leftDeviation)}mm !important;">`;}
      //else if (text[i][x]=='.') code+= `</div><img src="char/dot/0.png"><div id="word" style="margin-right:0.${random.number(max=400, min=200)}cm !important; margin-left:${random.number(max=leftDeviation, min=0)}mm !important;">`;
      else code+=`<img src="${path}" style="box-sizing:border-box; padding-left:0.${ (text[i][x]=='.' ? 0 : random.number(charDistance) ) }mm; padding-top:0.0${random.number(topDeviation)}cm; padding-bottom:0.0${random.number(bottomDeviation,0)}cm; height:0.5cm; width=:0.${(text[i][x]=='.' ? '01' : random.number(max=maxWidth, min=minWidth))}cm;">`;

    }
    code+='</div> ';

  }
  code+='</div>'
  console.log(code);
  return code;
};

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      Image =  e.target.result;
    }

    reader.readAsDataURL(input.files[0]);
  }
}




var random = { version:6.2,
	number: function (max, min=0){
    if (max==min) return max;
		return Math.round(Math.random()*(+max - +min)) + +min;},
	array: function(size, max, min=0){
		array =[];
		for(i=0;i<size;i++)array.push(this.number(max,min));
		return array;},
	nonRepeatArray: function(size){
		array = []; for(i=0;i<size;i++)array.push(i);
		return this.shuffle(array);},
	choose: function(array){
		if(array.length==1) return array[0];
    return  array[this.number(array.length-1)];
		},
	shuffle: function(array){
		var currentIndex = array.length, temporaryValue, randomIndex;
  		while (0 !== currentIndex) {
    		randomIndex = Math.floor(Math.random() * currentIndex);
    		currentIndex -= 1;
   		temporaryValue = array[currentIndex];
    		array[currentIndex] = array[randomIndex];
    		array[randomIndex] = temporaryValue;
  			} return array;},
};
