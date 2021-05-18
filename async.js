//CALLBACK
function asyncFunction(callback){
    let x = ['one','two','three','four'];
    let set = new Set(x);
    callback(set);
}

exports.async = asyncFunction;

//PROMISE

function promiseFunction(a,b){
    return new Promise((resolve,reject)=>{
        if(a+b==3)resolve(true);
        else reject(false);
    });
}

exports.promise = promiseFunction;