{

    type CoffeeCup={
        shots:number;
        hasMilk:boolean;
    }

    // 정보 은닉
    //public 디폴트
    //private 외부에서 접근 불가 
    //protected 상속한 자식 클래스에게만 보임

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

        makeCoffee(shots:number):CoffeeCup{
            if(this.coffeeBeans<shots*coffeeMaker.BEANS_GRAM_PER_SHOT){
                throw new Error('Not enough coffee beans')
            }
            this.coffeeBeans-=shots*coffeeMaker.BEANS_GRAM_PER_SHOT;
            return {
                shots,
                hasMilk:false
            }
        }

    }

    // const maker=new coffeeMaker(32);
    const maker=coffeeMaker.makeMachine(50);
    maker.fillCoffeeBeans(40);
    maker.makeCoffee(2);

    class User{
        // private firstName:string;
        // private lastName:string;
        // 1. fullName:string;
        get fullName():string{ // 2.
            return `${this.firstName} ${this.lastName}`
        }

        private internalAge=4;
        get age():number{
            return this.internalAge;
        }

        set age(num:number){
            if(num<0){
                throw new Error("age should be greater than 0")
            }
            this.internalAge=num;
        }

        constructor(private firstName:string, private lastName:string){
            this.firstName=firstName;
            this.lastName=lastName;
            // this.fullName=`${firstName} ${lastName}`
        }
    }

    const user=new User('jae','park');
    user.age=6;

    console.log(user.fullName);
    // user.firstName="wonpil";
    // console.log(user.fullName); //jae park 1.이면


}