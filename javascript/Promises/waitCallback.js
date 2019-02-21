//This is an example of an asynchronous function that completes after a certain amount of seconds.
//Normally, we pass callbacks in order to run code after a certain point in the asynchronous function(I.e. when the timer completes, getting data from an ajax call, etc...)
let callbackWaitTimer = function(seconds, cb){
    if(seconds>5){
        throw new Error(`${seconds} seconds is too long to wait. Try a smaller amount of seconds to wait.`)
    }
    else{
        setTimeout(()=>{cb(seconds)}, seconds*1000)
    }
}
//Shows callback hell example.
//Notice that the more code and callbacks we place in this function, the more horrendous the indentation will be...
//Exception handling is not too bad in this case, but imagine having to do try-catch on every callback(I.e. adding a catch after every then with Promises).
//The amount of code, indentation, and places to mess up increases dramatically.
function chainingExample(){
    try{
        callbackWaitTimer(5, function(seconds){
            console.log(`Waited ${seconds} seconds`)
            callbackWaitTimer(4,function(seconds){
                console.log(`Waited ${seconds} seconds`)
                callbackWaitTimer(3,function(seconds){
                    console.log(`Waited ${seconds} seconds`)
                    callbackWaitTimer(2,function(seconds){
                        console.log(`Waited ${seconds} seconds`)
                        callbackWaitTimer(1,function(seconds){
                            console.log(`Waited ${seconds} seconds`)
                        })
                    })
                })
            })
        })
    }
    catch(err){
        console.log(err);
    }
}

//Helper function to do asynchronous work without hitting weird race conditions or closure issues.
//You have to write something similar to this, or use a third party library like Async(https://caolan.github.io/async/).
function all(array, callback){
    let counter = array.length
    let data = new Array(counter)
    let finished = () => {
        counter--
        if(counter===0){
            callback(data)
        }
    }
    array.forEach((element, index) => {
        (function(func, i){
            func((d) => {
                data[i] = d
                finished()
            })
        })(element, index)
    });
}
//Example of waiting for all callbacks to finish.
//This fires a bunch of asynchronous callbacks and fires the callback only when all of them have completed.
//While this is not too bad, code-wise, promises in the other example file show a cleaner 
function allExample(){
    //Fire all of the timers at once.
    try{
        all([
            (cb)=>{callbackWaitTimer(5, cb)}, 
            (cb)=>{callbackWaitTimer(4, cb)}, 
            (cb)=>{callbackWaitTimer(7, cb)}, 
            (cb)=>{callbackWaitTimer(2, cb)}, 
            (cb)=>{callbackWaitTimer(1, cb)}
        ], 
        //When the last timer completes(I.e. (cb)=>{callbackWaitTimer(5, cb)}), run the callback below.
        (seconds)=>{
            console.log('Everything finished. Here are the results: ', seconds)
        })
    }
    //In case any of the callbacks fail, we handle the error here.
    catch(err){
        console.log(err)
    }

}
/* Uncomment the lines below to run the code */
//chainingExample()
//allExample()