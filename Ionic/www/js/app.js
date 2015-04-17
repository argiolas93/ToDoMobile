var app = angular.module('ToDoMobile', ['ionic']);

  app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    })
  });
  
  app.controller('todoController',['$scope',function($scope){
    
    $scope.shouldShowDelete = false;
    $scope.shouldShowReorder = false;
    $scope.listCanSwipe = true

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
      $scope.selectedAll=false;
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
