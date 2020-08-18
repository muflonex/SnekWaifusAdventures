const grid = document.querySelector('.grid')
const startButton = document.getElementById('start')
const scoreDisplay = document.getElementById('score')
const message = document.querySelector('.message');

let squares = []
let currentSnake = [2,1,0]
let direction = 1
const width = 10
let appleIndex = 0
let score = 0
let intervalTime = 1000
let speed = 0.9
let timerId = 0

function createGrid() {
    //create 100 of these elements with a for loop
    for (let i=0; i < width*width; i++) {
        //create element
        const square = document.createElement('div')
        //add styling to the element
        square.classList.add('square')
        //put the element into our grid
        grid.appendChild(square)
        //push it into a new squares array    
        squares.push(square)
    }
}
createGrid()

function startGame() {
    //remove the snake
    currentSnake.forEach(index => squares[index].classList.remove('snake', 'head'))
    //remove the apple
    squares[appleIndex].classList.remove('apple')
    clearInterval(timerId)
    currentSnake = [2,1,0]
    score = 0
    message.textContent = '';
    //re add new score to browser
    scoreDisplay.textContent = score
    direction = 1
    intervalTime = 1000
    generateApple()
    //readd the class of snake to our new currentSnake
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    squares[currentSnake[0]].classList.add('head');
    timerId = setInterval(move, intervalTime)
}

function move() {
    if ( wallWasHit() || snakeWasHit() ) 
        return clearInterval(timerId)
    
    //remove last element from our currentSnake array
    const tail = currentSnake.pop()
    
    //remove styling from last element
    squares[tail].classList.remove('snake')
    //add square in direction we are heading
    currentSnake.unshift(currentSnake[0] + direction)
    //add styling so we can see it
    
    //deal with snake head gets apple
    if (squares[currentSnake[0]].classList.contains('apple')) {
        //remove the class of apple
        squares[currentSnake[0]].classList.remove('apple')
        //grow our snake by adding class of snake to it
        squares[tail].classList.add('snake')
        //grow our snake array
        currentSnake.push(tail)
        //generate new apple
        generateApple()
        //add one to the score
        score++
        //display our score
        scoreDisplay.textContent = score
        //speed up our snake
        clearInterval(timerId)
        intervalTime = intervalTime * speed
        timerId = setInterval(move, intervalTime)
    }
    squares[currentSnake[1]].classList.remove('head');
    squares[currentSnake[0]].classList.add('snake', 'head');
}

function wallWasHit () {
    const snakeHead = currentSnake[0]
    const hitTop = direction === -width && snakeHead + direction < 0;
    const hitBottom = direction === width && snakeHead + direction > width * width;
    const hitLeft = direction === -1 && snakeHead % width === 0;
    const hitRight = direction === 1 && snakeHead % width === width - 1;
    
    const result = hitTop || hitBottom || hitLeft || hitRight
    if (result)
        message.textContent = 'Snek waifu crashed into a wall.'
    return result
}
function snakeWasHit() {
    //Walls need to be checked first because of out of bounds indices
    let snakeHead = currentSnake[0];
    const snakeHit = squares[snakeHead + direction].classList.contains('snake');
    if (snakeHit)
        message.textContent = 'Snek waifu crashed into herself.'
    return snakeHit;
}

function generateApple() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
} 

function control(e) {
    direction = {
        37: -1,     // left
        38: -width, // up
        39: 1,      // right
        40: +width  // down
    }[e.keyCode];
}
document.addEventListener('keyup', control)
startButton.addEventListener('click', startGame)