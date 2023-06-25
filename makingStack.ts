
interface Stack{ //노드 아님
    readonly size:number,
    push(value:string):void,
    pop():string
}

type StkNode={
    readonly value:string,
    readonly next?:StkNode
}

class StackImpl implements Stack{
    private _size:number=0; //버벅
    private head?:StkNode;

    constructor(private capacity:number){}
    
    get size(){
        return this._size;
    }


    push(value:string){
        
        if(this.size===this.capacity){
            throw new Error("용량 부족")
        }

        const node:StkNode={value, next:this.head}; //버벅
        this.head=node;
        this._size++;
    }

    pop():string{

        if(this.head==null){ //버벅
            throw new Error("스택에 노드가 없음")
        }

        const node=this.head;
        this.head=node.next;
        this._size--;

        return node.value;
    }

}

const stack1=new StackImpl(10);
console.log(stack1);
console.log("-----");

stack1.push("jae");
console.log(stack1);
console.log("-----");

stack1.push("wonpil");
console.log(stack1);
console.log("-----");
//{capacity:10, _size:2, head:{value:"wopil", next:{value:"jae", next:undefined}}}

console.log(stack1.pop());
//node의 value를 return하므로 "wonpil"
console.log(stack1);
//{capacity:10, _size:1, head:{value:"jae", next:undefined}}

console.log(stack1.pop());
//"jae"
console.log(stack1);
//{capacity:10, _size:0, head:undefined}