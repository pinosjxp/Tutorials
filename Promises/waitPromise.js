/*
Promises are objects that handle asynchronous events, such as ajax call, database queries, file reads, etc..., in a clean and easy to use fashion.
They allow code to be more succient and readable, while also giving built-in exception handling.
The Promise constructor takes one function, and that function must take two paramters. They are:
    First Parameter(Normally referred to as "resolve") - Call this function in your code when the asynchronous code succeeds.
    Second Parameter(Normally referred to as "reject") - Call this function in your code when the asynchronous code fails
The Promise object has two methods(I.e. class functions) which are important to us. They are:
    then() - The function that handles successful conditions when the asynchronous code in the Promise finishes.
    catch() - The function that handles failure conditions when the asynchronous code in the Promise finishes.
*/

//This is an example of an asynchronous function that completes after a certain amount of seconds.
//For this version, we Promisfy the callbackWaitTimer() logic so we can use Promise-related functionality.
//It "fails" when the user gives the function more than 5 seconds to wait.
//It "succeeds" after waiting the amount of seconds the user specifies.
let promiseWaitTimer = function(seconds){
    //In our function, note that we always have to return a Promise object since this is mandatory to use Promises.
     return new Promise((resolve, reject)=>{
        if(seconds>5){
            reject(`${seconds} seconds is too long to wait. Try a smaller amount of seconds to wait.`)
        }
        else{
            setTimeout(()=>resolve(seconds), seconds*1000)
        }
    })
}

//Shows callback hell resolution.
//Callback hell, summarized, is having too many nested callbacks, which causes confusion to the reader, weird debug issues, and painful exception-catching.
//Promises "promise" to not have this issue by flattening the callbacks and by simplifying exception handling using then-catch.
//This function shows how we can fix the callback hell issue in the other file's chainingExample() function.
function chainingExample(){
    //First, wait 5 seconds.
    promiseWaitTimer(5)
    //Once 5 seconds have completed, run the function provided to the then() function.
    .then(seconds=>{
        console.log(`Waited ${seconds} seconds`)
        //Now, wait 4 seconds. 
        return promiseWaitTimer(4)
    })
    //Once 4 seconds have completed, run the function provided to the then() function.
    .then(seconds=>{
        console.log(`Waited ${seconds} seconds`)
        //Now, wait 3 seconds.
        return promiseWaitTimer(3)
    })
    //Once 3 seconds have completed, run the function provided to the then() function.
    .then(seconds=>{
        console.log(`Waited ${seconds} seconds`)
        //Now, wait 2 seconds.
        return promiseWaitTimer(2)
    })
    //Once 2 seconds have completed, run the function provided to the then() function.
    .then(seconds=>{
        console.log(`Waited ${seconds} seconds`)
        //Finally, wait 1 second.
        return promiseWaitTimer(1)
    })
    //Once 1 second has completed, run the function provided to the then() function.
    .then(seconds=>{
        console.log(`Waited ${seconds} second`)
        //We are done.
    })
    //In case any one of these fails, catch the error here.
    .catch(err=>{
        console.log(err)
    })
}

//Example of waiting for all promises to finish.
//Normally, this process of waiting for multiple asynchronous calls to ALL complete before doing something is painful to deal with code-wise(I.e. See other file).
//You can handle stuff like that with helpful libraries like Async(https://caolan.github.io/async/) if your using callbacks, but why do that when you can use Promise.all()...
//Promise.all() takes an array of Promise objects and it waits until everyone completes before it fires the callback provided to the then() function.
//This function will fire all callbacks simultaneously, and wait until the longest Promise(I.e. promiseWaitTimer(5)) finishes.
function allExample(){
    //We are going to set 5 timers, waiting for 1-5 seconds until the complete.
    Promise.all([
        promiseWaitTimer(5),
        promiseWaitTimer(4),
        promiseWaitTimer(3),
        promiseWaitTimer(2),
        promiseWaitTimer(1)
    ])
    //Once the last Promise finishes(I.e. promiseWaitTimer(5)), run the function provided to the then() function.
    .then(seconds=>{
        console.log('Everything finished. Here are the results: ', seconds)
        //We are done.
    })
    //In case any of these promises fails, catch the error here.
    .catch(err=>{
        console.log(err)
    })
}

/* Uncomment the lines below to run the code. */
//chainingExample()
//allExample()