const start_btn = document.querySelector('.start-btn')
const screen_2 = document.querySelector('.screen-2')
const screen_3 = document.querySelector('.screen-3')
const insect_container = document.querySelector('.images-container')
const timer_el = document.querySelector('.time-container')
const score_el = document.querySelector('.score-container')

const character_set = {
    'Spider' : 'http://pngimg.com/uploads/spider/spider_PNG12.png',
    'Fly' : 'http://pngimg.com/uploads/fly/fly_PNG3946.png',
    'Mosquito' : 'http://pngimg.com/uploads/mosquito/mosquito_PNG18175.png',
    'Cockroach' : 'http://pngimg.com/uploads/roach/roach_PNG12163.png'
}

let selected_insect

start_btn.addEventListener('click', () => screen_2.scrollIntoView({behavior: "smooth"}))

insect_container.addEventListener('click', (e) => {
   if (e.target.classList.contains('name') || e.target.classList.contains('insect-wrapper') || e.target.classList.contains('insect-img')) {
    screen_3.scrollIntoView({behavior: "smooth"})
    if (e.target.classList.contains('name')) {
        selected_insect = e.target.innerHTML
        console.log(selected_insect)
    }
    else if(e.target.classList.contains('insect-img')) {
        selected_insect = e.target.parentNode.firstElementChild.innerHTML
        console.log(selected_insect)
    }
    else {
        selected_insect = e.target.firstElementChild.innerHTML
        console.log(selected_insect)
    }

    initializeGame(selected_insect)
   }
})

function initializeGame(character) {

    // TODO
    // load the selected character
    // reset the timer
    // reset the score

    // spawn random no of characters
    // register clicks
    // keep score count
    // if score equals 20, alert the user about the nature of this game

    let howMany = 1

    // LOADING THE SELECTED CHARACTER
    spawnCharacter(howMany, character)

    // RESET THE COUNTER
    let minutes, seconds, duration = 0
    setInterval(() => {
        timer_el.querySelector('span').innerHTML = `${minutes} : ${seconds}`
        duration += 1
        minutes = Math.floor(duration / 60);
        seconds = duration - minutes * 60;
    }, 1000)

    //RESET THE SCORE
    score_el.querySelector('span').innerHTML = howMany

    
}

function spawnCharacter(howMany, character) {
    for (let i = 0; i < howMany; i++) {
        let character_el = document.createElement('img')
        character_el.classList.add('character-img')
        character_el.src = character_set[character]
        styleRandomly(character_el)
        screen_3.appendChild(character_el)
    }
    //SPAWN CHARACTER RANDOMLY ON CLICK
    let characters_spawned = screen_3.querySelectorAll('.character-img')
    characters_spawned.forEach(char => {
            console.log(char)

            // REMOVE THE CHARACTER FROM DOM
            char.addEventListener('click', () => {
                howMany += 1
                char.remove()
                // UPDATE SCORE ELEMENT
                score_el.querySelector('span').innerHTML = howMany
                spawnCharacter(howMany, character)
        })
    })
}

function styleRandomly(el) {
    let randomNum = Math.random() * -720 + 360
    el.style.transform = `rotate(${randomNum}deg) scale(${(Math.random()+.3)})`
    el.style.left = `${Math.random()*700}px`
    el.style.top = `${Math.random()*700}px`
}