let formCancel = document.querySelector('.form-cancel')
let addBookmark = document.querySelector('.heading-container')
let formContainer = document.querySelector('.create-form-container')
let createForm = document.querySelector('.bookmark-form')
let formBtn = document.querySelector('.form-btn')
let nameField = document.querySelector('#name')
let urlField = document.querySelector('#url')
let bookmarksContainer = document.querySelector('.bookmarks-container')
let bookCancel

let bookmarks = []
addBookmark.addEventListener('click', ()=>{
    formContainer.classList.add('change')
    nameField.focus()
})
formCancel.addEventListener('click', ()=>{
    formContainer.classList.remove('change')
    location.reload()
})
// set local storage
function setLocalStorage(bookmarks){
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
}
// display alert function
let alert = document.querySelector('.alert')
let alertMessage = document.querySelector('.alert-message')
function warningAlert() {
    alert.classList.remove('alert-sucess')
    alert.classList.add('alert-warning')
    alertMessage.innerText = 'please Insert a valid url!'
    alert.style.visibility = 'visible'
    setTimeout(function() {
    alert.style.visibility = 'hidden';
}, 3000);
}
function sucessAlert() {
    let name = nameField.value
    alert.classList.remove('alert-warning')
    alert.classList.add('alert-sucess')
    alertMessage.innerText = `${name} added to bookmark`
    alert.style.visibility = 'visible'
    setTimeout(function() {
    alert.style.visibility = 'hidden';
}, 3000);
}
function fetchBookmark(){
    if(localStorage.getItem('bookmarks')){
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
        bookmarks.forEach((bookmark)=>{
            let bookName = bookmark.name;
            let bookUrl = bookmark.url;
            let book = document.createElement('div')
            book.classList.add('bookmark')
            let cancelContainer = document.createElement('div')
            cancelContainer.classList.add('cancel-container')
            cancelContainer.classList.add('book-cancel')
            let line1 = document.createElement('div')
            line1.classList.add('line-1')
            let line2 = document.createElement('div')
            line2.classList.add('line-2')
            cancelContainer.append(line1, line2)
            let namePart = document.createElement('p')
            namePart.classList.add('bookmark-name')
            namePart.innerText = `${bookName}`
            book.append(cancelContainer, namePart)
            let bookmarkLink = document.createElement('a')
            bookmarkLink.classList.add('bookmark-link')
            bookmarkLink.setAttribute('href', `${bookUrl}`)
            bookmarkLink.setAttribute('target', '_blank')
            bookmarkLink.appendChild(book)
            bookmarksContainer.appendChild(bookmarkLink)
            bookCancel = document.querySelectorAll('.book-cancel')
        })
    }
    bookCancel.forEach((book)=>{
        book.addEventListener('click', (e)=>{
            e.preventDefault()
            let elem = e.srcElement.parentElement
            let elemToRemove = elem.parentNode
            let elemToRemoveUrl = elemToRemove.getAttribute('href')
            let indexToRemove
            bookmarks.forEach((bookmark, i) =>{
                if (bookmark.url == elemToRemoveUrl){
                    indexToRemove = i
                }
            })
            bookmarks.splice(indexToRemove, 1)
            setLocalStorage(bookmarks)
            elemToRemove.remove()
            fetchBookmark()
            location.reload()
        })
})
}

// regular expressions for form validatoin
let expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
let regEx = new RegExp(expression);
formBtn.addEventListener('click', ()=>{
    let name = nameField.value
    let url = urlField.value
    if (!url.includes('http://') || !url.includes('https://')){
        url = `http://${url}`
    }
    if(url.match(regEx)){
        bookmark = {
            name: name,
            url: url
        }
        bookmarks.push(bookmark)
        setLocalStorage(bookmarks)
        fetchBookmark()
        sucessAlert()
        createForm.reset()
        nameField.focus()
    }
    else{
        warningAlert()
    }
    
})
document.addEventListener('keydown', (e)=>{
    if (e.code === 'Enter'){
        formBtn.click()
    }
})

window.addEventListener('click', (e)=>{
   if(e.target === formContainer) {
    formCancel.click()
   }
})
fetchBookmark()
