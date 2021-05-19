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

* jest (all tests in a folder) <br/>
    * pattern (my-test => my-test.js) <br/>
    * specified path to file <br/>
    * !!! -o ,run test on changed files based on git <br/>
    * --findRelatedTests name(runs test that are related to specified name) <br/>
    * watch , runs jest -o by default <br/>

# Testing Asynchronous code

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
### Async/Await with resolves/rejects

```javascript
test('the data is peanut butter',async()=>{
    await expect(fetchData()).resolves.toBe('peanut butter');
});
```

# Setup and Teardown

You can set a code that will run **before** and **after** each of tests. <br/>
Also you can set some function to execute on the beggining of the file or at the end of the file. <br/>

```javascript
beforeEach(()=>{
    initializeCityDatabase() //or return initializeCityDatabase if function returns Promise so that how you handle it
});

afterAll(()=>{
    clearCityDatabase();
});

```

### Scoping

By default **before** and **after** blocks apply to every test in a file but you can group them together by using **describe** block. <br/>

```javascript

beforeEach(()=>{
    //do something 
});

describe('This setup will apply only to test within describe block',()=>{
    beforeEach(()=>{
        //do something
    });
});

```

Order of execution of **before** and **after** blocks. <br/>

```javascript

beforeAll(() => console.log('1 - beforeAll'));
afterAll(() => console.log('1 - afterAll'));
beforeEach(() => console.log('1 - beforeEach'));
afterEach(() => console.log('1 - afterEach'));
test('', () => console.log('1 - test'));
describe('Scoped / Nested block', () => {
  beforeAll(() => console.log('2 - beforeAll'));
  afterAll(() => console.log('2 - afterAll'));
  beforeEach(() => console.log('2 - beforeEach'));
  afterEach(() => console.log('2 - afterEach'));
  test('', () => console.log('2 - test'));
});

// 1 - beforeAll
// 1 - beforeEach
// 1 - test
// 1 - afterEach
// 2 - beforeAll
// 1 - beforeEach
// 2 - beforeEach
// 2 - test
// 2 - afterEach
// 1 - afterEach
// 2 - afterAll
// 1 - afterAll
beforeAll(() => console.log('1 - beforeAll'));
afterAll(() => console.log('1 - afterAll'));
beforeEach(() => console.log('1 - beforeEach'));
afterEach(() => console.log('1 - afterEach'));
test('', () => console.log('1 - test'));
describe('Scoped / Nested block', () => {
  beforeAll(() => console.log('2 - beforeAll'));
  afterAll(() => console.log('2 - afterAll'));
  beforeEach(() => console.log('2 - beforeEach'));
  afterEach(() => console.log('2 - afterEach'));
  test('', () => console.log('2 - test'));
});

// 1 - beforeAll
// 1 - beforeEach
// 1 - test
// 1 - afterEach
// 2 - beforeAll
// 1 - beforeEach
// 2 - beforeEach
// 2 - test
// 2 - afterEach
// 1 - afterEach
// 2 - afterAll
// 1 - afterAll

```
JEST firstly execute all setups and describe blocks before doing a tests. <br/>
Once describe blocks are colpeted JEST runs the tests in the correct order. <br/>
If the test is fail you can check if it will fail when it is the only test that is execute <br/>
You can do it by **test.only()** <br/>
If under this under this circumstance test does not fail it may means that other test interfering with it. <br/>

# Mock Functions

Mock functions allow you to test the links between code by erasing the actual implementation of a function, <br/>
capturing calls to the function (and the parameters passed in those calls), <br/>
capturing instances of constructor functions when instantiated with new, <br/>
and allowing test-time configuration of return values. <br/>
**module.export** does not work well with mocking callback function. <br/>

### .mock property

All mock function have **.mock** property that contains data about what function returned and tracks the value of **this** for each call. <br/>

```javascript
mockFunction.mock.calls.length;
mockFunction.mock.calls[0][0];
mockFunction.mock.results[0].value;
mockFunction.mock.instances.length; //You can instance the mock function
mockFUnction.mock.instances[0].name;
```

This is how to create instance of mock Function: <br/>

```javascript

const myMock = jest.fn();
const a = new myMock();
const b = {};
const bound = myMock.bind(b);
bound();

```

### Mock Implementations

The **mock Implementation** method can replace the implementation of the function <br/>
that is created in another module: 

```javascript
jest.mock('../foo');
const foo = require('../foo');
foo.mockImplementation(()=>42);
foo(); // > 42
```

if the function returns different value each time you can use **.mockImplementationOnce. <br/>
You can also define the default implementation by using **.fn()**. <br/>
To name mock so it will be displayed as something other than **mock.fn()** <br/>
use **mock.mockName('name')**. <br/>

For methods that are typically chained and have to return **this** <br/>
you can use **.mockReturnThis()** <br/>

```javascript
const mockObj = {
    myMethod : jest.fn().mockReturnThis()
};
```

### Custom Matchers
Use with expect().
* .toHaveBeenCalled() <br/>
* .toHaveBeenCalledWith(arg1,arg2) <br/>
* .toHaveBeenLastCalledWith(arg1,arg2) <br/>
* .toMatchSnapshot() <br/>

### Useful

*.mockReturnValueOnce() <br/>
* _array_.filter() ->filters given array (np. [1,2].filter()) <br/>

