export class Question{
    static create(question){
        return fetch('https://podcast-app-db604-default-rtdb.firebaseio.com/questions.json', {
            method: 'POST',
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(response => {
            question.id = response.name
            return question
        })
        .then(addToLocaleStorage)
        .then(Question.renderList)
    }
    static fetch(token){
        if(!token){
            return Promise.resolve(`<p class="error">У вас нет токена</p>`)
        }
        return fetch(`https://podcast-app-db604-default-rtdb.firebaseio.com/questions.json?auth=${token}`)
        .then(response => response.json())
        .then(response => {
            if(response && response.error){
                return `<p class="error">${response.error}</p>`
            }
            return response ? Object.keys(response).map(key => ({
                ...response[key],
                id: key
            })): []
        })
    }
    static renderList(){
        const questions = getQuestionsFromLocalStorage()

        const html = questions.length
        ? questions.map(toCard).join('')
        : `<div class="mui--text-headline">Вы пока ничего не спрашивали</div>`
    
        const list = document.getElementById('list')
        list.innerHTML = html
    }

    static listToHTML(questions){
        return questions.length
        ? `<ol>${questions.map(questions => `<li>${questions.text}</li>`).join('')}</ol>`
        : `<p>Вопросов пока нет</p>`
    }
}

function addToLocaleStorage(question){

    const all = getQuestionsFromLocalStorage()
    all.push(question)
    localStorage.setItem('questions', JSON.stringify(all))
} 

function getQuestionsFromLocalStorage(){
    return JSON.parse(localStorage.getItem('questions') || '[]')
}

function toCard(question){
    return `
    <div class="mui--text-black-54">
    ${new Date(question.date).toLocaleDateString()}
    ${new Date(question.date).toLocaleTimeString()}
    </div>
    <div>${question.text}</div>
    <br>
    `
}