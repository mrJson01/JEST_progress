# List of things that I learned about JEST

* Works both with module.exports and exports.nazwa <br/>
* Function declaration tested: <br/>
    * function  name <br/>
    * var nazwa = ()=>{} <br/>
    * exports.nazwa = function(){} <br/>
    
expect() - return "expection" object and you can call matchers on it. <br/>

.toBe -checks exact equality <br/>
.toEqual -checks the value of an object or iterable<br/>
.not. - the equivalent of ! (true=false , false=true)<br/>
<br/>
### Truthiness 
In nutshell , Use it if you need distingush between null,undefined,false <br/>
.toBeNull <br/>
not.toBeNull <br/>
.toBeUndefined <br/>
.toBeDefined <br/>
.toBeTruthy <br/>
.toBeFalsy <br/>
<br/>
### Strings 
.toMatch() , value is regular expression <br/>
<br/>
### Exceptions 
.toThrow - checks if function throws error when called <br/>
<br/>
<br/>
# Using JEST via command lines
<br/>
* jest (all tests in a folder) <br/>
    * pattern (my-test => my-test.js) <br/>
    * specified path to file <br/>
    * !!! -o ,run test on changed files based on git <br/>
    * --findRelatedTests name(runs test that are related to specified name) <br/>
    * watch , runs jest -o by default <br/>
<br/>
# Testing Asynchronous code
<br/>
Jest needs to know when the code it is testing has completed.<br/>
By default JEST test ends once it reach end of its execution.<br/>

```javascript
test('the data is peanut butter', () => {
  function callback(data) {
    expect(data).toBe('peanut butter');
  }

  fetchData(callback);
});

```
### Callbacks
Test will end as soon as fetchData complete <br/>
done() ,it is callback ,JEST will wait until done callback is called before finishing the test. <br/>
if done is never called the test will fail because of timeout error. When expect() fails it throws error that can be catched <br/>
Can't export module in this way: <br/>
```javascript
module.exports = name;
```
,but it possible to do it in this way: <br/>
```javascript
export.name = name;
```
<br/>
### Promises
It is easier to handle the Promis beacause when Promise is rejected the test fail.<br/>
```javascript
test('the data is peanut butter', () => {
  return fetchData().then(data => {
    expect(data).toBe('peanut butter');
  });
});
```
Remember to return the Promise otherwise the test will end before then() statement have a chance to be executed. <br/>
If you expect the Promise to be rejected use catch() method. <br/>
You can also use **resolves** and **rejects** as a Matcher. <br/>
### Async/Await
<br/>
```javascript

test('the data is peanut butter', async () => {
  const data = await fetchData();
  expect(data).toBe('peanut butter');
});

test('the fetch fails with an error', async () => {
  expect.assertions(1);
  try {
    await fetchData();
  } catch (e) {
    expect(e).toMatch('error');
  }
});

```
<br/>
### Async/Await with resolves/rejects
<br/>
```javascript
test('the data is peanut butter',async()=>{
    await expect(fetchData()).resolves.toBe('peanut butter');
});
```