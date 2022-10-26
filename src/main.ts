class Animal {
    _type: string;
    _soundText: string;
    _sounding:boolean = false;
    _id:number;
    _src:string;

    constructor(type: string,id:number,src:string) {
        this._type = type
        this._src = src
        this._soundText = 'not sound';
        this._id = id
        switch (type){
            case'sheep':
            this._soundText = 'baaa...';
            break;
            case'cow':
                this._soundText = 'mooooo...';
            break;
            case'dog':
                this._soundText = 'hoppp...';
            break;
        }
    }
    set sounder(arg:boolean) {
        this._sounding = arg
    }
}
class Sheep extends Animal{
    constructor(id:number) {
        super('sheep',id,'assets/sheep.png');
    }
}
class Cow extends Animal {
    constructor(id:number) {
        super('cow',id,'assets/cow.png');
    }
}
class Dog extends Animal{
    constructor(id:number) {
        super('dog',id,'assets/dog.png');
    }
}
let animals :Animal[] = []

function animalGenerator(animals:Animal[]):void {
    for (let i:number = 0; i<128; i++) {
        let rand:number = Math.random()
        if (rand === 0 || rand<=0.5) {
            animals.push(new Sheep(i))
        }
        else if (rand > 0.5 && rand < 0.8 ) {
            animals.push(new Cow(i))
        }
        else if (rand >= 0.8) {
            animals.push(new Dog(i))
        }
    }
    console.log(animals)
}
let farmElement:Element | null = document.getElementById('farm')

function addAnimalsToFarm(animalsList:Animal[]):void {
    console.log(farmElement)
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

        }, j * 20)
    }
}
function randomSoundingChanger(animalsList:Animal[]):void {
    setInterval(() => {
        let randomNumber:number =Math.floor(Math.random() * animalsList.length - 1)
        animalsList[randomNumber].sounder = true;
        console.log(animalsList[randomNumber]);
        soundElementAppender(animalsList[randomNumber])
        setTimeout(() => {
            animalsList[randomNumber].sounder = false;
            soundElementDeleter(animalsList[randomNumber])
        },12000)
    },1200)
}
function soundElementAppender(animalTarget:Animal):void {
    if (animalTarget._sounding) {
        let targetElement = document.getElementById(`${animalTarget._id}`)
        let soundElement = document.createElement('div')
        soundElement.setAttribute('class',`sound-tx-${animalTarget._id}`)
        soundElement.innerText = animalTarget._soundText;
        targetElement.appendChild(soundElement)
    }
}
function soundElementDeleter(animalTarget:Animal):void{
    let currentSoundElement = document.querySelector(`.sound-tx-${animalTarget._id}`)
    currentSoundElement.remove()

}
window.addEventListener("DOMContentLoaded",() => {
    animalGenerator(animals)
    addAnimalsToFarm(animals)
    randomSoundingChanger(animals)
})
