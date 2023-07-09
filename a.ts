
{

    class Coder{
    
    secondLang!:string
    
    constructor(
        public readonly name:string, 
        public music:string, 
        private age:number, 
        protected lang:string = "eng"
    ){
        this.name=name;
        this.music=music;
        this.age=age;
        this.lang=lang;
    }
    
    public getAge(){
        return `hello i am ${this.age}`
    }
    }
    
    const jae = new Coder("jae","rock",30);
    // console.log(jae.getAge());


    class WebDev extends Coder{
        constructor(
            public computer:string,
            name:string,
            music:string,
            age:number,
        ){
            super(name, music, age);
            this.computer=computer;
        }
    
        public getLang(){
            return `i write ${this.lang}`;
        }
}


{

    interface Musician { //심플한 규약
        name:string,
        instrument:string,
        play(action:string):string,
    }

    class Guitarlist implements Musician{
        constructor(
            public name:string,
            public instrument:string,
        ){
            this.name=name;
            this.instrument=instrument;
        }
        
        play(action: string): string{
            return `${this.name} ${action} the ${this.instrument}`
        }
        
    }

    const jae=new Guitarlist("jae","Nut Cracker");
    // console.log(jae.play("hits"));

    }
}

{
    class Peeps{
        static count:number=0 //인스턴스로 접근 불가, 클래스로만 접근 가능

        static getCount():number{
            return Peeps.count;
        }

        public id:number
        
        constructor(public name:string){
            this.name=name;
            this.id=++Peeps.count;
        }
    }

    const john=new Peeps("john");
    // console.log(john);
    const dave=new Peeps("dave");
    // console.log(dave);
    const daved=new Peeps("daved");
    // console.log(daved);

}


{
    class Bands{
        private dataState:string[]

        constructor(){
            this.dataState=[];
        }

        public get data():string[]{
            return this.dataState;
        }

        public set data(value:string[]){
            if(Array.isArray(value) && value.every(v=>typeof v === 'string')){
                this.dataState=value
                return
            }else{
                throw new Error("Param is not an array of strings");
            }
        }
    }

    const myBands=new Bands();
    myBands.data=['neil young','led zep'] //setter
    // console.log(myBands.data); //getter
    myBands.data=[...myBands.data, 'queen']
    // console.log(myBands.data);

}

{

    interface TransactionObj{
        Pizza:number,
        Books:number,
        Job:number,
    }

    const todaysTransaction:TransactionObj={
        Pizza:-19,
        Books:-5,
        Job:50
    }

    console.log(todaysTransaction.Pizza);

    let prop:string="Pizza"
    console.log(todaysTransaction[prop]);
}