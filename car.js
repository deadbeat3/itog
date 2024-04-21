import { cars } from "./cars/list.js"

const colors = document.querySelectorAll('.circle'),
    checkBox = document.getElementById('col')

const carName = document.querySelector('.car-header'),
    carDesc = document.querySelector('.car-description'),
    maxsp = document.getElementById('max-speed'),
    accel = document.getElementById('acceleration'),
    brake = document.getElementById('braking'),
    handle = document.getElementById('handling'),
    btn = document.querySelector('.cont button'),
    cont = document.querySelector('body div.cont')

document.title = carName.textContent = localStorage.getItem('carToLoad')

const img1 = document.createElement('img'),
    img2 = document.createElement('img'),
    img3 = document.createElement('img')


const car = cars.filter(c => c.Name === carName.textContent)
carDesc.textContent = car[0].Description
maxsp.textContent += car[0].TopSpeed + ' / 5'
accel.textContent += car[0].Acceleration + ' / 5'
brake.textContent += car[0].Braking + ' / 5'
handle.textContent += car[0].Handling + ' / 5'
btn.textContent += ' ($' + car[0].Price + ')'
img1.src = car[0].Image1
img2.src = car[0].Image2
img3.src = car[0].Image3

if (car[0].Image1 != null) document.getElementById('images').append(img1)
if (car[0].Image2 != null) document.getElementById('images').append(img2)
if (car[0].Image3 != null) document.getElementById('images').append(img3)

const orderCar = () => {
    const color = document.querySelector('div.selected').id
    cont.innerHTML = ''
    const p = document.createElement('p')
    p.textContent = 'Ваш ' + color + ' ' + localStorage.getItem('carToLoad') +' будет доставлен в ближайшее время'
    p.classList.add('car-description')
    p.style.width = 'fit-content'
    p.style.margin = 'auto'
    p.style.fontSize = '30px'
    p.style.fontWeight = '600'

    cont.append(p)
    window.scrollTo(0,0)
}

checkBox.addEventListener('click', function(){
    btn.classList.remove('disabled')
    btn.addEventListener('click', orderCar)
})

for (let col of colors){
    col.onclick = function(){
        for (let c of colors){
            c.classList.remove('selected')
        }
        if (!checkBox.checked) checkBox.click()
        col.classList.toggle('selected')
    }
}
