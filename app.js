$(document).ready(function() {
  var input = document.getElementById('item');

 
  var itemsArray;
  if (localStorage.getItem('items')) {
    itemsArray = JSON.parse(localStorage.getItem('items'));
    generateTable(itemsArray);
  } else {
    itemsArray = [];
  }


function isEquivalent(x, y) { 

  var xProps = Object.getOwnPropertyNames(x); 
  var yProps = Object.getOwnPropertyNames(y); 
  if (xProps.length != yProps.length) { 
     return false; 
  } 
  for (var i = 0; i < xProps.length; i++) { 
     var propName = xProps[i]; 
     if (x[propName] !== y[propName]) { 
       return false; 
     } 
  }  
  return true;
}

function toDoList(task) {
    var obj = {};
    var taskDate = new Date();
    var myId = getHighestId();
    obj.taskId = myId.toString();
    obj.task = task;
    obj.created_at = taskDate.toLocaleString();
    return obj;
}
function getHighestId(){
  var highestId = itemsArray.length + 1;
  for(var i = 0; i < itemsArray.length; i++){
      highestId = Number(itemsArray[i].taskId) + 1;
  }
  return highestId;
}

$('#local_storage_form').submit(function(el) {
  el.preventDefault();

  itemsArray.push(toDoList(input.value));

  localStorage.setItem('items', JSON.stringify(itemsArray));
  generateTable(JSON.parse(localStorage.getItem('items')));
  input.value = "";
});

$(".confirm").on("click", function() {
  if (confirm('Are you sure you want to delete?')) {
    localStorage.clear();
    location.reload();
  }
});

function generateTable(obj) {
  var tbl = '';
  tbl += '<table class="table table-hover">';

  tbl += '<thead>';
  tbl += '<tr>';
  tbl += '<th>ID</th>';
  tbl += '<th>Task</th>';
  tbl += '<th>Time</th>';
  tbl += '<th>Save</th>';
  tbl += '<th>Delete</th>';
  tbl += '</tr>';
  tbl += '</thead>';

  tbl += '<tbody>';
 
    for(var i = 0; i < obj.length; i++){
    var row_id = obj[i].taskId;

    tbl += '<tr row_id="' + row_id + '">';
    tbl += '<td><div>' + obj[i].taskId + '</div></td>';
    tbl += '<td><div class="row_data"  col_name="taskcol">' + obj[i].task + '</div></td>';
    tbl += '<td><div>' + obj[i].created_at + '</div></td>';
    tbl += '<td>';
    tbl += '<span class="btn_edit" > <a href="#"  row_id="' + obj[i].taskId + '" > Save changes</a> </span></td>';
    tbl += '<td><span class="btn_delete" > <a href="#"  row_id="' + obj[i].taskId + '" > Delete</a> </span></td>';
    tbl += '</tr>';

  }
  tbl += '</tbody>';
  tbl += '</table>';
 
 $('.tbl_user_data').html(tbl);
}

$(document).on('click', '.row_data', function(el) {
  el.preventDefault();
  $(this).closest('div').attr('contenteditable', 'true');
  $(this).focus();
});


$(document).on('click', '.btn_delete', function(event) {
  event.preventDefault();
  if (confirm('Are you sure you want to delete?')) {
  var tbl_row = $(this).closest('tr');
  var row_id = tbl_row.attr('row_id');

  
  var newArray = [];
  for (var i = 0; i < itemsArray.length; i++) {
     if(isEquivalent(itemsArray[i].taskId, row_id) === false){
         newArray.push (itemsArray[i]);
     }
  }
    localStorage.clear();
    localStorage.setItem('items', JSON.stringify(newArray));
    location.reload();
  }

});


$(document).on('click', '.btn_edit', function(e) {
  e.preventDefault();

  var tbl_row = $(this).closest('tr');
  var row_id = tbl_row.attr('row_id');
  var col_val;
  tbl_row.find('.row_data').each(function(index, val) {
    col_val = $(this).html();
    
  });
  for (var i = 0; i < itemsArray.length; i++) {
      if(isEquivalent(itemsArray[i].taskId, row_id) === true){
         itemsArray[i].task = col_val;
      }
    }
    localStorage.clear();
    localStorage.setItem('items', JSON.stringify(itemsArray));
});

});
