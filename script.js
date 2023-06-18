import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import { getDatabase, ref, push, onValue, remove  } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js'


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

    if(snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val()) //gets converted into array of only values
        console.log(itemsArray) //this is an object
        
        clearShoppingItemsEl()
        
        for(let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            // console.log(itemsArray[i])
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            appendItemToShoppingItemsEl(currentItem) 
        }
    }else {
        shoppingItemsEl.textContent = "No items here...yet"
    }
    // console.log(itemsArray)
})
function clearShoppingItemsEl() {
    shoppingItemsEl.innerHTML = ""
}

function clearInputField() {
    inputField.value = ""
}
function appendItemToShoppingItemsEl(item) {
    let itemID = item[0]
    let itemValue = item[1]

    let listEl = document.createElement('li')
    listEl.textContent = itemValue 
    
    listEl.addEventListener('dblclick', () => {
        // console.log(itemID)
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })

    shoppingItemsEl.append(listEl)
    // shoppingItemsEl.innerHTML += `<li>${itemValue}</li>`
}