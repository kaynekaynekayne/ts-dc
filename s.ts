
{

    type CoffeeCup={
        shots:number;
        hasMilk?:boolean;
        hasSugar?:boolean;
    }

    interface CoffeeMaker{
        makeCoffee(shots:number):CoffeeCup;
    }


    class CoffeeMachine implements CoffeeMaker{
        private coffeeBeans:number=0;
        private static BEANS_GRAM_PER_SHOT:number=7;

        constructor(coffeeBeans:number){
            this.coffeeBeans=coffeeBeans;
        }

        static makeMachine(coffeeBeans:number):CoffeeMachine{
            return new CoffeeMachine(coffeeBeans)
        }

        fillCoffeeBeans(beans:number){
            if(beans<0) throw new Error("value for beans should be greater than 0")
            this.coffeeBeans+=beans;
        }

        clean(){
            console.log("cleaning the machine")            
        }

        
        private grindBeans(shots:number){ 
            console.log(`grinding beans for ${shots}`);
            if(this.coffeeBeans<shots*CoffeeMachine.BEANS_GRAM_PER_SHOT){
                throw new Error("not enough coffee beans")
            }
            this.coffeeBeans-=shots*CoffeeMachine.BEANS_GRAM_PER_SHOT;
        }

        private preheat():void{
            console.log("heating up...");
        }

        private extract(shots:number):CoffeeCup{
            console.log(`pulling ${shots}...`);
            return {
                shots,
                hasMilk:false
            }
        }

        makeCoffee(shots:number):CoffeeCup{
            this.grindBeans(shots);
            this.preheat();
            return this.extract(shots);
        }

    }

    interface MilkFrother{
        makeMilk(cup:CoffeeCup):CoffeeCup;

    }

    interface SugarProvider{
        addSugar(cup:CoffeeCup):CoffeeCup;
    }

    //싸구려 우유 거품기
    //카페라떼머신 안에 우유 넣는 메소드를 만드는게 아니라 아예 기능을 밖에서 생성
    class CheapMilkSteamer implements MilkFrother{
        private steamMilk():void{
            console.log("steam some milk.....");
        }
        makeMilk(cup:CoffeeCup):CoffeeCup{
            this.steamMilk();
            return {
                ...cup,
                hasMilk:true
            }
        }
    }

    //설탕 제조기
    class CandySugarMixer implements SugarProvider{
        private getSugar(){
            console.log("get sugar");
            return true;
        }
        addSugar(cup:CoffeeCup):CoffeeCup{
            const sugar=this.getSugar();
            return{
                ...cup,
                hasSugar:sugar,
            }
        }
    }

    class CaffeeLatteMachine extends CoffeeMachine{
        constructor(
            beans:number, 
            public readonly serialNum:string, 
            private milkFrother:MilkFrother
        ){
            super(beans);
        }

        makeCoffee(shots:number):CoffeeCup{
            const coffee=super.makeCoffee(shots); //부모 클래스의 함수 호출
            return this.milkFrother.makeMilk(coffee)
        }
    }

    class SweetCoffeeMaker extends CoffeeMachine{
        constructor(
            private beans:number,
            private sugarFrother:SugarProvider,
        ){
            super(beans);
        }

        makeCoffee(shots: number):CoffeeCup {
            const coffee=super.makeCoffee(shots);
            return this.sugarFrother.addSugar(coffee);
        }
    }

    class SweetCaffeLatteMachine extends CoffeeMachine {
        constructor(
            private beans:number,
            private sugar:SugarProvider,
            private milk:MilkFrother,
        ){ 
            super(beans);
        }

        makeCoffee(shots:number):CoffeeCup{
            const coffee=super.makeCoffee(shots);
            const sugarAdded=this.sugar.addSugar(coffee);
            return this.milk.makeMilk(sugarAdded);
        }
    }
    
    const cheapMilkMaker=new CheapMilkSteamer();
    const candySugar=new CandySugarMixer();
    const sweetMachine=new SweetCoffeeMaker(12,candySugar);
    const latteMachine= new CaffeeLatteMachine(12, '44', cheapMilkMaker);
    const sweetLatteMachine=new SweetCaffeLatteMachine(
        12, 
        cheapMilkMaker, 
        candySugar
    );
}