const modul = require('./async.js');

//CALLBACK
test('Test of a asynchronous function',()=>{
    function callback(data){
        try{
            expect(data).toEqual(new Set(['one','two','three','four']));
        }catch(error){
            done(error);
        }
    }
    
    modul.async(callback);
});


//PROMISE

test('Test of a Promise function',()=>{
    expect.assertions(1);
    return modul.promise(1,2).then((flag)=>{expect(flag).toBeTruthy();}); //HAVE TO RETURN THE PROMISE 
});

//RESOLVES AND REJECTS MATCHERS (PROMISE)

test("Test Promise with Matcher resolves",()=>{
    return expect(modul.promise(1,2)).resolves.toBeTruthy();
});

test('Test Promise with Matcher rejects',()=>{
    return expect(modul.promise(1,1)).rejects.toBeFalsy();
});


// ASYNC/AWAIT

test("Test with Async/Await",async ()=>{
   
    const flag = await modul.promise(1,2);
    expect(flag).toBeTruthy();
});
