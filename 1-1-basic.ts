{
    /**
     * javascript
     * primitive (원시타입): number, string, boolean, bigint, symbol, null, undefined
     * objective: function, array...
     */

    // number
    const num:number=1;

    // string
    const str:string='hi';

    // boolean
    const boal:boolean=true;

    // undefined
    let name:undefined; // 좋지 않음
    let age:number | undefined;
    age=undefined;
    age=1;
    function find():number | undefined{
        return undefined;
    }

    // null (빈값을 넣어줌)
    let person:null; // 좋지 않음
    let person2:string | null;



    //unknown 무슨 타입인지 모르는 상태... 좋지 않음
    let notSure:unknown=0;
    notSure:'he';
    notSure=true;

    //any 좋지 않음
    let anything:any=0;
    anything='hello';

    //void
    function print():void{ // 아무것도 리턴하지 않음
        console.log('hello');
        return;
    }

    //never
    function throwError(message:string):never{
        //message를 server로 보내서 log(로그)를 남기고
        throw new Error(message);
    }

    //object
    let obj:object; //좋지 않음
    function acceptSomeObject(obj:object){

    }
    acceptSomeObject({name:'ellie'});
    acceptSomeObject({animal:'dog'});
}