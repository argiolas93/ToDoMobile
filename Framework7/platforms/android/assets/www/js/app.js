var myApp = new Framework7();

var $$ = Dom7;

var tmpl = "<li id='ID' class='swipeout'>"+
             "<div class='swipeout-content item-content'>"+
               "<label class='label-checkbox item-content'>"+
                 "<input type='checkbox' class='check' onchange='handleClick(this)'>"+
                   "<div class='item-media'>"+
                     "<i class='icon icon-form-checkbox'></i>"+
                   "</div>"+
                   "<div class='item-inner'>"+
                     "<div class='item'>"+
                        "<span>TEXT</span>"+
                     "</div>"+
                   "</div>"+
                 "</label>"+
               "</div>"+
             "<div class='swipeout-actions-right'>"+
               "<a onclick='removeThis(this)'>DELETE</a>"+
             "</div>"+
           "</li>";

var id;
var data;
var selectAll;

if(JSON.parse(localStorage.getItem("selectAll"))==null){
  selectAll=false;
  localStorage.setItem("selectAll",JSON.stringify(selectAll));
}else{
  selectAll=JSON.parse(localStorage.getItem("selectAll"));
}
if(selectAll==true)
  $$("#selectAll").attr('checked','checked');

if(JSON.parse(localStorage.getItem("data"))==null){
  data = new Array();
  id=0;
  localStorage.setItem("id",JSON.stringify(id));
  localStorage.setItem("data",JSON.stringify(data));
}else{
  data = JSON.parse(localStorage.getItem("data"));
  id = JSON.parse(localStorage.getItem("id"));
  for(var t=0;t<data.length;t++){
    var object = tmpl.replace("TEXT",data[t].text);
    object=object.replace("ID",data[t].id);
    if(data[t].complete==true){
      $$(".list").append(object);
      $$("#"+data[t].id).addClass('complete');
      $$("#"+data[t].id).find(".check").attr('checked','checked');
    }else{
      $$(".list").append(object);
    }
  }
}

$$("#text").keyup(function(event){
  if(event.keyCode==13){
    var todo = new Object();
    todo.id=id++;
    todo.text=$$("#text").val();
    todo.complete=false;
    data.push(todo);
    var object = tmpl.replace("TEXT",todo.text);
    object=object.replace("ID",todo.id);
    $$(".list").append(object);
    localStorage.setItem("data",JSON.stringify(data));
    localStorage.setItem("id",JSON.stringify(id));
    $$("#text").val("");
  }
});
$$("#create").on('click',function(){
    var todo = new Object();
    todo.id=id++;
    todo.text=$$("#text").val();
    todo.complete=false;
    data.push(todo);
    var object = tmpl.replace("TEXT",todo.text);
    object=object.replace("ID",todo.id);
    $$(".list").append(object);
    localStorage.setItem("data",JSON.stringify(data));
    localStorage.setItem("id",JSON.stringify(id));
  $$("#text").val("");
});

function removeThis(a){
  var n = $$(a).parent().parent().attr("id");
  var ndata = new Array();
  for(var t=0;t<data.length;t++){
    if(data[t].id!=n)
      ndata.push(data[t]);
  }
  data=ndata;
  $$(a).parent().parent().remove();
  localStorage.setItem("data",JSON.stringify(data));
}

$$('#selectAll').change(function() {
  if($$('#selectAll').is(":checked")){
    selectAll=true;
    $$(".list > li").each(function(){
      var n = $$(this).attr("id");
      for(var t=0;t<data.length;t++){
        if(n==data[t].id)
          data[t].complete=true;
      }
      $$(this).children().children().children("input").prop('checked', true);
      $$(this).addClass("complete");
    });
  }else{
    selectAll=false;
    $$(".list > li").each(function(){
      var n = $$(this).attr("id");
      for(var t=0;t<data.length;t++){
        if(n==data[t].id)
          data[t].complete=false;
      }
      $$(this).children().children().children("input").prop('checked', false);
      $$(this).removeClass("complete");
    });  
  }
  localStorage.setItem("data",JSON.stringify(data));
  localStorage.setItem("selectAll",JSON.stringify(selectAll));
});

function handleClick(cb){
  if($$(cb).is(":checked")){
    for(var t=0;t<data.length;t++){
      var n = $$(cb).parent().parent().parent().attr("id");
      if(n==data[t].id)
        data[t].complete=true;
    }
    $$(cb).parent().parent().parent().addClass("complete");
    localStorage.setItem("data",JSON.stringify(data));
  }else{
    for(var t=0;t<data.length;t++){
      var n = $$(cb).parent().parent().parent().attr("id");
      if(n==data[t].id)
        data[t].complete=false;
    }
    $$(cb).parent().parent().parent().removeClass("complete");
    localStorage.setItem("data",JSON.stringify(data));
  }
}

$$("#clear").on('click',function(){
  var ndata = new Array();
  $$(".list > li").each(function(){
    if($$(this).hasClass("complete")){
      $$(this).remove();
    }else{
      var n = $$(this).attr("id");
      for(var t=0;t<data.length;t++){
        if(data[t].id==n){
          ndata.push(data[t]);
        }
      }
    }
  });
  data=ndata;
  localStorage.setItem("data",JSON.stringify(data));
  $$("#selectAll").prop('checked',false);
  selectAll=false;
  localStorage.setItem("selectAll",JSON.stringify(selectAll));
});