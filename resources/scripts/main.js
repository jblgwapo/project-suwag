$(document).ready(function(){
  var charset=`ABCDEFGHIJKLMNOPQRSTUVWXYZ.,'"?`
  for( i=0; i<charset.length; i++){
    var target = charset[i];
  };
  $('img').on('error', function(){
    $(this).src="/resources/images/menu.png";
  });



  $("#centerImage").change(function() {
    readURL(this);
  });

  console.log('Attempt');
  System.init();

  console.log('This');
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

const Font = {
  name:'fiber_castle_21',
};

const Writer = {
  name:'Word Processor',
  version:'0.0.1',
  build:'1',
  Feature_Set:{
    // auto modify char
    // indentation
    // image upload
    // auto save
    // file format .jblabs
    // file save
    // load file
    // load backup
  },

  render:function(index){
    console.log('Rendering '+index);
    var token = Pages[index];
    var text = token.text.toUpperCase();
    var html = '';
    Paragraph = token.paragraph;
    Paragraph.map((par, index)=>{
      Words = par.text.split(' ');
      html+=`<div id="P${Editor.index}p${index}" align="${par.align}" indent="${par.indent}">`;
      Words.map(word=>{
        html+=Writer.generate.word(word);
      });
      html+='</div>';
    });
    //console.log(html);
    Writer.formater.center(html);
  },
  //Generate
  generate:{
    char:function(char){
      var src = `fonts/${Font.name}/${char}/${random.number(7)}.png`;
      if(char=='.'){
        src = `fonts/${Font.name}/dot/0.png`;
      }
      return ` <img src="${src}" class="H${random.number(100)} L${random.number(50)}">`;
    },
    word:function(word){
      var html = '';
      word=word.split('');
        for (var i = 0; i < word.length; i++) {
          html+=Writer.generate.char(word[i]);
        }
        return `<div class="S${random.number(400,500)}" word>${html}</div>`;
    },
  },
  align:function(target, value){
    console.log('Align: ' + target+' ' + value);
    $(`#${target}`).attr('align',value);
    target=target.split('p')[1];
    Pages[Editor.index].paragraph[target].align=value;
    console.log(Pages[Editor.index].paragraph[target].align);
    System.autosave();
  },
  indent:function(target, value){
  console.log('Indent: ' + target+' ' + value);
  $(`#${target}`).attr('indent',value);
  System.autosave();
  },


  //Formats top center or bottom
  formater:{
    top:function(html){

    },
    center:function(html){
      $(`.page[active] .upper`).html(html);
      $(`.page[active] .lower`).html('');
      //$(`.page[active] .lower`).html(html).scrollTop($(`.page[active] .upper`).height());

      var overflow = false;
      var start = -1;
      $(`.page[active] .upper > div`).each(function(index){
        var container = $(`.page[active] > .upper`).height();
        var top= $(this).position().top;
        var height = $(this).height();
        //overflow = 'overflow';

        console.log(container+ ' vs '+(top+height));
        if((container-top-height)<0){
          console.log(overflow+ $(this).html());
          if(overflow==false){
            overflow=true;
            $(`.page[active] .lower`).html(this);

          }else{
            $(`.page[active] .lower`).append(this);
          }
        }
      })
      Pages[Editor.index].render.upper = $(`.page[active] .upper`).html();
      Pages[Editor.index].render.center = $(`.page[active] .center`).html();
      Pages[Editor.index].render.lower = $(`.page[active] .lower`).html();
      System.autosave();
    },
    bottom:function(html){

    },
  }


}




Template =
{
  settings:{
    fontSize:'4mm',
    spacing:'2mm',
    irregularities:'100%',
  },
  text:'Hello',
  paragraph:[
    {indent:false, align:'left', text:''}
  ],
  image:'top',
  render:{upper:'asd', center:'', lower:''},
}


Pages = [];

Sidebar = {
  //Listener
  init: function(){

    Pages.map((val, index)=>{
      template = `<li index="${index}">Page ${index}</li>`;
      $('#pages').append(template);
      Editor.add(index,'center')
    });
    //addPage
    $('#addPage').on('click', function(){
      Sidebar.add();
    });
    //navigate
    $('#pages li').each(function(i){
      $(this).html(`Page ${i+1}`);
      $(this).off('click');
      $(this).on('click', function(){
        Sidebar.select($(this).attr('index'));
      });
    });
    console.log('Sidebar Initialized');
    return;

  },
  add: function(){
    var len = Pages.length;
    template = `<li index="${len}">Page ${len+1}</li>`;
    $('#pages').append(template);
    temp = Template;
    Pages.push(temp);
    Editor.add(len,'center');
      $('#pages li').last().on('click', function(len){
          Sidebar.select($(this).attr('index'));
    }).click();

    return;
  },
  remove: function(){


  },
  select: function(index){
    console.log(index);
    //remove active
    $('#pages li').each(function(i){$(this).removeAttr('active')});
    $('.page').each(function(i){$(this).removeAttr('active')});
    //Load operation
    Editor.index=index;
    Editor.show();
    //Set values
    $('#textbox').val(Pages[Editor.index].text);
    Editor.format(Pages[Editor.index].text);
    //Set active
    $(`[index=${index}]`).attr('active','');
    $(`[page=${index}]`).attr('active','');
  },
};

Editor = {
  init:function(){
    $('#hide').on('click', function(){
      Editor.hide();
    });
    $('[editor]').off('keyup');
    $('[editor]').on('keyup','#textbox', function(){
      console.log('textbox');
      Editor.format($('#textbox').val());
      Pages[Editor.index].text=$('#textbox').val();
      Writer.render(Editor.index);
    });
    $('#image').on('change', function(){

      Pages[Editor.index].image = $(this).value;
      Writer.render(Editor.index);
    });
    $('#src').change( function(){
      Editor.image.import(this);
    });
    Pages.map(function(page,index){
      $(`[page=${index}] > .upper`).html(page.render.upper);
      $(`[page=${index}] > .center`).html(page.render.center);
      $(`[page=${index}] > .lower`).html(page.render.lower);
    })
    console.log('Editor Initialized');


  },
  add: function(page, format){
    $('[preview]').append(`
      <div class="page" image="${format}" page="${page}" font-size="${Preferences.fontSize}" line-height="${Preferences.lineHeight}">
        <article class="upper">
        </article>
        <article class="center">
        <img src="" image>
        </article>
        <article class="lower">
        </article>
      </div>
      `);
  },
  index:0,
  show:function(){
    $('[editor]').css({display:'block'});
    var height = $('[editor]').height()
    $('[preview]').css({marginBottom:height+70});
  },
  hide:function(){
    $('[editor]').css({display:'none'});
        $('[preview]').css({marginBottom:70});
  },
  load:function(index){
    this.index=index;
    var Token = Pages[index];
    //update all pref
    Token.text

  },

  image:{
    file:'',
    //Import
    import:function(input){
      if (input.files && input.files[0]) {
        console.log('Reading image: '+JSON.stringify(input));
        var reader = new FileReader();
        reader.onload = function(e) {
          this.file = e.target.result
          $('.page[active] [image]').attr('src', e.target.result);
        }
        asd = reader.readAsDataURL(input.files[0]);


      }
    },
  },
  // Format paragraph
  format: function(text){
    Paragraph = text.split('\n');
    $('[arrangement]').html('');
    var end = 0;
    Paragraph.map((par,index)=>{
      try {
        indent = Pages[this.index].paragraph[index].indent;
        align = Pages[this.index].paragraph[index].align;
      } catch (e) {
        indent=false;
        align='left';
      } finally {
        $('[arrangement]').append(`
          <div paragraph>
          ${par.substring(0, 17)}...<br>
          Indent: <input type="checkbox" ${(indent? 'checked': '')} name="P${Editor.index}p${index}" onchange="Writer.indent(this.name,this.checked)">
          <br>
          <select name="P${Editor.index}p${index}" value="" onchange="Writer.align(this.name,this.value)">
          <option value="left" ${((align=="left") ? 'selected' : '')}>Left</option>
          <option value="center" ${((align=="center") ? 'selected' : '')}>Center</option>
          <option value="justify" ${((align=="justify") ? 'selected' : '')}>Justify</option>
          <option value="right" ${((align=="right") ? 'selected' : '')}>Right</option>
          </select>
          </div>
        `);
      }

      Pages[Editor.index].paragraph[index] = {indent:indent, align:align, text:par};
      end = index;
    })
    Pages[Editor.index].paragraph = Pages[Editor.index].paragraph.slice(0,end+1);
  },
  settings:function(){
    Preferences.fontSize = $('#fs').val();
    Preferences.lineHeight = $('#lh').val();
    $('.page').attr('font-size',Preferences.fontSize);
    $('.page').attr('line-height',Preferences.lineHeight);
  },



};


System = {
  init:function(){
    this.load();
    Sidebar.init();
    Editor.init();
  },
  save:function(prompt=true){
    file = JSON.stringify(Pages);
    localStorage.setItem('savedata', file);
    if(prompt) alert('Saved')
  },
  load:function(){
    file = localStorage.getItem('savedata');
    try {
      if(file==null){ return; }
      file = JSON.parse(file);

      if(typeof(file)=="object"){
        Pages = file;
      }
    } catch (e) {
      Pages=[];
    }
  },
  autosave:function(){
    clearTimeout(this.timer)
    this.timer = setTimeout(function(){
      System.save(false)
    }, 1000);
  }
}





Preferences = {
  indentation: true,
  image: true,
  lineHeight:7,
  fontSize:5,


};




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
