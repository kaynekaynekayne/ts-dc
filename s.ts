//head가 마지막에 들어온 것(newest)을 가리키게
//next 이전 단계의 this.head (head 직전에 들어온 것)

// * push의 핵심
// 우선 this.head를 node(들어오려는)의 next로 설정
// 그후 node를 this.head로 설정

// * pop의 핵심
// 우선 this.head를 node(나가려는)로 설정하고
// 그후 node의 next를 this.head로 설정
// 뭐가 빠져나갔는지 봐야 되니까 node(나가려는).value를 return

interface Stack{
    readonly size:number,
    push(value:string):void,
    pop():string
}

type StackNode={
    readonly value:string,
    readonly next?:StackNode //stacknode | undefined
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
        console.log(node); 
        //{ value: 'jae 1', next: undefined }
        // { value: 'wonpil 2', next: { value: 'jae 1', next: undefined } }
        console.log("-----");
        //next:'앞서 head가 가리키고 있던 애'를 가리키면 됨
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
        //제거하고자 하는 node = head가 가리키는 애
        console.log(node);
        console.log("-----");
        this.head=node.next;
        //this.head의 next가 this.head로 바뀌도록 설정함 (이전 this.head 사라짐)
        this._size--;
        return node.value;
    }
}

const stack=new StackImpl(5);
console.log(stack) //stackImpl { capicity: 5, _size: 0 }
console.log("------")
stack.push("jae 1");
console.log(stack)
console.log("------")
// StackImpl {
//     capicity: 5,
//     _size: 1,
//     head: { value: 'jae 1', next: undefined }
// }
stack.push("wonpil 2");
console.log(stack)
console.log("------")
// StackImpl {
//     capicity: 5,
//     _size: 2,
//     head: { value: 'wonpil 2', next: { value: 'jae 1', next: undefined } }
//  }

    console.log(stack.pop())
    console.log(stack)
    console.log("------")

//StackImpl {
//   capicity: 5,
//   _size: 1,
//   head: { value: 'jae 1', next: undefined }
// }



// while(stack.size!==0){//0이면 빠져나옴
//     console.log(stack.pop())
//     console.log(stack)
//     console.log("------")
    
//}