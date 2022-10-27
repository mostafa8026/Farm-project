//the farm :)
let farmElement:Element | null = document.getElementById('farm')

//base //parent class
class Animal {
    _type: string;
    _soundText: string;
    _sounding:boolean = false;
    _id:number;
    _src:string;

    constructor(type: string,id:number,src:string) {
        this._type = type;
        this._src = src;
        this._soundText = 'not sound';
        this._id = id;
    }
    set sounder(arg:boolean) {
        this._sounding = arg;
    }
    silent(animalTarget:Animal):void {
        console.log('silent')
    }
    displaySound(animalTarget:Animal):void {
        console.log('display sound')
    }
}
//extended classes
class Sheep extends Animal{
    constructor(id:number) {
        super('sheep',id,'assets/sheep.png');
        this._soundText = "Baaaaa...";
    }
    silent(animalTarget:Animal) {
        let currentSoundElement = document.querySelector(`.sound-tx-${animalTarget._id}`)
        currentSoundElement != null &&  currentSoundElement.remove()
        //log
        console.log(`${this._type}:${this._id} is silent`)
    }
    displaySound(animalTarget:Animal):void {
        if (animalTarget._sounding) {
            let targetElement = document.getElementById(`${animalTarget._id}`)
            let soundElement = document.createElement('div')
            soundElement.setAttribute('class',`sound-tx-${animalTarget._id}`)
            soundElement.innerText = animalTarget._soundText;
            if(targetElement != null) {
                targetElement.appendChild(soundElement)
            }
        }
    }
}
class Cow extends Animal {
    constructor(id:number) {
        super('cow',id,'assets/cow.png');
        this._soundText = "Maaaaa...";
    }
    silent(animalTarget:Animal) {
        let currentSoundElement = document.querySelector(`.sound-tx-${animalTarget._id}`)
        currentSoundElement != null &&  currentSoundElement.remove()
        console.log(`${this._type}:${this._id} is silent CCC`)
    }
    displaySound(animalTarget:Animal):void {
        if (animalTarget._sounding) {
            let targetElement = document.getElementById(`${animalTarget._id}`)
            let soundElement = document.createElement('div')
            soundElement.setAttribute('class',`sound-tx-${animalTarget._id}`)
            soundElement.innerText = animalTarget._soundText;
            if(targetElement != null) {
                targetElement.appendChild(soundElement)
            }
        }
    }
}
class Dog extends Animal{
    constructor(id:number) {
        super('dog', id, 'assets/dog.png');
        this._soundText = "Hopppp...";
    }
    silent(animalTarget:Animal) {
        let currentSoundElement = document.querySelector(`.sound-tx-${animalTarget._id}`)
        currentSoundElement != null &&  currentSoundElement.remove()
        //log
        console.log(`${this._type}:${this._id} is silent`)
    }
    displaySound(animalTarget:Animal):void {
        if (animalTarget._sounding) {
            let targetElement = document.getElementById(`${animalTarget._id}`)
            let soundElement = document.createElement('div')
            soundElement.setAttribute('class',`sound-tx-${animalTarget._id}`)
            soundElement.innerText = animalTarget._soundText;
            if(targetElement != null) {
                targetElement.appendChild(soundElement)
            }
        }
    }
}
//genearating animals
class AnimalGenertor {
    _totalAnimals : Animal[];
    constructor() {
        this._totalAnimals = []
    };
     generateAnimal() {
        for (let i:number = 0; i<128; i++) {
            let rand:number = Math.random()
            if (rand === 0 || rand<=0.5) {
                this._totalAnimals.push(new Sheep(i))
            }
            else if (rand > 0.5 && rand < 0.8 ) {
                this._totalAnimals.push(new Cow(i))
            }
            else if (rand >= 0.8) {
                this._totalAnimals.push(new Dog(i))
            }
        }
    };
    get totalAnimalGS():Animal[] {
        return this._totalAnimals
    }
    addAnimalsToFarm(animalsList:Animal[]):void {
        for (let j: number = 0; j < animalsList.length; j++) {
            setTimeout(() => {
                let imageAnimal: Element = document.createElement("img")
                let animalElement: Element = document.createElement("div")
                animalElement.setAttribute('id',`${animalsList[j]._id}`)
                imageAnimal.setAttribute('src', `${animalsList[j]._src}`)
                imageAnimal.setAttribute('class', 'animal-el')
                animalElement.appendChild(imageAnimal)
                if (farmElement) {
                    farmElement.appendChild(animalElement)
                }
            },j * 20)
        }
    }
    soundChanging(animalsList:Animal[]):void {
        setInterval(() => {
            let randomNumber:number =Math.floor(Math.random() * animalsList.length - 1)
            animalsList[randomNumber].sounder = true;
            console.log(animalsList[randomNumber]);
            animalsList[randomNumber].displaySound(animalsList[randomNumber])
            setTimeout(() => {
                animalsList[randomNumber].sounder = false;
                animalsList[randomNumber].silent(animalsList[randomNumber]);
            },12000)
        },1200)
    }
}
window.addEventListener("DOMContentLoaded",() => {
    let generalAnimals:AnimalGenertor = new AnimalGenertor()
    let animals:Animal[] = generalAnimals.totalAnimalGS
    generalAnimals.generateAnimal()
    generalAnimals.totalAnimalGS
    generalAnimals.addAnimalsToFarm(animals)
    generalAnimals.soundChanging(animals)

})
