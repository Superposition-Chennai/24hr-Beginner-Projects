// Button selectors

const startBtn = document.getElementById('start-btn');
const exitBtn = document.getElementById('exit-btn');
const toggler = document.querySelectorAll('.toggler');

// Containers, texts and inputs

const startContainer = document.querySelector('.start-container');
const formContainer = document.querySelector('.form-container');
const todoList = document.querySelector('.todo-list');
const todoInput = document.querySelector('.todo-input');
const scoreText = document.getElementById('score-start');
const levelText = document.getElementById('level-start');
const formField = document.getElementById('form');
const endGame = document.getElementById('you-won');

// Sounds

const clickSound = document.getElementById('click-sound');
const bonusSound = document.getElementById('bonus-sound');
const minusSound = document.getElementById('minus-sound');
const winSound = document.getElementById('win-sound');

// Score and level variables (to store the text)

let score = 0;

scoreText.innerHTML = score;

let level = 0;

levelText.innerHTML = level;

// Local Storage

let darkMode = localStorage.getItem('darkMode');
let itemsArray = localStorage.getItem('items')
  ? JSON.parse(localStorage.getItem('items'))
  : [];

localStorage.setItem('items', JSON.stringify(itemsArray));
const data = JSON.parse(localStorage.getItem('items'));

// Event listeners

// Start button that makes the form appear

startBtn.addEventListener('click', function() {
    startContainer.classList.add('none');
    formContainer.classList.add('block');
    clickSound.play();
    
});

// Exit button to return to the start page

exitBtn.addEventListener('click', function() {
    formContainer.classList.remove('block');
    startContainer.classList.remove('none');
})


// Add new to do

formField.addEventListener('submit', function(event) {
    event.preventDefault();
  
    
    if(todoInput.value === '') {
        alert('Please write something!');
    } else {
        addTodo(todoInput.value);
        itemsArray.push(todoInput.value);
        localStorage.setItem('items', JSON.stringify(itemsArray));
    }
    
    // Clear input field
    todoInput.value = '';
});

// Mark new to do as completed

todoList.addEventListener('click', checkTodo);

// Remove it from the list

todoList.addEventListener('click', removeTodo);

// Functions

const addTodo = (text) => {

    // Create div and list element

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('list-item');

    const newTodo = document.createElement('li');
    newTodo.textContent = text;

    // Buttons to check and delete task. They are in a div so the flex container works properly

    const completedButton = document.createElement('i');
    completedButton.classList.add('fas', 'fa-check', 'icon-btn');

    const deleteButton = document.createElement('i');
    deleteButton.classList.add('fas', 'fa-trash-alt', 'icon-btn');
        
    todoDiv.appendChild(newTodo);
    todoDiv.appendChild(completedButton); 
    todoDiv.appendChild(deleteButton);
    todoList.appendChild(todoDiv);

}

function checkTodo(event) {

    const item = event.target;

    if(item.classList[1] === 'fa-check') {

        const todo = item.parentElement;
        
        todo.classList.toggle('checked-item');

        // Add five points if the new task is marked as complete, if not, rest 5 points

        if(todo.classList.contains('checked-item')) { 
            score += 5;
            scoreText.innerHTML = score;
            bonusSound.currentTime = 0;
            bonusSound.play();
            
        } else {
            score -= 5;
            scoreText.innerHTML = score;
            minusSound.currentTime = 0;
            minusSound.play();
        };
    
        // Increase level every 10 points if a task is marked as completed, if the task is no longer marked as completed then decrease level
    
        if(todo.classList.contains('checked-item') && score === 10) {
            level++;
            levelText.innerHTML = level;
        } else if (!todo.classList.contains('checked-item') && score === 5) {
            --level;
            levelText.innerHTML = level;
        } else if (todo.classList.contains('checked-item') && score === 20) {
            level++;
            levelText.innerHTML = level;
        } else if(!todo.classList.contains('checked-item') && score === 15) {
            --level;
            levelText.innerHTML = level;
        } else if (todo.classList.contains('checked-item') && score === 30) {
            level++;
            levelText.innerHTML = level;
        } else if (!todo.classList.contains('checked-item') && score === 25) {
            --level;
            levelText.innerHTML = level;
        } else if (todo.classList.contains('checked-item') && score === 40) {
            level++;
            levelText.innerHTML = level;
        } else if (!todo.classList.contains('checked-item') && score === 35) {
            --level;
            levelText.innerHTML = level;
        } else if (todo.classList.contains('checked-item') && score === 50) {
            level++;
            levelText.innerHTML = level;
        } else if (!todo.classList.contains('checked-item') && score === 45) {
            --level;
            levelText.innerHTML = level;
        }

    }
    
    // When reached 50 points the input field disappears and the 'Congratulations' message appears

    if (score === 50) {
        winSound.play();
        formField.classList.add('none');
        endGame.classList.remove('none');

    } else if (score > 50) {
        formField.classList.add('none');
        endGame.classList.remove('none');

    } else if (score < 50) {
        formField.classList.remove('none');
        endGame.classList.add('none');

    }

}

