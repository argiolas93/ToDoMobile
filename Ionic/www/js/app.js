// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('ToDoMobile', ['ionic']);

  app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    })
  });
  
  app.controller('todoController',['$scope',function($scope){

    if(JSON.parse(localStorage.getItem('selectedAll')==null)){
      $scope.selectedAll=false;
      localStorage.setItem('selectedAll', JSON.stringify($scope.selectedAll));
    }else{
      $scope.selectedAll = JSON.parse(localStorage.getItem('selectedAll'));
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
      $scope.todos = $scope.todos.filter(function(item){
        return !item.complete;
      })
      localStorage.setItem('todos', JSON.stringify($scope.todos));
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
        $scope.selectedAll=true;
      }else{
        $scope.selectedAll=false;
      }
      angular.forEach($scope.todos,function(item){
        item.complete = $scope.selectedAll;
      })
      localStorage.setItem('todos', JSON.stringify($scope.todos));
      localStorage.setItem('selectedAll',JSON.stringify($scope.selectedAll));
    }
    
    
  }]);
