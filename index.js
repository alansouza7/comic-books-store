import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
  

const comickBooks = [
    {
        title: 'Spider Man vol#1',
        price: 20,
        qtd: 0,
        isSelected: false,
        image: 'spider-man-first.gif',
        uuid: uuidv4(),
    },

    {
        title: 'Spider Man vol#2',
        price: 22,
        qtd: 0,
        isSelected: false,
        image: 'spider-man-second.gif',
        uuid: uuidv4(),
    },

    {
        title: 'Spider Man vol#3',
        price: 16,
        qtd: 0,
        isSelected: false,
        image: 'spider-man-third.jpg',
        uuid: uuidv4(),
    },
]


const modalContainerEl = document.getElementById('modal-container')
let totalEl = document.getElementById('total-price')



/* RENDERING HTML */
function getHtml(){
    let comickBooksHtml = ``
    comickBooks.forEach(function(book){
        comickBooksHtml += `<div id="${book.uuid}" class="products products-container">
                <div class="comic-book">
                    <img src="images/${book.image}" alt="comic book">
                </div>
                <div class="book-info">
                    <p class="book-tittle">${book.title}</p>
                    <p class="book-price">£${book.price}</p>
                </div>
                <button data-select="${book.uuid}" class="select-btn">Select</button>
            </div>
        `
    })
    return comickBooksHtml
}

function renderHtml(){
    const mainEl = document.getElementById('main')
    mainEl.innerHTML = getHtml()
}

renderHtml()



/* EVENT LISTENERS FOR BUTTONS */
document.addEventListener("click", function(e){
    if(e.target.dataset.select){
        pushItemSelected(e.target.dataset.select)
    } else if (e.target.dataset.delete){
        deleteItem(e.target.dataset.delete)
    } else if (e.target.id === 'complete-order-btn'){
        completeOrder()
    } 
})




// RENDER ITEM SELECTED //
let objects = []

function pushItemSelected(itemID){
    document.querySelector('.hidden').classList.add('show')
    const bookSelected = comickBooks.filter(function(book){
        return book.uuid.includes(itemID)
    })[0]
    
    if(!objects.includes(bookSelected)){
        objects.push(bookSelected)
    } 

    bookSelected.qtd++
    renderItemSelected()
    getTotalPrice()
}


function renderItemSelected(){
    let objectsHtml = ``
    objects.forEach(function(book){
        objectsHtml += 
        `
        <div class="products-selected">
        <div class="footer-product-info">
        <img width="50" src="images/${book.image}" alt="">
        <p class="footer-book-name">${book.title}</p>
        <button data-delete="${book.uuid}" class="delete-btn">DELETE</button>
    </div>

    <div class="modal-prices-div">
        <p class="qtd">Qtd: ${book.qtd}</p>
    </div>
    </div>
        `
    })
    modalContainerEl.innerHTML = objectsHtml
}



/* DELETE ITEM SELECTED */
function deleteItem(deleteId){
    objects.forEach(function(book, index){
        if(index, book.uuid === deleteId){
            objects.splice(index, book.uuid === deleteId)
            book.qtd = 0
        }
    })
    getTotalPrice()
    renderItemSelected()
}


/* GET TOTAL PRICE */
function getTotalPrice(){
    let totalPrice = null
    objects.forEach(function(price){
       totalPrice += price.price * price.qtd
    })

    if(totalPrice){
        totalEl.innerHTML = `£${totalPrice}`
    } else {
        document.querySelector('.hidden').classList.remove('show')
    }      
}


/* COMPLETE ORDER BTN */

function completeOrder(){
   document.querySelector('.payment-modal').classList.add('show')
   document.querySelector('.container').style.filter = "blur(3px)"
}


/* PAYMENT MODAL */
document.getElementById('form').addEventListener("submit", function(e){
    const modal = document.getElementById('modal')
    e.preventDefault()
    const infoForm = new FormData(form)
    const cardHolder = infoForm.get('card-holder')

   modal.innerHTML = `<p class="order-message">Thanks ${cardHolder} your order is on its way!</p>`
   resetForm()
})


document.getElementById('exit-btn').addEventListener("click", function(){
    resetForm()
})

function resetForm(){
    document.querySelector('.payment-modal').classList.remove('show')
    document.querySelector('.container').style.filter = "none"
    form.reset()
}


