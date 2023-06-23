{

    type CoffeeCup={
        shots:number;
        hasMilk?:boolean;
        hasSugar?:boolean;
    }

    interface CoffeeMaker {
        makeCoffee(shots:number): CoffeeCup;
    }

    class CoffeeMachine implements CoffeeMaker{
        //static:클래스 단위 (인스턴스에서는 볼 수 x)
        private static BEANS_GRAMM_PER_SHOT:number=7;
        private coffeeBeans:number=0;

        constructor(beans:number){
            this.coffeeBeans=beans;
        }
        
        static makeMachine(coffeeBeans:number):CoffeeMachine{
            return new CoffeeMachine(coffeeBeans);
        }

        fillCoffeeBeans(beans:number){
            //밖에서 직접 변경하는게 아니라(위험)
            //함수를 통해서 내부의 상태를 변경
            if(beans<0){
                throw new Error("beans should be greater than 0")
            }
            this.coffeeBeans+=beans;
        }

        clean(): void {
            console.log('cleaning the machine...')
        }
    
        private grindBeans(shots:number){
            console.log(`grinding beans for ${shots} shots`);
            if(this.coffeeBeans<shots*CoffeeMachine.BEANS_GRAMM_PER_SHOT){
                throw new Error("Not enough coffee beans!");
            }
            this.coffeeBeans-=shots*CoffeeMachine.BEANS_GRAMM_PER_SHOT;
        }

        private preheat():void{
            console.log('heating up...⚡')
        }

        private extract(shots:number):CoffeeCup{
            console.log(`pulling ${shots} shots`)
            return {
                shots,
                hasMilk:false
            }
        };

        makeCoffee(shots:number):CoffeeCup{
            this.grindBeans(shots);
            this.preheat();
            return this.extract(shots);
        }
    }
    
    //싸구려 우유 거품기 
    class CheapMilkSteamer {
        private steamMilk():void{
            console.log("steaming milk...")
        }
        makeMilk(cup:CoffeeCup):CoffeeCup{
            this.steamMilk();
            return{
                ...cup,
                hasMilk:true
            }
        }
    }

    //설탕 제조기
    class SugarProvider{
        private getSugar(){
            console.log("getting some sugar")
            return true;
        }

        addSugar(cup:CoffeeCup):CoffeeCup{
            const sugar=this.getSugar();
            return {
                ...cup,
                hasSugar:true,
            }
        }
    }

    class CaffeLatteMachine extends CoffeeMachine { //상속
        constructor(
            private beans:number, 
            public readonly serialNumber:string, 
            private milkFrother:CheapMilkSteamer
        ){
            super(beans);
        }

        makeCoffee(shots:number):CoffeeCup{
            const coffee=super.makeCoffee(shots); //부모의 함수 쓸 때 super
            return this.milkFrother.makeMilk(coffee)
        }
    }

    class SweetCoffeeMaker extends CoffeeMachine { //커피컵에 설탕을 추가해주는 클래스
        constructor(private beans:number, private sugar:SugarProvider){
            super(beans);
        }

        makeCoffee(shots:number):CoffeeCup{
            const coffee=super.makeCoffee(shots);
            return this.sugar.addSugar(coffee);
        }
    }

    class SweetCaffeLatteMachine extends CoffeeMachine{
        constructor(
            private beans:number, 
            private milk:CheapMilkSteamer, 
            private sugar:SugarProvider)
        {
            super(beans); 
        }
        makeCoffee(shots:number):CoffeeCup{
            const coffee=this.makeCoffee(shots);
            const milkAdded=this.milk.makeMilk(coffee)
            return this.sugar.addSugar(milkAdded);
        }
    }

    const machines=[
        new CoffeeMachine(16),
        new CaffeLatteMachine(16,"sss"),
        new SweetCoffeeMaker(16),
    ];

    machines.forEach(machine=>{
        console.log("---------");
        machine.makeCoffee(1);
        console.log("---------");
        console.log(machine.makeCoffee(1));
    })

}