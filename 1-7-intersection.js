{
    function internWork(person) {
        console.log(person.name, person.employeeId, person.work());
    }
    internWork({ name: 'jae', score: 1, employeeId: 30, work: function () { } });
}
