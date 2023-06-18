
{

    type CoffeeCup={
        shots:number;
        hasMilk:boolean;
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

    class CaffeeLatteMachine extends CoffeeMachine{
        constructor(beans:number, public readonly serialNum:string){
            super(beans);
            //자식 클래스에서 constructor을 만들 때는
            //super() 호출해야 하고
            //부모 클래스 호출할 때 필요했던 것을 ()안에 넣어야함 여기선 beans
        }
        private steamMilk(){
            console.log("steam milk")
        }

        makeCoffee(shots:number):CoffeeCup{
            const coffee=super.makeCoffee(shots); //부모 클래스의 함수 호출
            this.steamMilk();
            return{
                ...coffee,
                hasMilk:true
            }
        }
    }

    const machine=new CoffeeMachine(23);
    const latteMachine=new CaffeeLatteMachine(23,'zsfsdf');
    const coffee=latteMachine.makeCoffee(1);
    console.log(coffee);
    console.log(latteMachine.serialNum);

    
}