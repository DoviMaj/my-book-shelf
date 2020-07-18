let myLibrary = [
  {title: 'In Search of Lost Time', author: 'Marcel Proust', pages: '4,215', read: false}, 
  {title: 'Ulysses', author: 'James Joyce', pages: '730', read: false},
  {title: 'Don Quixote', author: 'Miguel de Cervantes', pages: '863', read: false},
  {title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', pages: '218', read: false},
  {title: 'War and Peace', author: 'Leo Tolstoy', pages: '1,225 ', read: false}
];


function Book(title, author, pages, read) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead =  function(){ 
  this.read  = !this.read;
}

render()
setUpButtons()

// check if item was set
if(localStorage.getItem('restart') === null){
  let restart = JSON.stringify(myLibrary)
  localStorage.setItem('restart', restart)
}


function setUpButtons(){
    let addButton = document.getElementById('add-button');
    addButton.addEventListener('click', function() {
      addBookToLibrary()
  })

  let clearButton = document.getElementById('clear-button');
    clearButton.addEventListener('click', function() {
      removeAll(true)
  })

  let restartButton = document.getElementById('restart-button');
    restartButton.addEventListener('click', function() {
      restartApp()
  })
}



function addBookToLibrary() {
  let title = document.getElementById('title').value;
  let author = document.getElementById('author').value;
  let pages = document.getElementById('pages').value;
  let read = document.getElementById('read').checked;

  if(title !== '' && author !== '' && pages !== ''){
    const item = new Book(title, author, pages, read)
    item.prototype = Object.create(Book.prototype);
    myLibrary.push(item)
    setLocalStorage()
    render()
  }
}

function render() { 
  let ul = document.querySelector('ul');
  ul.innerHTML = ''
  // get local storage if its set
  if(localStorage.getItem('data') !== null){
    myLibrary = JSON.parse(localStorage.getItem("data"))
    .map(function(i){
      return new Book(
        i.title,
        i.author, 
        i.pages,
        i.read
      )
    })
  }
  myLibrary.forEach(function(i, index){ 
    if(i !== ''){
      let li = document.createElement('li')
      li.id = index;
      let div1 = document.createElement('div')
      div1.id = 'book-title'
      let div2 = document.createElement('div')
      div2.id = 'book-author'
      let div3 = document.createElement('div')
      let div4 = document.createElement('div')
      let removeButton = document.createElement('button')
      removeButton.innerText = 'Remove' 
      removeButton.addEventListener('click', () => removeItem(li.id))
      removeButton.id = 'item-button1'

      let toggleReadButton = document.createElement('button')
      toggleReadButton.innerText = 'Toggle Read'
      toggleReadButton.id = 'item-button2'
      toggleReadButton.addEventListener('click', function(){
        i.toggleRead()
        setLocalStorage()
        render()
      })
      div1.innerHTML = `${i.title}`;
      div2.innerHTML = `By ${i.author}`;
      div3.innerHTML = `${i.pages} Pages`;
      if(i.read){
        div4.innerHTML = `read`;
      }
      else{
        div4.innerHTML = `not read`;
      }
        
      li.appendChild(div1)
      li.appendChild(div2)
      li.appendChild(div3)
      li.appendChild(div4)
      li.appendChild(toggleReadButton) 
      li.appendChild(removeButton)
      ul.appendChild(li)      
    }
  })
  document.getElementById('title').value = ''
  document.getElementById('author').value = ''
  document.getElementById('pages').value = ''
  document.getElementById('read').checked = ''
  setLocalStorage()
}

function removeItem(v) {
  let element = document.getElementById(v)
  myLibrary.splice(v, 1) 
  element.remove()
  restoreButton()  
}

function removeAll(v) {
  let ul = document.querySelector('ul');
  ul.innerHTML = ''
  myLibrary = []
  if(v){
    restoreButton()
  }
}

function restoreButton() {
  let restoreButton = document.createElement("span");
  restoreButton.addEventListener("click", function(){
      restoreButton.remove();
      myLibrary = JSON.parse(localStorage.getItem("data"));;
      render()
  })
  restoreButton.innerText = "undo"
  let div = document.getElementById("new-book");
  div.appendChild(restoreButton);

  setTimeout(function(){ 
    restoreButton.remove(); 
    setLocalStorage()
  }, 2000);    
}



function setLocalStorage() {
  let data = JSON.stringify(myLibrary)
  localStorage.setItem('data', data)
}

function restartApp() {
  localStorage.removeItem('data')
  myLibrary = JSON.parse(localStorage.getItem('restart'))
  setLocalStorage()
  render()
}

