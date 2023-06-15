{
    type LoadingState={
        state:'loading'
    };

    type SuccessState={
        state:'success';
        response:{
            body:string;
        };
    };

    type FailState={
        state:'fail';
        reason:string;
    };

    // type ResourceLoadState = LoadingState | SuccessState | FailState;


    function printLoginStates(states:LoadingState | SuccessState | FailState){
        switch(states.state){
            case 'loading':
                console.log("loading...")
                break;
            case 'success':
                console.log(states.response.body);
                break;
            case 'fail':
                console.log(states.reason);
            default:
                throw new Error('에러');
        }

    }

    printLoginStates({state:'loading'}); //loading...
    printLoginStates({state:'success', response:{body:'loaded'}}); //loaded
    printLoginStates({state:'fail', reason:'no network'}); //no network


}