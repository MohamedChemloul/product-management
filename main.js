let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let count = document.getElementById("count");
let total = document.getElementById("total");
let category = document.getElementById("category");
let create = document.getElementById("create");
let tbody = document.getElementById('tbody');
let search = document.getElementById('search')


let mood = 'create';
let tmp;


// get Total

function getTotal() {
  if (price.value != "") {
    total.innerHTML =
      +price.value + +taxes.value + +ads.value - +discount.value;
    total.style.background = "green";
  } else {
    total.innerHTML = "";
    total.style.background = "red";
  }
}

// Create Product
let dataPro;

if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product)
} else {
  dataPro = [];
}

create.onclick = function () {
    
  let newPro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value || 0,
    ads: ads.value || 0,
    discount: discount.value || 0,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };

    if(title.value != '' && price.value != '' && category.value != '' && count.value < 100){
        
        title.style.border = 'none';
        count.placeholder = 'Count'
    if(mood === 'create'){

    if(newPro.count > 1 ){

        for(let i = 0 ; i < newPro.count ; i++){
        dataPro.push(newPro);
       

        } 

        } else{
        dataPro.push(newPro);
        }

    } else{
        dataPro[tmp] = newPro;

        mood = 'create';
        create.innerHTML = 'Create'
        count.style.display = 'block'


    }
    clearData();
    } 
    else if(title.value === '' || price.value === '' || category.value === '' || count.value >= 100){
        let fields = [title, price, category, count];

    let invalidFields = fields.filter(f => f.value === '' || (f === count && count.value >= 100));

    invalidFields[0]?.focus();

    if (count.value >= 100) {
    count.value = '';
    count.placeholder = 'Max is 99';
}
} 
    
  // Save In LocalStorage
    localStorage.setItem("product",JSON.stringify(dataPro));


    showData();

    
}

// Save In LocalStorage

// Clear Inputs
function clearData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    total.style.background = 'red';
    count.value = "";
    category.value = "";
}

// Read

function showData(){
    let table = '';

    for(let i = 0; i < dataPro.length ;i++){
        table += `
        <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button style= "background: #22C55E   "onclick ="updateData(${i})" >Update</button></td>
                    <td><button style= "background: #EF4444 ; color : #ddd" onclick = "deleteData(${i})">Delete</button></td>
        </tr>
        `;
        
    
        
    }
    tbody.innerHTML = table; 

    let deleteAll = document.getElementById('deleteAll')
    if(dataPro.length > 0){

        deleteAll.style.display = 'flex'
        deleteAll.innerHTML = `
        <button style= "background: #c21010 ; color : #ddd " onclick = "deleteAll()">Delete All (${dataPro.length})</button> 
        
    `
        
    } else{
        deleteAll.innerHTML = '';
    }

} 

showData()

// Delete

function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData()
}

function deleteAll(){
    localStorage.clear();
    dataPro.splice(0)

    showData()
}

// Count


// Update


function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    ads.value = dataPro[i].ads;
    taxes.value = dataPro[i].taxes;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;
    create.innerHTML = 'Update';
    total.style.backgroundColor = 'red';
    count.style.display = 'none'
    mood = 'update';
    tmp = i;
    getTotal();
    scroll({
        top:0,
        behavior : "smooth"
    })
    
}

// Search

let searchMood = 'title';
console.log(dataPro.length);


function getSearchMood(id){

    if(id === 'title'){
        searchMood = 'title';
        
    } else{
        searchMood = 'category';
    }
    search.placeholder = `Search By ${id}`;
    search.focus();
    search.value = '';
    showData();
}


function searchData(value){
    let table = '';
    for(let i = 0 ; i < dataPro.length ; i++ ){
    if(searchMood === 'title'){

            if(dataPro[i].title.toLowerCase().includes(value.toLowerCase())){
                table += `
                        <tr>
                            <td>${i}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].discount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button onclick ="updateData(${i})" >Update</button></td>
                            <td><button style= "background: #c21010 ; color : #ddd" onclick = "deleteData(${i})">Delete</button></td>
                        </tr>
                        `;
            } 
        
    } else {
            if(dataPro[i].category.toLowerCase().includes(value.toLowerCase())){
                table += `
                        <tr>
                            <td>${i}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].discount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button onclick ="updateData(${i})" >Update</button></td>
                            <td><button style= "background: #c21010 ; color : #ddd" onclick = "deleteData(${i})">Delete</button></td>
                        </tr>
                        `;
            } 
    } }
    tbody.innerHTML = table; 
}








// Clean Data

