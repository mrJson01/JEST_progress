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
### Truthiness <br/>
<br/>
In nutshell , Use it if you need distingush between null,undefined,false <br/>
<br/>
<br/>
.toBeNull <br/>
not.toBeNull <br/>
.toBeUndefined <br/>
.toBeDefined <br/>
.toBeTruthy <br/>
.toBeFalsy <br/>
<br/>
### Strings <br/>
<br/>
.toMatch() , value is regular expression <br/>
<br/>
### Exceptions <br/>
<br/>
<br/>
.toThrow - checks if function throws error when called <br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

# Using JEST via command lines<br/>
<br/>
* jest (all tests in a folder) <br/>
    * pattern (my-test => my-test.js) <br/>
    * specified path to file
    * !!! -o ,run test on changed files based on git
    * --findRelatedTests name(runs test that are related to specified name)
    * watch , runs jest -o by default
    
