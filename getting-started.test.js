const modul = require('./getting-started');

test('Multiply a by b',()=>{
   expect(modul.multiply(3,2)).toBe(6); //WORKS
});