function removeTodo(event) {
    
    const item = event.target;

    if(item.classList[1] === 'fa-trash-alt') {
        const todo = item.parentElement;
        
        removeLocalTodo(todo);
        todo.remove();


        if (todo.classList.contains('checked-item')) {
            score -= 5;
            scoreText.innerHTML = score;
            minusSound.currentTime = 0;
            minusSound.play();
        }
    
        if (todo.classList.contains('checked-item') && score === 5) {
            --level;
            levelText.innerHTML = level;
        } else if (todo.classList.contains('checked-item') && score === 15) {
            --level;
            levelText.innerHTML = level;
        } else if (todo.classList.contains('checked-item') && score === 25) {
            --level;
            levelText.innerHTML = level;
        } else if (todo.classList.contains('checked-item') && score === 35) {
            --level;
            levelText.innerHTML = level;
        } else if (todo.classList.contains('checked-item') && score === 45) {
            --level;
            levelText.innerHTML = level;
        }
    }
}

// Remove to do from local storage

function removeLocalTodo (todo) {
    const index = todo.children[0].innerText;
    itemsArray.splice(itemsArray.indexOf(index), 1);
    localStorage.setItem('items', JSON.stringify(itemsArray));

}

// Add to dos every time the page loads

data.forEach((item) => {
    addTodo(item)
})

// Dark mode functionality

const enableDarkMode = () => {
    document.body.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'enabled');
}

const disableDarkMode = () => {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', null);
}

if (darkMode === 'enabled') {
    enableDarkMode();
}

// Dark mode functionality to be turned on automatically if the time is night (above 7:00 pm) 
// But this is only for first visit , the time of his visit decides the darkmode enability. For next visits , the value in localStorage would decide the darkmode enability.

// store frequency_of_visit and last_visit_time ,

let user_visited_freq = localStorage.getItem('user_visited_freq');

const _date = new Date();
let cur_time = Math.ceil(_date.getTime()/1000);

if (user_visited_freq === null)   
{
	// first time user
	
	localStorage.setItem('user_visited_freq' ,1);
	localStorage.setItem('last_visit_time' ,cur_time);
	
	//check for night time -> dark sky 
	
	if (_date.getHours()>=19 || _date.getHours()<=5)
	{
		console.log("Automatic Dark Mode");
		enableDarkMode();		
	}
	
}else{
	
	// increment the number of visits !!!
	// but increment needs to be done only when the user visits the webpage after a long time span
	
	var time_span = 5;	// 5 minutes
	
	let last_visit_time = parseInt(localStorage.getItem('last_visit_time'));
	
	if ((cur_time - last_visit_time) >= time_span * 60)
	{
		user_visited_freq = parseInt(user_visited_freq) + 1;    // increment visit frequency
		
		localStorage.setItem('user_visited_freq',user_visited_freq);
		localStorage.setItem('last_visit_time' ,cur_time);
	}
	else{
		console.log("You have just visited now! so no increment in user_visited_freq !",);
	}
}

// for user visiting every 100 times , give a appreciation!

if(user_visited_freq%100 == 0 && user_visited_freq>0)
{
	alert("great ! keep going until you become a star");	
}


toggler.forEach(tog => {
    tog.addEventListener('click', () => {
        darkMode = localStorage.getItem('darkMode');
        if (darkMode !== 'enabled') {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    })
    
    
})