jest.mock('./mock.js');
const utilis = require('./mock.js');
utilis.mockImplementation(()=> { return new Object({id:47,name:'Hitman'}); } );


test('Mocking the modules',()=>{
    let bufer = Object.assign(utilis(),{age:40});
    expect(bufer).toEqual({id:47,name:'Hitman',age:40});
});