/**
 * getter setter
    객체의 무결성을 보장하기 위해 사용합니다. 
    예를 들어, 만약 외부에서 몸무게라는 필드에 직접 접근한다면
    0보다 낮은 값을 줄 수도 있습니다.
    이 경우 객체의 무결성이 깨지기 때문에 이를 방지하기 위해
    Getter/Setter를 사용하여 데이터의 무결성을 지켜줍니다
 */

{
    class User{
        firstName:string;
        lastName:string;
        fullName:string;

        constructor(firstName:string, lastName:string){
            this.firstName=firstName;
            this.lastName=lastName;
            this.fullName=`${firstName} ${lastName}`
        }
    }

    const user=new User('jae','park');

    // console.log(user.fullName);
    // user.firstName="wonpil";
    // console.log(user.fullName);
    //여전히 jae park

    //constructor()안에서 한 번 할당되면 고정 => getter setter 쓰자
    
    //user.firstName처럼 프로퍼티로 바로 접근하는 것이 아니라
    //get() set() 메서드를 통해 '경유'해서 설정하는 기법

}

{
    class User{
        firstName:string;
        lastName:string;
        
        get fullName():string{
            return `${this.firstName} ${this.lastName}`
        }

        constructor(firstName:string, lastName:string){
            this.firstName=firstName;
            this.lastName=lastName;
        }

    }

    const user=new User('jae','park');
    
    console.log(user.fullName); //메서드가 아니라 프로퍼티에 접근하는 것처럼 씀
    user.firstName="wonpil";
    console.log(user.fullName);
    //wonpil park
}


{
    class User{

        get fullName():string{
            return `${this.firstName} ${this.lastName}`
        }

        private internalAge=4;

        get age():number{
            return this.internalAge;
        }

        set age(num:number){
            if(num<0) throw new Error("age < 0")
            this.internalAge=num;
        }

        constructor(private firstName:string, private lastName:string){}
    }

    const user=new User('jae', 'park');
    console.log(user); // User { firstName: 'jae', lastName: 'park', internalAge: 4 }
    console.log(user.age); //4 getter 호출 (property처럼)
    user.age=6; //setter 호출
    console.log(user.age); //6


}