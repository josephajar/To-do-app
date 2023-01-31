
// let Form = document.getElementById("form");
// let inputText = document.getElementById("input-text");
// let myList = document.getElementById('list');
// let createItemBtn = document.getElementById("ci");


// Form.addEventListener("submit", function (data) {
//     data.preventDefault();
//     createItem(inputText.value);
// })

// function createItem(d) {
//     let myList1 = `<div class="row">
//                       <ol class="list" id="list" style="list-style: none;">
//                        <li> ${d} </li> 
//                        <button class="btn btn-success mx-5 me-5" onclick="EditItem(this)">edit</button>
//                        <button class="btn btn-danger mx-5" onclick="deleteItem(this)">delete</button>
//                       </ol>
//                     </div> `
//     myList.insertAdjacentHTML("afterbegin", myList1);
//     inputText.value = "";
//     inputText.focus();
// }


// function deleteItem(e) {
//     e.parentElement.remove();

// }


// function EditItem(s) {

// }