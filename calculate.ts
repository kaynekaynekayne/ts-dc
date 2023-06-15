// let's make a calculator

//갯수가 제한된 명령어라서 union type(지정된 타입)
type Order='add' | 'substract' | 'multiply' | 'divide' | 'remainder'

function calculate(order:Order, num1:number, num2:number){
    switch(order){
        case "add":
            return num1+num2;
        case "substract":
            return num1-num2;
        case 'multiply':
            return num1*num2;
        case 'divide':
            return num1/num2;
        case 'remainder':
            return num1%num2;
        default:
            throw new Error('unknown command');
    }
}

console.log(calculate("add",1,3));
console.log(calculate("substract",3,1));
console.log(calculate("multiply",4,2));
console.log(calculate("divide",4,2));
console.log(calculate("remainder",5,2));//1

