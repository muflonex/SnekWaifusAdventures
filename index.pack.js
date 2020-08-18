/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var grid = document.querySelector('.grid');
var startButton = document.getElementById('start');
var scoreDisplay = document.getElementById('score');
var message = document.querySelector('.message');

var squares = [];
var currentSnake = [2, 1, 0];
var direction = 1;
var width = 10;
var appleIndex = 0;
var score = 0;
var intervalTime = 1000;
var speed = 0.9;
var timerId = 0;

function createGrid() {
    //create 100 of these elements with a for loop
    for (var i = 0; i < width * width; i++) {
        //create element
        var square = document.createElement('div');
        //add styling to the element
        square.classList.add('square');
        //put the element into our grid
        grid.appendChild(square);
        //push it into a new squares array    
        squares.push(square);
    }
}
createGrid();

function startGame() {
    //remove the snake
    currentSnake.forEach(function (index) {
        return squares[index].classList.remove('snake', 'head');
    });
    //remove the apple
    squares[appleIndex].classList.remove('apple');
    clearInterval(timerId);
    currentSnake = [2, 1, 0];
    score = 0;
    message.textContent = '';
    //re add new score to browser
    scoreDisplay.textContent = score;
    direction = 1;
    intervalTime = 1000;
    generateApple();
    //readd the class of snake to our new currentSnake
    currentSnake.forEach(function (index) {
        return squares[index].classList.add('snake');
    });
    squares[currentSnake[0]].classList.add('head');
    timerId = setInterval(move, intervalTime);
}

function move() {
    if (wallWasHit() || snakeWasHit()) return clearInterval(timerId);

    //remove last element from our currentSnake array
    var tail = currentSnake.pop();

    //remove styling from last element
    squares[tail].classList.remove('snake');
    //add square in direction we are heading
    currentSnake.unshift(currentSnake[0] + direction);
    //add styling so we can see it

    //deal with snake head gets apple
    if (squares[currentSnake[0]].classList.contains('apple')) {
        //remove the class of apple
        squares[currentSnake[0]].classList.remove('apple');
        //grow our snake by adding class of snake to it
        squares[tail].classList.add('snake');
        //grow our snake array
        currentSnake.push(tail);
        //generate new apple
        generateApple();
        //add one to the score
        score++;
        //display our score
        scoreDisplay.textContent = score;
        //speed up our snake
        clearInterval(timerId);
        intervalTime = intervalTime * speed;
        timerId = setInterval(move, intervalTime);
    }
    squares[currentSnake[1]].classList.remove('head');
    squares[currentSnake[0]].classList.add('snake', 'head');
}

function wallWasHit() {
    var snakeHead = currentSnake[0];
    var hitTop = direction === -width && snakeHead + direction < 0;
    var hitBottom = direction === width && snakeHead + direction > width * width;
    var hitLeft = direction === -1 && snakeHead % width === 0;
    var hitRight = direction === 1 && snakeHead % width === width - 1;

    var result = hitTop || hitBottom || hitLeft || hitRight;
    if (result) message.textContent = 'Snek waifu crashed into a wall.';
    return result;
}
function snakeWasHit() {
    //Walls need to be checked first because of out of bounds indices
    var snakeHead = currentSnake[0];
    var snakeHit = squares[snakeHead + direction].classList.contains('snake');
    if (snakeHit) message.textContent = 'Snek waifu crashed into herself.';
    return snakeHit;
}

function generateApple() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains('snake'));
    squares[appleIndex].classList.add('apple');
}

function control(e) {
    direction = {
        37: -1, // left
        38: -width, // up
        39: 1, // right
        40: +width // down
    }[e.keyCode];
}
document.addEventListener('keyup', control);
startButton.addEventListener('click', startGame);

/***/ })
/******/ ]);