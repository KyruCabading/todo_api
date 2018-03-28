$(document).ready(function(){
  $.getJSON('/api/todos')
  .then(showAllTodos);

  $('#input').keypress(function(event){
    if(event.which == 13) {
      createTodo();
    }
  });

  $('#list').on('click', 'span', function(event){
    removeTodo($(this).parent());
    event.stopPropagation();
  });

  // Check Specific Todos by clicking
  $('#list').on('click', 'li', function(){
    markTodo($(this));
  });

});



// Show All Todos
function showAllTodos(todos) {
  // add todos to the page
  todos.forEach(function(todo) {
    addTodo(todo);
  });
}

// Show Todo
function addTodo(todo) {
  var newTodo = $('<li> <span class="delete"><i class="fa fa-trash"></i></span>' + todo.name + '</li>');
  newTodo.data('id', todo._id);
  newTodo.data('completed', todo.completed);
  if(newTodo.data('completed')) {
    newTodo.addClass('done');
  }
  $('#list').append(newTodo);
}

// Add New Todo
function createTodo(){
  // Variables
  var userInput = $('#input').val();
  // Send POST request to create todo
  $.post('/api/todos', {name: userInput})
  .then(function(newTodo){
    $('#input').val('');
    addTodo(newTodo);
  })
  .catch(function(err){
    console.log(err);
  });

}

function removeTodo(todo) {
  var todoID = todo.data('id');
  var deleteUrl = '/api/todos/' + todoID;
  todo.fadeOut(1000, function(){
    todo.remove();
  });
  event.stopPropagation();
  $.ajax({
    method: 'DELETE',
    url: deleteUrl
  })
  .then(function(data){

  })
  .catch(function(err){
    console.log(err);
  })
}

function markTodo(todo) {
  var todoID = todo.data('id');
  var putUrl = '/api/todos/' + todoID;
  var toggleDone = !todo.data('completed');
  var updateTodo = {completed: toggleDone};
  $.ajax({
    method: 'PUT',
    url: putUrl,
    data: updateTodo
  })
  .then(function(data){
    todo.toggleClass('done');
    todo.data('completed', toggleDone);
    console.log(data);
  })
  .catch(function(err){
    console.log(err);
  });
}

// $('ul').on("click", "li", function (){
//   $(this).toggleClass('done');
//   event.stopPropagation();
// });
