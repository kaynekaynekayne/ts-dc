//head가 마지막에 들어온 것을 가리키게

interface Stack{
    readonly size:number;
    push(value:string):void;
    pop():string;
}

type StackNode={
    readonly value:string;
    readonly next?:StackNode; //stacknode | undefined
}

class StackImpl implements Stack{
    private _size: number=0;
    private head?:StackNode;
    
    constructor(private capicity:number){}

    get size(){
        return this._size;
    }
    push(value: string){
        if(this.size===this.capicity){
            throw new Error("용량 없음 stack is full")
        }
        const node:StackNode={value:value, next:this.head};
        this.head=node; //헤드가 새로 들어온 애를 가리키도록
        this._size++;
    }
    pop():string { //헤드가 가리키는 애를 pop 해야함
        if(this.head==null){// 스택이 비어 있음
            //this.head===undefined 로 하면 null 통과되어버림
            //null==undefined (부등호 두 개에서는 동일) null!==undefined
            //==null 하면 undefined, null 두 개 다 거를 수 있음
            throw new Error("stack is empty");
        }
        const node=this.head;
        this.head=node.next;
        this._size--;
        return node.value;
    }
}

const stack=new StackImpl(5);
console.log(stack)
console.log("------")
stack.push("jae 1");
stack.push("wonpil 2");
stack.push("youngk 3");
console.log(stack)
console.log("------")

while(stack.size!==0){//0이면 빠져나옴
    console.log(stack.pop())
    console.log(stack)
    console.log("------")
}

// stack.pop(); //error