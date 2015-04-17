var tmpl =  "<li  class='table-view-cell'>"+
              "<input id='ID' onclick='handleClick(this)' type='checkbox'/><span>TEXT</span><button class='btn btn-negative delete' onclick='removeThis(this)'>Delete</button>"+
            "</li>";

var id;
var data;
var selectAll;

$(document).ready(function(event){
  if(JSON.parse(localStorage.getItem("selectAll"))==null){
    selectAll=false;
    localStorage.setItem("selectAll",JSON.stringify(selectAll));
  }else{
    selectAll=JSON.parse(localStorage.getItem("selectAll"));
  }
  if(selectAll==true)
    $("#selectAll").attr('checked','checked');

  if(JSON.parse(localStorage.getItem("data"))==null){
    data = new Array();
    id=0;
    localStorage.setItem("id",JSON.stringify(id));
    localStorage.setItem("data",JSON.stringify(data));
  }else{
    data = JSON.parse(localStorage.getItem("data"));
    id = JSON.parse(localStorage.getItem("id"));
    if(data.length==0){
      id=0;
      localStorage.setItem("id",JSON.stringify(id));
    }
    for(var t=0;t<data.length;t++){
      var object=tmpl.replace("TEXT",data[t].text);
      object=object.replace("ID",data[t].id);
      if(data[t].complete==true){
        $(".list").append(object);
        $("#"+data[t].id).parent().addClass('complete');
        $("#"+data[t].id).attr('checked','checked');
      }else{
        $(".list").append(object);
      }
    }
  }

  $("#text").keyup(function(event){
    if(event.keyCode==13){
      var todo = new Object();
      todo.id=id++;
      todo.text=$("#text").val();
      todo.complete=false;
      data.push(todo);
      var object = tmpl.replace("TEXT",todo.text);
      object=object.replace("ID",todo.id);
      $(".list").append(object);
      localStorage.setItem("data",JSON.stringify(data));
      localStorage.setItem("id",JSON.stringify(id));
      $("#text").val("");
    }
  });
  $("#create").on('click',function(){
    var todo = new Object();
    todo.id=id++;
    todo.text=$("#text").val();
    todo.complete=false;
    data.push(todo);
    var object = tmpl.replace("TEXT",todo.text);
    object=object.replace("ID",todo.id);
    $(".list").append(object);
    localStorage.setItem("data",JSON.stringify(data));
    localStorage.setItem("id",JSON.stringify(id));
    $("#text").val("");
  });  
  $("#clear").on('click',function(){
    var ndata = new Array();
    $(".list > li").each(function(){
      if($(this).hasClass("complete")){
        $(this).remove();
      }else{
        var n = $(this).children("input").attr("id");
        for(var t=0;t<data.length;t++){
          if(data[t].id==n){
            ndata.push(data[t]);
          }
        }
      }
    });
    data=ndata;
    localStorage.setItem("data",JSON.stringify(data));
    $("#selectAll").prop('checked',false);
    selectAll=false;
    localStorage.setItem("selectAll",JSON.stringify(selectAll));
  });
  
  $("#selectAll").on('click',function(){
    if($(this).is(":checked")){
      selectAll=true;
      $(".list > li").each(function(){
        var n = $(this).children("input").attr("id");
        for(var t=0;t<data.length;t++){
          if(n==data[t].id)
            data[t].complete=true;
        }
        $(this).children("input").prop('checked', true);
        $(this).addClass("complete");
      });
    }else{
      selectAll=false;
      $(".list > li").each(function(){
        var n = $(this).attr("id");
        for(var t=0;t<data.length;t++){
          if(n==data[t].id)
            data[t].complete=false;
        }
        $(this).children("input").prop('checked', false);
        $(this).removeClass("complete");
      });  
    }
    localStorage.setItem("data",JSON.stringify(data));
    localStorage.setItem("selectAll",JSON.stringify(selectAll));
  });
});

function removeThis(b){
  var n = $(b).parent().children("input").attr("id");
  var ndata = new Array();
  for(var t=0;t<data.length;t++){
    if(data[t].id!=n)
      ndata.push(data[t]);
  }
  data=ndata;
  $(b).parent().remove();
  localStorage.setItem("data",JSON.stringify(data));
}

function handleClick(cb){
  if($(cb).is(":checked")){
    for(var t=0;t<data.length;t++){
      var n = $(cb).attr("id");
      if(n==data[t].id)
        data[t].complete=true;
    }
    $(cb).parent().addClass("complete");
    localStorage.setItem("data",JSON.stringify(data));
  }else{
    for(var t=0;t<data.length;t++){
      var n = $(cb).attr("id");
      if(n==data[t].id)
        data[t].complete=false;
    }
    $(cb).parent().removeClass("complete");
    localStorage.setItem("data",JSON.stringify(data));
  }
}