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
    constructor(type, id, src) {
        this._sounding = false;
        this._type = type;
        this._src = src;
        this._soundText = 'not sound';
        this._id = id;
    }
    set sounder(arg) {
        this._sounding = arg;
    }
    silent(animalTarget) {
        let currentSoundElement = document.querySelector(`.sound-tx-${animalTarget._id}`);
        currentSoundElement != null && currentSoundElement.remove();
        //log
        console.log(`${this._type}:${this._id} is silent`);
    }
    displaySound(animalTarget) {
        console.log('display sound');
    }
}
//extended classes
class Sheep extends Animal {
    constructor(id) {
        super('sheep', id, 'assets/sheep.png');
        this._soundText = "Baaaaa...";
    }
}
class Cow extends Animal {
    constructor(id) {
        super('cow', id, 'assets/cow.png');
        this._soundText = "Maaaaa...";
    }
}
class Dog extends Animal {
    constructor(id) {
        super('dog', id, 'assets/dog.png');
        this._soundText = "Hopppp...";
    }
}
function printAnimal() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve;
            }, 2000);
        });
    });
}
//genearating animals
class AnimalGenertor {
    constructor() {
        this._totalAnimals = [];
    }
    ;
    generateAnimal() {
        for (let i = 0; i < 128; i++) {
            let rand = Math.random();
            if (rand === 0 || rand <= 0.5) {
                this._totalAnimals.push(new Sheep(i));
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
        for (let j = 0; j < this._totalAnimals.length; j++) {
            setTimeout(() => {
                let imageAnimal = document.createElement("img");
                let animalElement = document.createElement("div");
                animalElement.setAttribute('id', `${this._totalAnimals[j]._id}`);
                imageAnimal.setAttribute('src', `${this._totalAnimals[j]._src}`);
                imageAnimal.setAttribute('class', 'animal-el');
                animalElement.appendChild(imageAnimal);
                if (farmElement) {
                    farmElement.appendChild(animalElement);
                }
            }, j * 20);
        }
    }
    soundChanging() {
        setInterval(() => {
            let randomNumber = Math.floor(Math.random() * this._totalAnimals.length - 1);
            this._totalAnimals[randomNumber].sounder = true;
            console.log(this._totalAnimals[randomNumber]);
            this._totalAnimals[randomNumber].displaySound(this._totalAnimals[randomNumber]);
            setTimeout(() => {
                this._totalAnimals[randomNumber].sounder = false;
                this._totalAnimals[randomNumber].silent(this._totalAnimals[randomNumber]);
            }, 12000);
        }, 1200);
    }
}
window.addEventListener("DOMContentLoaded", () => {
    let generalAnimals = new AnimalGenertor();
    generalAnimals.generateAnimal();
    generalAnimals.totalAnimalGS;
    generalAnimals.printAnimals();
    generalAnimals.soundChanging();
});
