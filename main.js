import { cars } from "./cars/list.js" // импорт массива с машинами, чтобы не засирать этот файл

const list = document.querySelector('body div.list')
loadCars()
checkForAnim()

// загрузка машин из массива, добавление на страницу
function loadCars(){
    for (let car of cars){
        if (car.Name === document.title) continue
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
// добавление возможности кликнуть по карточке
function addClickableItems(i){
    for (let item of i){
        item.onclick = () => {
            // интересно я тут придумал, наверное
            // из названия кликнутой карточки вырывается название корыта
            // это название в последствии будет использовано на следующей странице
            // и по этому названию избираются данные машины
            const carName = item.textContent.split('$', 100)[0]
            localStorage.setItem('carToLoad', carName)
            window.open('car.html', '_self')
        }
    }
}


const sort = document.querySelector('body button.sort')

// добавление функции сортировки кнопке
// сначала сортируется сам массив, потом очищается список на странице, и он прогружается снова, уже отсортированный
// можно чередовать, в зависимости от надписи на кнопке
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

// халявный балл. при первом запуске сверху выводится приветствие пользователя
// инфа о том, что юзер уже был на сайте, записывается в локальное хранилище
// больше одного раза надпись не появится. ну, если, конечно же, не удалить 'alreadyBeen' из хранилища
function checkForAnim(){
    const salam = document.getElementById('salam')
    if (localStorage.getItem('alreadyBeen')) return
    else { salam.style.visibility = 'visible'; salam.style.animation = 'anim 10s forwards'; localStorage.setItem('alreadyBeen', true) }
}