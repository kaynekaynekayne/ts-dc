// type vs interface

//type: 모든 타입에 사용 가능, 확장 불가 
// 확장 불가=> type A={} 한 다음 또 type A={} 했을 때 duplicate error 발생
//interface: 오로지 객체 타입만 사용 가능, 확장 가능


// extends vs implements
// 상속 vs 구현
// extends: 부모의 모든 기능을 다 사용할 필요 없음
// implements: 다 사용 해야함, 무조건 부모의 메서드를 재정의 (오버라이딩)
{


    type CoffeeCup={
        shots:number;
        hasMilk?:boolean;
        hasSugar?:boolean;
    }

    interface CoffeeMaker { //규약
        makeCoffee(shots:number): CoffeeCup;
    }

    class CoffeeMachine implements CoffeeMaker{
        //static:클래스 단위 (인스턴스에서는 볼 수 x)
        private static BEANS_GRAMM_PER_SHOT:number=7;
        private coffeeBeans:number=0;

        constructor(
            beans:number, 
            private milk:MilkFrother, 
            private sugar:SugarProvider)
        {
            this.coffeeBeans=beans;
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
                hasMilk:false,
                hasSugar:false,
            }
        };

        makeCoffee(shots:number):CoffeeCup{
            this.grindBeans(shots);
            this.preheat();
            const coffee=this.extract(shots);
            const sugarAdded=this.sugar.addSugar(coffee);
            return this.milk.makeMilk(sugarAdded);
        }
    }
    

    interface MilkFrother{
        makeMilk(cup:CoffeeCup):CoffeeCup;
    }

    interface SugarProvider{
        addSugar(cup:CoffeeCup):CoffeeCup;
    }


    //싸구려 우유 거품기 
    class CheapMilkSteamer implements MilkFrother{
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

    // 고급 우유 거품기
    class FancyMilkSteamer implements MilkFrother{
        private steamMilk():void{
            console.log("steaming a++ milk...🥛")
        }
        makeMilk(cup:CoffeeCup):CoffeeCup{
            this.steamMilk();
            return{
                ...cup,
                hasMilk:true
            }
        }
    }

    //차가운 우유 거품기
    class ColdMilkSteamer implements MilkFrother{
        private steamMilk():void{
            console.log("steaming cold milk...🧊")
        }
        makeMilk(cup:CoffeeCup):CoffeeCup{
            this.steamMilk();
            return{
                ...cup,
                hasMilk:true
            }
        }
    }

    //우유 없음
    class NoMilk implements MilkFrother{
        makeMilk(cup:CoffeeCup):CoffeeCup{
            return cup;
        }
    }


    //싸구려 설탕 제조기
    class CandySugarMixer implements SugarProvider{
        private getSugar():void{
            console.log("getting some sugar from candy");
        }

        addSugar(cup:CoffeeCup):CoffeeCup{
            const sugar=this.getSugar();
            return {
                ...cup,
                hasSugar:true,
            }
        }
    }

    //설탕 제조기
    class SugarMixer implements SugarProvider{
        private getSugar():void{
            console.log("getting some sugar from jar!");
        }

        addSugar(cup:CoffeeCup):CoffeeCup{
            const sugar=this.getSugar();
            return {
                ...cup,
                hasSugar:true,
            }
        }
    }

    //무설탕
    class NoSugar implements SugarProvider{
        addSugar(cup:CoffeeCup):CoffeeCup{
            return cup;
        }
    }



    //우유
    const cheapMilkMaker = new CheapMilkSteamer();
    console.log(cheapMilkMaker);
    console.log("---------");
    const fancyMilkMaker = new FancyMilkSteamer();
    console.log(fancyMilkMaker);
    console.log("---------");
    const coldMilkMaker = new ColdMilkSteamer();
    console.log(coldMilkMaker);
    console.log("---------");
    const noMilk=new NoMilk();
    console.log(noMilk);
    console.log("---------");

    //설탕
    const candySugar = new CandySugarMixer();
    console.log(candySugar);
    console.log("---------");
    const sugar = new SugarMixer();
    console.log(sugar);
    console.log("---------");
    const noSugar = new NoSugar();
    console.log(noSugar)
    console.log("--------")

    //
    const sweetCandyMachine = new CoffeeMachine(12, noMilk, candySugar);
    console.log(sweetCandyMachine);
    console.log("---------");

    const sweetMachine = new CoffeeMachine(12, noMilk, sugar);
    console.log(sweetMachine);
    console.log("---------");

    const latteMachine = new CoffeeMachine(12, cheapMilkMaker, noSugar);
    console.log(latteMachine);
    console.log("-------");

    const coldLatteMachine = new CoffeeMachine(12, coldMilkMaker, noSugar);
    console.log(coldLatteMachine);
    console.log("-------");

    const sweetLatteMachine = new CoffeeMachine(12, cheapMilkMaker, candySugar);
    console.log(sweetLatteMachine);
    console.log("-------");

    latteMachine.fillCoffeeBeans(48);
    console.log(latteMachine.makeCoffee(1));
    console.log("-------");

    sweetMachine.fillCoffeeBeans(46);
    console.log(sweetMachine.makeCoffee(2));
    console.log("-------")

    sweetLatteMachine.fillCoffeeBeans(32);
    console.log(sweetLatteMachine.makeCoffee(2));
    console.log("-------")

}