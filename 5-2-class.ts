//either: a 혹은 b
interface Either<L,R> { //<>안에 있는건 임의의 TYPE
    left:()=>L;
    right:()=>R;
}

class simpleEither<L, R> implements Either<L,R>{
    constructor(private leftValue:L, private rightValue:R) {}
    left():L{
        return this.leftValue;
    }
    right():R{
        return this.rightValue;
    }
}

const either:Either<number, number>=new simpleEither(4,5)
either.left() //4
either.right() //5

const best=new simpleEither({name:"jae"},"hello");
console.log(best.left());
console.log(best.right());
