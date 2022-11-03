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
//helper functions
function premissionPrint(model) {
    switch (model) {
        case 'loop':
            return new Promise(resolve => {
                setInterval(() => {
                    resolve(true);
                }, 20);
            });
        case 'once':
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(true);
                }, 5000);
            });
        default:
            return new Promise(resolve => {
                setInterval(() => {
                    resolve(true);
                }, 20);
            });
    }
}
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
        // console.log(`${this._type}:${this._id} is silent`);
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
            for (let j = 0; j < this._totalAnimals.length; j++) {
                yield premissionPrint('loop');
                let imageAnimal = document.createElement("img");
                let animalElement = document.createElement("div");
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
            // console.log(this._totalAnimals[randomNumber]);
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
            if (!this._totalAnimals[randomNumber]._fooding) {
                this._totalAnimals[randomNumber].changePosition = { bool: true, fieldName: '_fooding' };
                // console.log(this._totalAnimals[randomNumber]);
                this._totalAnimals[randomNumber].displayFood();
            }
        }, 2000);
    }
    fooder(event) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
            const targetElement = event.target;
            let targetId = Number((_a = targetElement === null || targetElement === void 0 ? void 0 : targetElement.parentElement) === null || _a === void 0 ? void 0 : _a.id);
            // console.log(targetElement?.parentElement?.children)
            let animalTarget = this._totalAnimals.find(animal => animal._id == targetId);
            if (animalTarget === null || animalTarget === void 0 ? void 0 : animalTarget._fooding) {
                console.log((_c = (_b = document.querySelector(`.food-tx-${targetId}`)) === null || _b === void 0 ? void 0 : _b.firstElementChild) === null || _c === void 0 ? void 0 : _c.src);
                console.log(animalTarget);
                console.log(document.querySelector(`.food-tx-${targetId}`));
                console.log(event.target.parentElement);
                (_d = document.querySelector(`.food-tx-${targetId}`)) === null || _d === void 0 ? void 0 : _d.firstElementChild.src = 'assets/timer.gif';
            }
            yield premissionPrint('once');
            (_e = document.querySelector(`.food-tx-${targetId}`)) === null || _e === void 0 ? void 0 : _e.remove();
        });
    }
}
window.addEventListener("DOMContentLoaded", () => {
    let generalAnimals = new AnimalGenertor();
    generalAnimals.generateAnimal();
    generalAnimals.printAnimals();
    generalAnimals.soundChanging();
    generalAnimals.foodChanging();
    farmElement === null || farmElement === void 0 ? void 0 : farmElement.addEventListener('click', (event) => {
        generalAnimals.fooder(event);
    });
});
