"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//the farm :)
var farmElement = document.getElementById('farm');
//base //parent class
var Animal = /** @class */ (function () {
    function Animal(type, id, src) {
        this._sounding = false;
        this._type = type;
        this._src = src;
        this._soundText = 'not sound';
        this._id = id;
    }
    Object.defineProperty(Animal.prototype, "sounder", {
        set: function (arg) {
            this._sounding = arg;
        },
        enumerable: true,
        configurable: true
    });
    Animal.prototype.silent = function (animalTarget) {
        console.log('silent');
    };
    Animal.prototype.displaySound = function (animalTarget) {
        console.log('display sound');
    };
    return Animal;
}());
//extended classes
var Sheep = /** @class */ (function (_super) {
    __extends(Sheep, _super);
    function Sheep(id) {
        var _this = _super.call(this, 'sheep', id, 'assets/sheep.png') || this;
        _this._soundText = "Baaaaa...";
        return _this;
    }
    Sheep.prototype.silent = function (animalTarget) {
        var currentSoundElement = document.querySelector(".sound-tx-" + animalTarget._id);
        currentSoundElement != null && currentSoundElement.remove();
        //log
        console.log(this._type + ":" + this._id + " is silent");
    };
    Sheep.prototype.displaySound = function (animalTarget) {
        if (animalTarget._sounding) {
            var targetElement = document.getElementById("" + animalTarget._id);
            var soundElement = document.createElement('div');
            soundElement.setAttribute('class', "sound-tx-" + animalTarget._id);
            soundElement.innerText = animalTarget._soundText;
            if (targetElement != null) {
                targetElement.appendChild(soundElement);
            }
        }
    };
    return Sheep;
}(Animal));
var Cow = /** @class */ (function (_super) {
    __extends(Cow, _super);
    function Cow(id) {
        var _this = _super.call(this, 'cow', id, 'assets/cow.png') || this;
        _this._soundText = "Maaaaa...";
        return _this;
    }
    Cow.prototype.silent = function (animalTarget) {
        var currentSoundElement = document.querySelector(".sound-tx-" + animalTarget._id);
        currentSoundElement != null && currentSoundElement.remove();
        console.log(this._type + ":" + this._id + " is silent CCC");
    };
    Cow.prototype.displaySound = function (animalTarget) {
        if (animalTarget._sounding) {
            var targetElement = document.getElementById("" + animalTarget._id);
            var soundElement = document.createElement('div');
            soundElement.setAttribute('class', "sound-tx-" + animalTarget._id);
            soundElement.innerText = animalTarget._soundText;
            if (targetElement != null) {
                targetElement.appendChild(soundElement);
            }
        }
    };
    return Cow;
}(Animal));
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog(id) {
        var _this = _super.call(this, 'dog', id, 'assets/dog.png') || this;
        _this._soundText = "Hopppp...";
        return _this;
    }
    Dog.prototype.silent = function (animalTarget) {
        var currentSoundElement = document.querySelector(".sound-tx-" + animalTarget._id);
        currentSoundElement != null && currentSoundElement.remove();
        //log
        console.log(this._type + ":" + this._id + " is silent");
    };
    Dog.prototype.displaySound = function (animalTarget) {
        if (animalTarget._sounding) {
            var targetElement = document.getElementById("" + animalTarget._id);
            var soundElement = document.createElement('div');
            soundElement.setAttribute('class', "sound-tx-" + animalTarget._id);
            soundElement.innerText = animalTarget._soundText;
            if (targetElement != null) {
                targetElement.appendChild(soundElement);
            }
        }
    };
    return Dog;
}(Animal));
//genearating animals
var AnimalGenertor = /** @class */ (function () {
    function AnimalGenertor() {
        this._totalAnimals = [];
    }
    ;
    AnimalGenertor.prototype.generateAnimal = function () {
        for (var i = 0; i < 128; i++) {
            var rand = Math.random();
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
    };
    ;
    Object.defineProperty(AnimalGenertor.prototype, "totalAnimalGS", {
        get: function () {
            return this._totalAnimals;
        },
        enumerable: true,
        configurable: true
    });
    AnimalGenertor.prototype.addAnimalsToFarm = function (animalsList) {
        var _loop_1 = function (j) {
            setTimeout(function () {
                var imageAnimal = document.createElement("img");
                var animalElement = document.createElement("div");
                animalElement.setAttribute('id', "" + animalsList[j]._id);
                imageAnimal.setAttribute('src', "" + animalsList[j]._src);
                imageAnimal.setAttribute('class', 'animal-el');
                animalElement.appendChild(imageAnimal);
                if (farmElement) {
                    farmElement.appendChild(animalElement);
                }
            }, j * 20);
        };
        for (var j = 0; j < animalsList.length; j++) {
            _loop_1(j);
        }
    };
    AnimalGenertor.prototype.soundChanging = function (animalsList) {
        setInterval(function () {
            var randomNumber = Math.floor(Math.random() * animalsList.length - 1);
            animalsList[randomNumber].sounder = true;
            console.log(animalsList[randomNumber]);
            animalsList[randomNumber].displaySound(animalsList[randomNumber]);
            setTimeout(function () {
                animalsList[randomNumber].sounder = false;
                animalsList[randomNumber].silent(animalsList[randomNumber]);
            }, 12000);
        }, 1200);
    };
    return AnimalGenertor;
}());
window.addEventListener("DOMContentLoaded", function () {
    var generalAnimals = new AnimalGenertor();
    var animals = generalAnimals.totalAnimalGS;
    generalAnimals.generateAnimal();
    generalAnimals.totalAnimalGS;
    generalAnimals.addAnimalsToFarm(animals);
    generalAnimals.soundChanging(animals);
});
