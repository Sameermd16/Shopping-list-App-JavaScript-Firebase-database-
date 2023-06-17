import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import { getDatabase, ref, push, onValue } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js'


const appSettings = {
    databaseURL: "https://groceries-app-3a5bf-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const addBtn = document.getElementById('add_btn')
const inputField = document.getElementById('input_field')
const shoppingItemsEl = document.getElementById("shopping_list")

addBtn.addEventListener('click', () => {
    let inputValue = inputField.value 

    push(shoppingListInDB, inputValue)

    // console.log(`${inputValue} is added to database`)
    clearInputField()
    // appendItemToShoppingItemsEl(inputValue)
})

onValue(shoppingListInDB, function(snapshot){
    let currentItem = itemsArray[i]
    // console.log(snapshot.val()) this is an object
    let itemsArray = Object.values(snapshot.val()) //gets converted into array of only values

    clearShoppingItemsEl()

    for(let i = 0; i < itemsArray.length; i++) {
        // console.log(itemsArray[i])
        appendItemToShoppingItemsEl(itemsArray[i])
    }
    // console.log(itemsArray)
})
function clearShoppingItemsEl() {
    shoppingItemsEl.innerHTML = ""
}

function clearInputField() {
    inputField.value = ""
}
function appendItemToShoppingItemsEl(itemValue) {
    shoppingItemsEl.innerHTML += `<li>${itemValue}</li>`
}