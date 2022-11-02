"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//the farm :)
let farmElement = document.getElementById('farm');
//base //parent class
class Animal {
    constructor(type, id, src, food) {
        this._sounding = false;
        this._fooding = false;
        this._type = type;
        this._src = src;
        this._soundText = 'not sound';
        this._id = id;
        this._food = food;
    }
    ;
    set changePosition(arg) {
        arg.fieldName === '_sounding' ? this._sounding = arg.bool : null;
        arg.fieldName === '_fooding' ? this._fooding = arg.bool : null;
    }
    ;
    silent(animalTarget) {
        let currentSoundElement = document.querySelector(`.sound-tx-${animalTarget._id}`);
        currentSoundElement != null && currentSoundElement.remove();
        //log
        console.log(`${this._type}:${this._id} is silent`);
    }
    ;
    displaySound() {
        if (this._sounding) {
            let targetElement = document.getElementById(`${this._id}`);
            let soundElement = document.createElement('div');
            soundElement.setAttribute('class', `sound-tx-${this._id}`);
            soundElement.innerText = this._soundText;
            if (targetElement !== null) {
                targetElement.appendChild(soundElement);
            }
        }
    }
    ;
    displayFood() {
        if (this._fooding) {
            let targetElement = document.getElementById(`${this._id}`);
            let soundElement = document.createElement('div');
            soundElement.setAttribute('class', `food-tx-${this._id}`);
            soundElement.innerHTML = `<img src="${this._food}" />`;
            if (targetElement !== null) {
                targetElement.appendChild(soundElement);
            }
        }
    }
    ;
}
//extended classes
class Sheep extends Animal {
    constructor(id) {
        super('sheep', id, 'assets/sheep.png', 'assets/barg.jpg');
        this._soundText = "Baaaaa...";
        Sheep._sheepCount++;
    }
}
Sheep._sheepCount = 0;
;
class Cow extends Animal {
    constructor(id) {
        super('cow', id, 'assets/cow.png', 'assets/barg.jpg');
        this._soundText = "Maaaaa...";
    }
    ;
}
;
class Dog extends Animal {
    constructor(id) {
        super('dog', id, 'assets/dog.png', 'assets/dogFood.jpeg');
        this._soundText = "Hopppp...";
    }
    ;
}
;
//genearating animals
class AnimalGenertor {
    constructor() {
        this._totalAnimals = [];
    }
    ;
    generateAnimal() {
        for (let i = 0; i < 128; i++) {
            let rand = Math.random();
            if (rand === 0 || rand <= 0.5 && Sheep._sheepCount < 50) {
                this._totalAnimals.push(new Sheep(i));
                // console.log(Sheep._sheepCount)
            }
            else if (rand > 0.5 && rand < 0.8) {
                this._totalAnimals.push(new Cow(i));
            }
            else if (rand >= 0.8) {
                this._totalAnimals.push(new Dog(i));
            }
        }
    }
    ;
    get totalAnimalGS() {
        return this._totalAnimals;
    }
    printAnimals() {
        return __awaiter(this, void 0, void 0, function* () {
            function premissionPrint() {
                return new Promise(resolve => {
                    setInterval(() => {
                        resolve(true);
                    }, 20);
                });
            }
            for (let j = 0; j < this._totalAnimals.length; j++) {
                yield premissionPrint();
                let imageAnimal = document.createElement("img");
                let animalElement = document.createElement("div");
                animalElement.setAttribute('id', `${this._totalAnimals[j]._id}`);
                imageAnimal.setAttribute('src', `${this._totalAnimals[j]._src}`);
                animalElement.setAttribute('id', `${this._totalAnimals[j]._id}`);
                imageAnimal.setAttribute('src', `${this._totalAnimals[j]._src}`);
                imageAnimal.setAttribute('class', 'animal-el');
                animalElement.appendChild(imageAnimal);
                if (farmElement) {
                    farmElement.appendChild(animalElement);
                }
            }
        });
    }
    soundChanging() {
        setInterval(() => {
            let randomNumber = Math.floor(Math.random() * this._totalAnimals.length - 1);
            this._totalAnimals[randomNumber].changePosition = { bool: true, fieldName: '_sounding' };
            console.log(this._totalAnimals[randomNumber]);
            this._totalAnimals[randomNumber].displaySound();
            setTimeout(() => {
                this._totalAnimals[randomNumber].changePosition = { bool: false, fieldName: '_sounding' };
                this._totalAnimals[randomNumber].silent(this._totalAnimals[randomNumber]);
            }, 12000);
        }, 1200);
    }
    foodChanging() {
        setInterval(() => {
            let randomNumber = Math.floor(Math.random() * this._totalAnimals.length - 1);
            this._totalAnimals[randomNumber].changePosition = { bool: true, fieldName: '_fooding' };
            console.log(this._totalAnimals[randomNumber]);
            this._totalAnimals[randomNumber].displayFood();
            setTimeout(() => {
                this._totalAnimals[randomNumber].changePosition = { bool: false, fieldName: '_fooding' };
                this._totalAnimals[randomNumber].silent(this._totalAnimals[randomNumber]);
            }, 18000);
        }, 2000);
    }
}
window.addEventListener("DOMContentLoaded", () => {
    let generalAnimals = new AnimalGenertor();
    generalAnimals.generateAnimal();
    generalAnimals.printAnimals();
    generalAnimals.soundChanging();
    generalAnimals.foodChanging();
});
