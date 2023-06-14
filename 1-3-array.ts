{
    // array
    const fruits:string[]=['tomato','banana'];
    const scores:Array<number>=[1,2,3];
    function printArray(fruits:readonly string[]){}


    // tuple 권장하지 않음
    let student:[string, number];
    student=["jae",30];
    student[0] //jae
    student[1] //30
    const [name,age]=student;
}