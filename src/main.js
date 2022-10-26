"use strict";
class Animal {
    constructor(type, id, src) {
        this._sounding = false;
        this._type = type;
        this._src = src;
        this._soundText = 'not sound';
        this._id = id;
        switch (type) {
            case 'sheep':
                this._soundText = 'baaa...';
                break;
            case 'cow':
                this._soundText = 'mooooo...';
                break;
            case 'dog':
                this._soundText = 'hoppp...';
                break;
        }
    }
    set sounder(arg) {
        this._sounding = arg;
    }
}
class Sheep extends Animal {
    constructor(id) {
        super('sheep', id, 'assets/sheep.png');
    }
}
class Cow extends Animal {
    constructor(id) {
        super('cow', id, 'assets/cow.png');
    }
}
class Dog extends Animal {
    constructor(id) {
        super('dog', id, 'assets/dog.png');
    }
}
let animals = [];
function animalGenerator(animals) {
    for (let i = 0; i < 128; i++) {
        let rand = Math.random();
        if (rand === 0 || rand <= 0.5) {
            animals.push(new Sheep(i));
        }
        else if (rand > 0.5 && rand < 0.8) {
            animals.push(new Cow(i));
        }
        else if (rand >= 0.8) {
            animals.push(new Dog(i));
        }
    }
    console.log(animals);
}
let farmElement = document.getElementById('farm');
function addAnimalsToFarm(animalsList) {
    console.log(farmElement);
    for (let j = 0; j < animalsList.length; j++) {
        setTimeout(() => {
            let imageAnimal = document.createElement("img");
            let animalElement = document.createElement("div");
            animalElement.setAttribute('id', `${animalsList[j]._id}`);
            imageAnimal.setAttribute('src', `${animalsList[j]._src}`);
            imageAnimal.setAttribute('class', 'animal-el');
            animalElement.appendChild(imageAnimal);
            if (farmElement) {
                farmElement.appendChild(animalElement);
            }
        }, j * 20);
    }
}
function randomSoundingChanger(animalsList) {
    setInterval(() => {
        let randomNumber = Math.floor(Math.random() * animalsList.length - 1);
        animalsList[randomNumber].sounder = true;
        console.log(animalsList[randomNumber]);
        soundElementAppender(animalsList[randomNumber]);
        setTimeout(() => {
            animalsList[randomNumber].sounder = false;
            soundElementDeleter(animalsList[randomNumber]);
        }, 12000);  }, 1200);
}
function soundElementAppender(animalTarget) {
    if (animalTarget._sounding) {
        let targetElement = document.getElementById(`${animalTarget._id}`);
        let soundElement = document.createElement('div');
        soundElement.setAttribute('class', `sound-tx-${animalTarget._id}`);
        soundElement.innerText = animalTarget._soundText;
        targetElement.appendChild(soundElement);
    }
}
function soundElementDeleter(animalTarget) {
    let currentSoundElement = document.querySelector(`.sound-tx-${animalTarget._id}`);
    currentSoundElement.remove();
}
window.addEventListener("DOMContentLoaded", () => {
    animalGenerator(animals);
    addAnimalsToFarm(animals);
    randomSoundingChanger(animals);
});
