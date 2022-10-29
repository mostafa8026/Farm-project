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
    };
    set sounder(arg:boolean) {
        this._sounding = arg;
    };
    silent(animalTarget:Animal) {
        let currentSoundElement = document.querySelector(`.sound-tx-${animalTarget._id}`)
        currentSoundElement != null &&  currentSoundElement.remove();
        //log
        console.log(`${this._type}:${this._id} is silent`);
    };
    displaySound():void {
        if (this._sounding) {
            let targetElement = document.getElementById(`${this._id}`)
            let soundElement = document.createElement('div')
            soundElement.setAttribute('class', `sound-tx-${this._id}`)
            soundElement.innerText = this._soundText;
            if( targetElement  !== null) {
                targetElement.appendChild(soundElement)
            }

        }
    };
};
//extended classes
class Sheep extends Animal{
    constructor(id:number) {
        super('sheep',id,'assets/sheep.png');
        this._soundText = "Baaaaa...";
    }
};
class Cow extends Animal {
    constructor(id:number) {
        super('cow',id,'assets/cow.png');
        this._soundText = "Maaaaa...";
    };
};
class Dog extends Animal{
    constructor(id:number) {
        super('dog', id, 'assets/dog.png');
        this._soundText = "Hopppp...";
    };
};

async function printAnimal(j:number){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('m')
        },2000)

    })
};
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
    async printAnimals() {
        function premissionPrint() {
            return new Promise(resolve => {
                setInterval(() => {
                    resolve(true)
                },200)
            })
        }
        for(let j: number = 0; j < this._totalAnimals.length; j++) {

            await premissionPrint()
            let imageAnimal: Element = document.createElement("img")
            let animalElement: Element = document.createElement("div")
            animalElement.setAttribute('id',`${this._totalAnimals[j]._id}`)
            imageAnimal.setAttribute('src', `${this._totalAnimals[j]._src}`)
            animalElement.setAttribute('id',`${this._totalAnimals[j]._id}`)
            imageAnimal.setAttribute('src', `${this._totalAnimals[j]._src}`)
            imageAnimal.setAttribute('class', 'animal-el')
            animalElement.appendChild(imageAnimal)
            if (farmElement) {
                farmElement.appendChild(animalElement)
            }
        }
    }
    soundChanging():void {
        setInterval(() => {
            let randomNumber:number =Math.floor(Math.random() * this._totalAnimals.length - 1)
            this._totalAnimals[randomNumber].sounder = true;
            console.log(this._totalAnimals[randomNumber]);
            this._totalAnimals[randomNumber].displaySound()
            setTimeout(() => {
                this._totalAnimals[randomNumber].sounder = false;
                this._totalAnimals[randomNumber].silent(this._totalAnimals[randomNumber]);
            },12000)
        },1200)
    }
}
window.addEventListener("DOMContentLoaded",() => {
    let generalAnimals:AnimalGenertor = new AnimalGenertor()
    generalAnimals.generateAnimal()
    generalAnimals.totalAnimalGS
    generalAnimals.printAnimals()
    generalAnimals.soundChanging()

})
