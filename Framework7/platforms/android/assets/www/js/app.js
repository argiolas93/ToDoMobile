var myApp = new Framework7();

var $$ = Dom7;

var tmpl =  "<li>"+
              "<input value='ID' class='check' onclick='handleClick(this)' type='checkbox'><span>TEXT</span><a class='del hide' onclick='removeThis(this)'>&nbsp&nbsp&nbsp[Delete]</a>"+
            "<li>";

var tmplChecked =  "<li>"+
              "<input value='ID' class='check' onclick='handleClick(this)' type='checkbox' checked><span class='complete'>TEXT</span><a class='del HIDE' onclick='removeThis(this)'>&nbsp&nbsp&nbsp[Delete]</a>"+
            "<li>";


var id;
var obj;

//Load Object from localStorage
id=localStorage.getItem("id");//Get number of stored values
if(id==null)
   id=0;
for(var t=0;t<id;t++){
  obj = JSON.parse(localStorage.getItem(t));
  $$(".list").append($$(obj));
}


//Insert todos
$$("#text").keyup(function(event){
  if(event.keyCode==13){
    //Add the todo to the list
    var t = tmpl.replace("TEXT",$$("#text").val());
    t=t.replace("ID",id);
    $$(".list").append(t);
    //Save in localStorage
    obj = t;
    localStorage.setItem(id,JSON.stringify(obj));//Save obj with id key
    id++;
    localStorage.setItem("id",id);//Save number of stored value
  }
});
$$("#create").on('click',function(){
  var t = tmpl.replace("TEXT",$$("#text").val());
  t=t.replace("ID",id);
  $$(".list").append(t);
  //Save in localStorage
  obj = t;
  localStorage.setItem(id,JSON.stringify(obj));//Save obj with id key
  id++;
  localStorage.setItem("id",id);//Save number of stored value
});

//Clear todos
$$("#clear").on('click',function(){
  //Select all complete to clear
  $$(".list > li").each(function(){
    if($$(this).children("input").is(":checked")==true){
      $$(this).remove();
      //Remove from localStorage
      var h=$$(this).children("input").attr("value");
      localStorage.removeItem(h);
      //id--;
      localStorage.setItem("id",id);//Save number of stored value
    }
  });
  if($$(".menu > input").is(":checked")==true){
    $$(".menu > input").prop('checked',false);
  }
});

//Handle completed todos
function handleClick(cb){
  if($$(cb).is(":checked")){
    $$(cb).parent().children("span").addClass("complete");
    $$(cb).parent().children("a").removeClass("hide");
    //Update localStorage with status
    var newID = $$(cb).attr("value");
    var text = $$(cb).parent().children("span").text();
    localStorage.removeItem(newID);
    var t = tmplChecked.replace("TEXT",text);
    t=t.replace("HIDE","");
    t=t.replace("ID",newID);
    localStorage.setItem(newID,JSON.stringify(t));
  }else{
    $$(cb).parent().children("span").removeClass("complete");
    $$(cb).parent().children("a").addClass("hide");
    //Update localStorage with status
    var newID = $$(cb).attr("value");
    var text = $$(cb).parent().children("span").text();
    localStorage.removeItem(newID);
    var t = tmpl.replace("TEXT",text);
    t=t.replace("HIDE","hide");
    t=t.replace("ID",newID);
    localStorage.setItem(newID,JSON.stringify(t));
  }
}

//Select all todos
function selectAll(cb){
  if($$(cb).is(":checked")){
    $$(".list > li").each(function(){
      $$(this).children("input").prop('checked', true);
      $$(this).children("span").addClass("complete");
    });
  }else{
    $$(".list > li").each(function(){
      $$(this).children("input").prop('checked', false);
      $$(this).children("span").removeClass("complete");
    });
  }
}

function removeThis(a){
  localStorage.removeItem($$(a).parent().children("input").attr("value"));
  $$(a).parent().remove();
  //id--;
  localStorage.setItem("id",id);//Save number of stored value
}
