let app = {
  myLibrary : [
    {title: 'In Search of Lost Time', author: 'Marcel Proust', pages: '4,215', read: false}, 
    {title: 'Ulysses', author: 'James Joyce', pages: '730', read: false},
    {title: 'Don Quixote', author: 'Miguel de Cervantes', pages: '863', read: false},
    {title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', pages: '218', read: false},
    {title: 'War and Peace', author: 'Leo Tolstoy', pages: '1,225 ', read: false}
  ],

  BookConstructor : function(title, author, pages, read) {
    // Factory Function...
    const book = {
      title,
      author,
      pages,
      read
    }
    return book
  },

  toggleRead : function(v){ 
    v.read  = !v.read;
  },

  addBookToLibrary: function() {
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let read = document.getElementById('read').checked;
  
    if(title !== '' && author !== '' && pages !== ''){
      const item = this.BookConstructor(title, author, pages, read)
      this.myLibrary.push(item)
      this.setLocalStorage()
      display.render()
    }
  },
  
  removeItem: function(v) {
    let element = document.getElementById(v)
    this.myLibrary.splice(v, 1) 
    element.remove()
    display.restoreButton()  
  },
  
  removeAll: function() {
    let ul = document.querySelector('ul')
    ul.innerHTML = ''
    this.myLibrary = []
    display.restoreButton()
  },

  setlocalStorageForRestart: function(){
    if(localStorage.getItem('restart') === null){
      let restart = JSON.stringify(this.myLibrary)
      localStorage.setItem('restart', restart)
    }  
  },

  setLocalStorage: function () {
    let data = JSON.stringify(this.myLibrary)
    localStorage.setItem('data', data)
  },
  
  restartApp: function () {
    localStorage.removeItem('data')
    this.myLibrary = JSON.parse(localStorage.getItem('restart'))
    this.setLocalStorage()
    display.render()
  }
}

let display = {
  render: function() { 
    let ul = document.querySelector('ul');
    ul.innerHTML = ''
    // get local storage if its set
    if(localStorage.getItem('data') !== null){
      app.myLibrary = JSON.parse(localStorage.getItem("data"))
      .map(function(i){
        return app.BookConstructor(
          i.title,
          i.author, 
          i.pages,
          i.read
        )
      })
    }
    app.myLibrary.forEach(function(i, index){ 
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
        removeButton.addEventListener('click', () => app.removeItem(li.id))
        removeButton.id = 'item-button1'
  
        let toggleReadButton = document.createElement('button')
        toggleReadButton.innerText = 'Toggle Read'
        toggleReadButton.id = 'item-button2'
        toggleReadButton.addEventListener('click', function(){
          app.toggleRead(i)
          app.setLocalStorage()
          display.render()
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
    app.setLocalStorage()
  },

  setUpButtons: function(){
    let addButton = document.getElementById('add-button');
    addButton.addEventListener('click', function() {
      app.addBookToLibrary()
    })

  let clearButton = document.getElementById('clear-button');
    clearButton.addEventListener('click', function() {
      app.removeAll()
    })

  let restartButton = document.getElementById('restart-button');
    restartButton.addEventListener('click', function() {
      app.restartApp()
    })
  },

  restoreButton: function () {
    let restoreButton = document.createElement("span");
    restoreButton.addEventListener("click", function(){
        restoreButton.remove();
        app.myLibrary = JSON.parse(localStorage.getItem("data"));;
        display.render()
    })
    restoreButton.innerText = "undo"
    let div = document.getElementById("new-book");
    div.appendChild(restoreButton);
  
    setTimeout(function(){ 
      restoreButton.remove(); 
      app.setLocalStorage()
    }, 2000);    
  },
}

display.render()
display.setUpButtons()
app.setlocalStorageForRestart()












