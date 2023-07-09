{
    
interface Stack<T>{ //노드 아님
    readonly size:number,
    push(value:T):void,
    pop():T
}

type StkNode<T>={
    readonly value:T,
    readonly next?:StkNode<T>
}

class StackImpl<T> implements Stack<T>{
    private _size:number=0; //버벅
    private head?:StkNode<T>;

    constructor(private capacity:number){}
    
    get size(){
        return this._size;
    }


    push(value:T){
        
        if(this.size===this.capacity){
            throw new Error("용량 부족")
        }

        const node={value, next:this.head};
        this.head=node;
        this._size++;
    }

    pop():T{

        if(this.head==null){ //버벅
            throw new Error("스택에 노드가 없음")
        }

        const node=this.head;
        this.head=node.next;
        this._size--;

        return node.value;
    }

}

const stack1=new StackImpl<string>(10); 
//<string>안 쓰면 <unknown>이라고 뜸
//pop을 하게 되면 unknown 뜸
stack1.push("jae");
stack1.push("wonpil");
console.log(stack1);
console.log("-----");
//{capacity:10, _size:2, head:{value:"wopil", next:{value:"jae", next:undefined}}}


const stack2=new StackImpl<number>(10);
stack2.push(100);
stack2.push(200);
console.log(stack2);
console.log("-----");
}