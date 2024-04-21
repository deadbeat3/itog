import { cars } from "./cars/list.js"

const list = document.querySelector('body div.list')
loadCars()
checkForAnim()

function loadCars(){
    for (let car of cars){
        const item = document.createElement('div'),
            name = car.Name,
            price = car.Price,
            image = car.Image
    
        const nameLb = document.createElement('p'),
            priceLb = document.createElement('p'),
            icon = document.createElement('img')
    
        nameLb.textContent = name
        priceLb.textContent = '$' + price
        icon.src = image
        
        item.classList.add('item')
        nameLb.classList.add('label-name')
        priceLb.classList.add('label-price')
        list.append(item)
        
        item.append(icon)
        item.append(nameLb)
        item.append(priceLb)
    }
    const items = document.querySelectorAll('.item')
    addClickableItems(items)
}
function addClickableItems(i){
    for (let item of i){
        item.onclick = () => {
            const carName = item.textContent.split('$', 100)[0]
            localStorage.setItem('carToLoad', carName)
            window.open('car.html', '_self')
        }
    }
}

const sort = document.querySelector('body button.sort')
sort.addEventListener('click', function(){
    if (sort.textContent == 'Сортировать по цене --' || sort.textContent == 'Сортировать по цене ∨'){
        sort.textContent = 'Сортировать по цене ∧'
        cars.sort((a,b) => a.Price - b.Price)
        list.innerHTML = ''
        loadCars()
    }
    else{
        sort.textContent = 'Сортировать по цене ∨'
        cars.sort((a,b) => b.Price - a.Price)
        list.innerHTML = ''
        loadCars()
    }
})

function checkForAnim(){
    const salam = document.getElementById('salam')
    if (localStorage.getItem('alreadyBeen')) return
    else { salam.style.visibility = 'visible'; salam.style.animation = 'anim 10s forwards'; localStorage.setItem('alreadyBeen', true) }
}