
{

    type CoffeeCup={
        shots:number;
        hasMilk?:boolean;
        hasSugar?:boolean;
    }

    interface CoffeeMaker{
        makeCoffee(shots:number):CoffeeCup;
    }


    abstract class CoffeeMachine implements CoffeeMaker{
        private coffeeBeans:number=0;
        private static BEANS_GRAM_PER_SHOT:number=7;

        constructor(coffeeBeans:number){
            this.coffeeBeans=coffeeBeans;
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

        protected abstract extract(shots:number):CoffeeCup;

        makeCoffee(shots:number):CoffeeCup{
            this.grindBeans(shots);
            this.preheat();
            return this.extract(shots);
        }

    }

    class CaffeeLatteMachine extends CoffeeMachine{
        constructor(beans:number, public readonly serialNum:string){
            super(beans);
        }
        private steamMilk(){
            console.log("steam milk")
        }

        protected extract(shots:number):CoffeeCup{
            this.steamMilk();
            return {
                shots,
                hasMilk:true,
            }
        }
    }

    class SweetCoffeeMaker extends CoffeeMachine{
        constructor(beans:number){
            super(beans);
        }

        protected extract(shots:number):CoffeeCup{
            return {
                shots,
                hasSugar:true,
            }
        }
    }
    
    const machines:CoffeeMaker[]=[
        new CaffeeLatteMachine(16,"asfs0000"),
        new SweetCoffeeMaker(16),
        new CaffeeLatteMachine(16,"asfs0000"),
        new SweetCoffeeMaker(16),
    ];

    machines.forEach(machine=>{
        console.log('----------');
        machine.makeCoffee(1);
    })
}