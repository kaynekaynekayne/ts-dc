{

    type CoffeeCup={
        shots:number;
        hasMilk:boolean;
    }

    const BEANS_GRAM_PER_SHOT=7; //1샷 당 필요한 커피콩 7g
    let coffeeBeans:number=0; //현재 커피콩 0g

    function makeCoffee(shots:number):CoffeeCup{
        if(coffeeBeans<shots*BEANS_GRAM_PER_SHOT){
            //총 커피콩이 샷*7g(1샷 당 필요한 커피콩)보다 작다면
            //예를 들어 2샷이면 2*7g이라 총 커피콩이 14g이 필요함
            throw new Error('Not enough coffee beans');
        } 
        coffeeBeans-=shots*BEANS_GRAM_PER_SHOT; 
        //커피 한 번 내리면 총 커피콩(g)은 샷*7g만큼 줄어듦
        return {
            shots,
            hasMilk:false, //샷과 우유포함 여부 보내줌
        }
    }

    coffeeBeans+=3*BEANS_GRAM_PER_SHOT; //일단 총 커피콩 21g으로 충전해줌
    const coffee=makeCoffee(2); //2샷을 넣겠다
    console.log(coffee);
}