console.log('hai everyday');

document.addEventListener("click",function(e){
    // ubdate methode 
if (e.target.classList.contains('edit-me')) {
  
    let res = prompt('enter the new value',e.target.parentElement.parentElement.querySelector('.item-text').innerHTML) 
    axios.post("/update-item",{text:res,id:e.target.getAttribute('data-id')}).then(function () {
        e.target.parentElement.parentElement.querySelector('.item-text').innerHTML =res
    }).catch(function () {
        console.log('error,please try again');
    })
}


// delete methode
if (e.target.classList.contains('delete-me')) {
  
confirm('Are you sure delete?') 
    axios.post("/delete-item",{id:e.target.getAttribute('data-id')}).then(function () {
        e.target.parentElement.parentElement.remove()
    }).catch(function () {
        console.log('error,please try again');
    })
}
})

