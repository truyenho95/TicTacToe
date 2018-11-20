// Khai báo biến
var position = {
      X: null,
      Y: null
    }
var isWon = false;
var squares = 10;

// Tạo bảng và addEvent ngay khi truy cập vào web
window.onload = () => {
  makeTable();
  select();
};

// [FUNCTION]: Tạo bảng
function makeTable() {
  var table = '';
  for (var i = 0; i < squares; i++) {
    table += "<tr>";
    for (var j = 0; j < squares; j++) {
      table += `<td><input type="button" data-position="${j},${i}" value="" class="select"></td>`;
    }
    table += "</tr>";
  }

  document.getElementById('table').innerHTML = table;
}

// [FUNCTION]: Chơi lại
function reset() {
  makeTable();
  select();
  isWon = false;
}

// [FUNCTION]: Lấy tọa độ ô chọn
function getPosition(item) {
  position.X = item.dataset.position.split(',')[0];
  position.Y = item.dataset.position.split(',')[1];
  return position;
}

// [FUNCTION]: Kiểm tra theo đường thẳng
function checkLine(a, b, opponent) {
  // Check Line Horizontal
  for (var i=a-1; i<=a+1; i++) {
    var select0 = document.querySelector(`input[data-position="${i-1},${b}"]`);
    var select1 = document.querySelector(`input[data-position="${i},${b}"]`);
    var select2 = document.querySelector(`input[data-position="${i+1},${b}"]`);
    var check1 = document.querySelector(`input[data-position="${i-2},${b}"]`);
    var check2 = document.querySelector(`input[data-position="${i+2},${b}"]`);

    if (select0==null || select1==null ||select2==null) 
      continue;
    else if (select0.value && select1.value && select2.value && select0.value == select1.value && select0.value == select2.value && (check1==null || check1.value!=opponent) && (check2==null || check2.value!=opponent)) {
      isWon = true;
      break;
    }
  }

  // Check Line Vertical
  for (var i=b-1; i<=b+1; i++) {
    var select0 = document.querySelector(`input[data-position="${a},${i-1}"]`);
    var select1 = document.querySelector(`input[data-position="${a},${i}"]`);
    var select2 = document.querySelector(`input[data-position="${a},${i+1}"]`);
    var check1 = document.querySelector(`input[data-position="${a},${i-2}"]`);
    var check2 = document.querySelector(`input[data-position="${a},${i+2}"]`);

    if (select0==null || select1==null ||select2==null) 
      continue;
    else if (select0.value && select1.value && select2.value && select0.value == select1.value && select0.value == select2.value && (check1==null || check1.value!=opponent) && (check2==null || check2.value!=opponent)) {
      isWon = true;
      break;
    }
  }
}

// [FUNCTION]: Kiểm tra theo đường chéo
function checkDiagonal(a, b, opponent) {
  // Check Main Diagonal
  for (var i=b-1; i<=b+1; i++) {
    var select0 = document.querySelector(`input[data-position="${i-1},${i-1}"]`);
    var select1 = document.querySelector(`input[data-position="${i},${i}"]`);
    var select2 = document.querySelector(`input[data-position="${i+1},${i+1}"]`);
    var check1 = document.querySelector(`input[data-position="${i-2},${i-2}"]`);
    var check2 = document.querySelector(`input[data-position="${i+2},${i+2}"]`);

    if (select0==null || select1==null ||select2==null) 
      continue;
    else if (select0.value && select1.value && select2.value && select0.value == select1.value && select0.value == select2.value && (check1==null || check1.value!=opponent) && (check2==null || check2.value!=opponent)) {
      isWon = true;
      break;
    }
  }

  // Check Second Diagonal
  for (var i=b-1; i<=b+1; i++) {
    var select0 = document.querySelector(`input[data-position="${(squares-1)-(i-1)},${i-1}"]`);
    var select1 = document.querySelector(`input[data-position="${(squares-1)-i},${i}"]`);
    var select2 = document.querySelector(`input[data-position="${(squares-1)-(i+1)},${i+1}"]`);
    var check1 = document.querySelector(`input[data-position="${(squares-1)-(i-2)},${i-2}"]`);
    var check2 = document.querySelector(`input[data-position="${(squares-1)-(i+2)},${i+2}"]`);

    if (select0==null || select1==null ||select2==null) 
      continue;
    else if (select0.value && select1.value && select2.value && select0.value == select1.value && select0.value == select2.value && (check1==null || check1.value!=opponent) && (check2==null || check2.value!=opponent)) {
      isWon = true;
      break;
    }
  }
}

// [FUNCTION]:  Chọn ô
function select() {
  var isX = true;
  position = {
    X: null,
    Y: null
  };
  
  document.querySelectorAll('input.select').forEach((item) => {
    item.addEventListener('click', () => {
      if (isX && item.value=='') { 
        item.style.color = 'blue';
        item.value = "x";
        isX = false;
        getPosition(item);
        checkLine(position.X,position.Y,'o');
        checkDiagonal(position.X,position.Y,'o');
        if (isWon) alert('Player X WIN!');
      }
      else if (item.value=='') {
        item.style.color = 'red';
        item.value = "o";
        isX = true;
        getPosition(item);
        checkLine(position.X,position.Y,'x');
        checkDiagonal(position.X,position.Y,'x');
        if (isWon) alert('Player O WIN!');        
      }
    });
  });
}

// [EVENT]: Reset Button
document.getElementById('reset').addEventListener('click', reset);

