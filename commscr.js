// создаётся пустой массив; после чего в него либо парсится инфа из локального хранилища
// либо добавляется дефолтный объект (в случае, если локальное хранилище пусто)
let comments = []
comments = JSON.parse(localStorage.getItem('comments')) || [{Name : 'Фаггио', Comment : 'Я заднеприводный'}]

const cont = document.querySelector('body div.cont')

// загрузка комментариев
function load(){
    for (let comment of comments){
        const com = document.createElement('div'),
            name = document.createElement('p'),
            text = document.createElement('p')
    
    
        com.classList.add('comment')
        name.classList.add('name')
    
        name.textContent = comment.Name
        text.textContent = comment.Comment
    
        cont.append(com)
        com.append(name)
        com.append(text)
    }
}
load()

// добавление комментария с проверкой на дебила
// сначала коммент добавляется в тот самый массив
// потом массив отправляется в локальное хранилище
// и после этого чистятся поля, обновляются комментарии
document.querySelector('div.leave-comment button.sort').addEventListener('click', () => {
    let name = document.querySelector('div.leave-comment input#name'),
        comment = document.querySelector('div.leave-comment textarea#com')

    if (name.value === '' || comment.value === '') return alert('хуй')

    comments.push({Name : name.value, Comment : comment.value})
    localStorage.setItem('comments', JSON.stringify(comments))

    name.value = ''; comment.value = ''
    cont.innerHTML = ''
    load()
})