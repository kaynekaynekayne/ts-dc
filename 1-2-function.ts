{
    // Javascript 좋지 않은 코드 
    // function jsAdd(num1, num2){
    //     return num1+num2;
    // }

    // // 위를 Typescript로 변환
    // function add(num1:number, num2:number):number{//:숫자를 리턴
    //     return num1+num2;
    // }


    // // Javascript 좋지 않은 코드 
    // function jsFetchNum(id){
    //     // code ...
    //     // code ...
    //     // code ...
    //     return new Promise((resolve, reject)=>{
    //         resolve(100);
    //     })
    // }

    // // 위를 Typescript로 변환
    // function fetchNum(id:string): Promise<number>{//num타입 프로미스를 리턴
    //     // code ...
    //     // code ...
    //     // code ...
    //     return new Promise((resolve, reject)=>{
    //         resolve(100);
    //     })
    // }


    // Javascript => Typescript

    // Optional Parameter
    function printName(firstName:string, lastName?:string){
        console.log(firstName);
        console.log(lastName);
    }

    printName("jae", "park");
    printName("wonpil");
    printName("youngk", undefined);


    // Default parameter
    function printMessage(message:string='default message'){
        console.log(message);
    }
    printMessage();


    // Rest parameter
    function addNumbers(...numbers:number[]):number{
        console.log('numbers',numbers);
        console.log('...numbers',...numbers);
        return numbers.reduce((a,b)=>a+b);
    }

    console.log('result',addNumbers(1,2));
    console.log('result',addNumbers(1,2,3,4));
    console.log('result',addNumbers(1,2,3,4,5,6,7));

}