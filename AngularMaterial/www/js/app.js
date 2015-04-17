var app = angular.module('ToDoMobile',['ngMaterial']);

  app.controller('todoController',['$scope',function($scope){

    if(JSON.parse(localStorage.getItem('selectedAll')==null)){
      $scope.selectedAll=false;
      $scope.select=$scope.selectedAll;
      localStorage.setItem('selectedAll', JSON.stringify($scope.selectedAll));
    }else{
      $scope.selectedAll = JSON.parse(localStorage.getItem('selectedAll'));
      $scope.select=$scope.selectedAll;
    }
    if(JSON.parse(localStorage.getItem('todos')==null)){
      $scope.todos = new Array();
      localStorage.setItem('todos', JSON.stringify($scope.todos));
    }else{
      $scope.todos = JSON.parse(localStorage.getItem('todos'));
    }
    
    
    $scope.addTodo=function(){
      $scope.todos.push({'title':$scope.txt,'complete':false});
      $scope.txt = ''
      localStorage.setItem('todos', JSON.stringify($scope.todos));
    }
    
    
    $scope.clearCompleted = function(){
      $scope.selectedAll=false;
      $scope.select=false;
      $scope.todos = $scope.todos.filter(function(item){
        return !item.complete;
      })
      localStorage.setItem('todos', JSON.stringify($scope.todos));
      localStorage.setItem('selectedAll', JSON.stringify($scope.selectedAll));
    }
    
    
    $scope.selectThis=function(todo){
      angular.forEach($scope.todos,function(item){
        if(item==todo)
          item.complete = todo.complete;
      })
      localStorage.setItem('todos', JSON.stringify($scope.todos));
    }
    
    
    $scope.removeThis=function(todo){
      $scope.todos = $scope.todos.filter(function(item){
        if(item!=todo)
          return item;
      })
      localStorage.setItem('todos', JSON.stringify($scope.todos));
    }
    
    
    $scope.selectAll=function(){
      if($scope.selectedAll){
        $scope.selectedAll=false;
      }else{
        $scope.selectedAll=true;
      }
      angular.forEach($scope.todos,function(item){
        item.complete = $scope.selectedAll;
      })
      localStorage.setItem('todos', JSON.stringify($scope.todos));
      localStorage.setItem('selectedAll',JSON.stringify($scope.selectedAll));
    }
    
    
  }]);
