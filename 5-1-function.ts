{
    function checkNotNullBad(arg:number | null):number{
        if(arg==null){
            throw new Error("not valid number");
        }
        return arg;
    }

    function checkNotNullAnyBad(arg:any|null):any{
        if(arg==null){
            throw new Error("not valid number");
        }
        return arg;
    }

    const result=checkNotNullAnyBad(123);
    const result2=checkNotNullAnyBad(true);
    //함수에 뭘 넣든 result가 무조건 any 타입이 됨
    //고로 type에 대한 정보를 알 수 없음->나쁨
    // console.log(result);


    //!제네릭: 어떤 타입이든 받을 수 있음
    function checkNotNull<T>(arg:T|null):T{
        if(arg==null){
            throw new Error("not valid number");
        }
        return arg;
    }
    const number=checkNotNull(123);
    const bool:boolean=checkNotNull(true);
    console.log(number)
    console.log(bool)
}