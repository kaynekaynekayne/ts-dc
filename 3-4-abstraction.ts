{

    type CoffeeCup={
        shots:number;
        hasMilk:boolean;
    }

    class coffeeMaker{
        private coffeeBeans:number=0; //"instance level"
        private static BEANS_GRAM_PER_SHOT:number=7;

        private constructor(coffeeBeans:number){
            this.coffeeBeans=coffeeBeans;
        }

        static makeMachine(coffeeBeans:number):coffeeMaker{
            return new coffeeMaker(coffeeBeans)
        }

        fillCoffeeBeans(beans:number){
            if(beans<0) throw new Error("value for beans should be greater than 0")
            this.coffeeBeans+=beans;
        }

        grindBeans(shots:number){
            console.log(`grinding beans for ${shots}`);
            if(this.coffeeBeans<shots*coffeeMaker.BEANS_GRAM_PER_SHOT){
                throw new Error("not enough coffee beans")
            }
            this.coffeeBeans-=shots*coffeeMaker.BEANS_GRAM_PER_SHOT;
        }

        preheat():void{
            console.log("heating up...");
        }

        extract(shots:number):CoffeeCup{
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

    // const maker=new coffeeMaker(32);
    // const maker=coffeeMaker.makeMachine(32);
    // maker.fillCoffeeBeans(32);

}

{

    type CoffeeCup={
        shots:number;
        hasMilk:boolean;
    }

    interface CoffeeMaker{
        //이 interface를 사용하면 makeCoffee를 이용하고 CoffeeCup을 리턴받음
        makeCoffee(shots:number):CoffeeCup;
    }

    class CoffeeMachine implements CoffeeMaker{
        //커피머신은 커피메이커 인터페이스를 구현하는 아이
        private coffeeBeans:number=0; //"instance level"
        private static BEANS_GRAM_PER_SHOT:number=7;

        private constructor(coffeeBeans:number){
            this.coffeeBeans=coffeeBeans;
        }

        static makeMachine(coffeeBeans:number):CoffeeMachine{
            return new CoffeeMachine(coffeeBeans)
        }

        fillCoffeeBeans(beans:number){
            if(beans<0) throw new Error("value for beans should be greater than 0")
            this.coffeeBeans+=beans;
        }

        //grindBeans, preheat, extract 같은 과정은 외부에서 알 필요가
        //없기 때문에 private 붙여줌
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

    // const maker=new coffeeMaker(32);
    const maker:CoffeeMachine=CoffeeMachine.makeMachine(32);
    maker.fillCoffeeBeans(32);
    maker.makeCoffee(2);
    console.log(maker)

    const maker2:CoffeeMaker=CoffeeMachine.makeMachine(32);
    // maker2.fillCoffeeBeans(32); 오류남
    maker2.makeCoffee(2);

}