{
    /**
     * Type Aliases 새로운 타입을 정의
     */

    type Text=string;
    const name:Text='jae';
    type Num=number;
    type Student={
        name:string;
        age:number;
    }
    const student:Student={name:"jae", age:31}


    /*
        * String Literal Types
    */

    type Name="name";
    let jae:Name;
    jae="name";

    type Boal=true; 
    let love:Boal;
    love=true;
}