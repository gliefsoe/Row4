var cells = document.getElementsByClassName('cell');
for (var i = 0; i < cells.length; i++) {
  cells[i].addEventListener('click', function() {
    var x = this.id.charAt(2);
    var y = this.id.charAt(3);
    console.log(this.id + ' : where x:', x, 'y:', y);
    
    this.style.backgroundColor = 'red';
  });
}