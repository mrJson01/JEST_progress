const modul = require('./using-matchers');

test('Should return false',()=>{
    expect(modul.false()).toBeFalsy(); 
    expect(null).toBeFalsy();
    expect(undefined).toBeFalsy();
});

test('Decimal numbers tests',()=>{
    //modul.number returns 12
    expect(modul.number()).toBeGreaterThan(10);
    expect(modul.number()).toBeGreaterThanOrEqual(12);
    expect(modul.number()).toBeLessThan(20);
    expect(modul.number()).toBeLessThanOrEqual(12);
    expect(modul.number()).toBe(12);
});

test('Floating points tests',()=>{
    expect(modul.floatingPoints()).toBeCloseTo(11.25);
})

test('Test if the array and object contains specified value',()=>{
    expect(modul.iterable()).toContain('vegetables');
    expect(new Set(modul.iterable())).toContain('beer');
});

test('Test if function Throws Error',()=>{
    expect(()=>modul.error()).toThrow(Error);
    expect(()=>modul.error()).toThrow('404:Not Found');
});