{
    //coffeeMachine class 안에 coffeeBeans / makeCoffee()
    
    type CoffeeCup={
        shots:number;
        hasMilk:boolean;
    }

    class coffeeMachine{
        coffeeBeans:number=0; //"instance level"
        static BEANS_GRAM_PER_SHOT:number=7; 
        //static 때문에 "class level"로 지정이 됨
        //클래스와 연결이 되어있기 때문에 object마다 만들어지지 않음
        //console.log(new coffeeMachine()) => {coffeeBeans:32} 빈그램퍼샷 숨김
        
        constructor(coffeeBeans:number){
            //constructor:클래스를 이용해서 obj를 만들 때 처음에 호출되는 함수
            this.coffeeBeans=coffeeBeans;
        }

        static makeMachine(coffeeBeans:number):coffeeMachine{
            return new coffeeMachine(coffeeBeans)
        }

        makeCoffee(shots:number):CoffeeCup{
            if(this.coffeeBeans<shots*coffeeMachine.BEANS_GRAM_PER_SHOT){
                throw new Error('Not enough coffee beans')
            }
            this.coffeeBeans-=shots*coffeeMachine.BEANS_GRAM_PER_SHOT;
            return {
                shots,
                hasMilk:false
            }
        }

    }

    const maker=new coffeeMachine(32);
    console.log(maker);
    //static 붙이기 전엔 { coffeeBeans: 32, BEANS_GRAM_PER_SHOT: 7 }
    //static 붙이고 나선 { coffeeBeans: 32 }
    console.log(maker.makeCoffee(2));
    //{ shots: 2, hasMilk: false }

    console.log(coffeeMachine.makeMachine(3));
}