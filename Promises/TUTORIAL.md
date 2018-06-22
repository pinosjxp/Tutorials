# Tutorial

## What are promises?
[Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) serve as nice wrappers for asynchronous pieces of code. Normally, any callback can be wrapped in a promise, but its most suited for things like network requests, file I/O operations, database interactions, etc... They have three states associated with them, which are:
* Pending: The code defined in the promise is running.
* Resolved: The code has completed successfully. This state triggers the callback passed to the `Promise.then()` method.
* Rejected: The code has completed, but failed in some way. This state triggers the callback passed to the `Promise.catch()` method.

The promise object also comes with two methods, `then()` and `catch()`, which handles the resolving(I.e. success) and rejecting(I.e. failure) of the Promise. These methods take callbacks that get fired when the promise resolves/rejects, and they should return Promises as well. If a promise is not returned, the promise object implicitly return a Promise, to allow for promise chaining.

For example, if we wrapped an ajax call with a promise, we would have successful requests, such as a status code of 200 resolve the promise, and 400-500 status code reject the promise. We can handle the data that comes back from a 200 inside the `then()` and maybe log an error inside the `catch()`.

## Why do we need them?
Lets take a look at a standard asynchronous callback chain (minus error checking):
```javascript
//Assume Jquery $.get() takes url as first parameter and callback as second parameter.
$.get('/schools',function(schools){
    $.get(`/schools/${schools[0].id}/classrooms`,function(classrooms){
        $.get(`/classrooms/${classrooms[0].id}/students`,function(students){
            $.get(`/students/${students[0].id}`,function(student){
                console.log(student)
                //Rest of code here...
            })
        })
    })
})
```
This callback chain drills through a REST-like api to find detailed user info on the first user that it can find. There's not too many lines of code here, but imaging drilling through a REST api with many layers of resources to get similar information. What about adding a callback after each request to do some preprocesing (E.g. converting the data to JSON, filtering)? This chain of callbacks can get very large quickly... 
```javascript
//Assume Jquery $.get() takes url as first parameter and callback as second parameter.
$.get('/schools', function(schools){
    convertToJSON(schools, function(parsedSchools){
        filterBadSchools(parsedSchools, function(goodSchools){
            $.get(`/schools/${goodSchools[0].id}/classrooms`, function(classrooms){
                convertToJSON(classrooms, function(parsedClassrooms){
                    filterAPClassrooms(parsedClassrooms, function(APClassrooms){
                        $.get(`/classrooms/${APClassrooms[0].id}/students`, function(students){
                            convertToJSON(students, function(parsedStudents){
                                $.get(`/students/${parsedStudents[0].id}`, function(student){
                                    console.log(student)
                                    ...
                                })
                            })
                        })
                    })
                })
            })
        })
    })
})
```
Unfortunately, this is the nature of functional programming languages (I.e. [Javascript](https://en.wikipedia.org/wiki/JavaScript), [Haskell](https://www.haskell.org/), [Lisp](https://en.wikipedia.org/wiki/Lisp_(programming_language))), and it leads to a thing called [callback hell](http://callbackhell.com/). In Javascript's case though, we can resolve this issue of callback hell by using promises.
```javascript
//Assume JQuery $.get() returns a promise.
$.get('/schools')
.then(convertToJSON)
.then(parsedSchools=>filterBadSchools(parsedSchools))
.then(goodSchools=>$.get(`/schools/${goodSchools[0].id}/classrooms`))
.then(convertToJSON)
.then(parsedClassrooms=>filterAPClassrooms(parsedClassrooms))
.then(APClassrooms=>$.get(`/classrooms/${APClassrooms[0].id}/students`))
.then(convertToJSON)
.then(parsedStudents=>$.get(`/students/${parsedStudents[0].id}`))
.then(student=>console.log(student))
.catch(err=>console.log(err))
```
As shown above, we were able to completely flatten the prior callback chain using the Promise methods `then()` and `catch()`, which also made the code a bit more succinct and readable.

## How do I use them?
Lets use this simple `waitTimer()` function as a base point for wrting a Promise-based function.
```javascript
//This function will wait n seconds untill running the callback with the number of seconds ran.
let waitTimer = function(seconds, callback){
    setTimeout(function(){
        callback(seconds)
    }, seconds*1000)
}
```
First, we create a function that we can call to run the asynchronous code.
```javascript
//New function
let promiseWaitTimer = function(seconds){
    ...
}
```
Next, we create and return a promise in the function.
```javascript
//Instantiate the Promise object
let promiseWaitTimer = function(seconds){
    return new Promise(...)
}
```
Give the Promise construtor a callback with two parameters.
```javascript
//Noticed we named the paramters resolve and reject for readablilty.
let promiseWaitTimer = function(seconds){
    return new Promise(function(resolve, reject){
        ...
    })
}
```
Now we can add the actual code that performs the wait operation.
```javascript
//Add the setTimeout() function.
let promiseWaitTimer = function(seconds){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve(seconds)
        }, seconds*1000)
    })
}
```
Note that when calling `resolve()` or `reject()`, you can provide a single paramter to then in order to return a value to the `then()` and `catch()` promise methods. Here, when the promise resolves I.e. completes sucessfully), the number of seconds waited gets returned.

We can also handle errors with `reject()`. With this function, lets say we want to prevent waiting for a long time, or from users inputing negative seconds. Below is how we would do that.
```javascript
//Prevent seconds larger than 10 from processing
let promiseWaitTimer = function(seconds){
    return new Promise(function(resolve, reject){
        if(seconds>10 || seconds<1){
            reject('Wait time is too large or too small.')
        }
        else{
            setTimeout(function(){
                resolve(seconds)
            }, seconds*1000)
        }
    })
}
```
Now, to call your custom made promise, just call the function and chain the `then()` and `catch()` methods afterwards.
```javascript
let promiseWaitTimer = function(seconds){
    return new Promise(function(resolve, reject){
        if(seconds>10 || seconds<1){
            reject('Wait time is too large or too small.')
        }
        else{
            setTimeout(function(){
                resolve(seconds)
            }, seconds*1000)
        }
    })
}
//Call the function. It returns a promise object.
promiseWaitTimer(5)
//Specify the callback to run when the promise resolves.
.then(function(seconds){
    console.log(`Waited ${seconds} seconds`)
})
//Specify the callback to run if the promise rejects.
.catch(function(err){
    console.log(err)
})
```
## When/Where do I use them?
TODO
## Advaned usage
### Promise.all()
`Promise.all()` allows the developer to wait for a group of promise to all complete before continuing. The awesome part about this method is that it also returns a promise, which means that you can still use promise chaining with this method.
```javascript
//Wait until all promises resolves. The longest wait time is 5 seconds so it should resolve around that time.
Promise.all([
    promiseWaitTimer(5),
    promiseWaitTimer(4),
    promiseWaitTimer(3),
    promiseWaitTimer(2),
    promiseWaitTimer(1)
])
//After the promise above resolves (5 secs), wait another 5 seconds
.then(function(results){
    console.log(`Here is the result from the prior promises: ${results}`)
    return promiseWaitTimer(5)
})
//After waiting another 5 seconds, complete.
.then(function(){
    console.log(`10 seconds have passed.`)
})
//Catch errors just in case.
.catch(function(err){
    console.log(err)
})
```
### Promise.race()
`Promise.race()` allows the developer to provide a group of promises and as soon as one of the promises in the group either resolve or reject, the `Promise.race()` method resolves or rejects itself. It too can be chained since it returns a promise.
```javascript
//Here, the promiseWaitTimer(1) completes first since it waits the least amount of seconds, and as a result, the Promise.race() will resolve.
Promise.race([
    promiseWaitTimer(5),
    promiseWaitTimer(4),
    promiseWaitTimer(3),
    promiseWaitTimer(2),
    promiseWaitTimer(1)
])
//We log the first result.
.then(function(seconds){
    console.log(`This is the promise that resolved first in the group: promiseWaitTimer(${seconds})`)
})
//Catch the first error.
.catch(function(err){
    console.log(err)
})
```
## Helpful Links
* Bluebird - A helper Promise library that adds extra functionality on top of the basic `Promise.all()` and `Promise.race()` functions (http://bluebirdjs.com/docs/getting-started.html)
* Google (https://developers.google.com/web/fundamentals/primers/promises)
* MDN (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
* Eric Elliot's Take on Promises (https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261)