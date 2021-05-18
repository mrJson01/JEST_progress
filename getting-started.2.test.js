const modul = require("./getting-started.js");

test('Divide a by b ',()=>{
   expect(modul.divide(6,2)).toEqual(3); 
});