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
    const fancyMilkMaker = new FancyMilkSteamer();
    const coldMilkMaker = new ColdMilkSteamer();
    const noMilk=new NoMilk();

    //설탕
    const candySugar = new CandySugarMixer();
    const sugar = new SugarMixer();
    const noSugar = new NoSugar();

    //
    const sweetCandyMachine = new CoffeeMachine(12, noMilk, candySugar);
    const sweetMachine = new CoffeeMachine(12, noMilk, sugar);

    const latteMachine = new CoffeeMachine(12, cheapMilkMaker, noSugar);
    const coldLatteMachine = new CoffeeMachine(12, coldMilkMaker, noSugar);
    const sweetLatteMachine = new CoffeeMachine(12, cheapMilkMaker, candySugar);

    latteMachine.fillCoffeeBeans(48);
    console.log(latteMachine.makeCoffee(1));

    console.log(sweetMachine.makeCoffee(1));
}