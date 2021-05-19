const modul= require('./mock-functions');
const mockCallback = jest.fn(x => x*2);

modul.foE([2,4],mockCallback);

test('Test',()=>{
    
    expect(mockCallback.mock.calls.length).toBe(2);
    expect(mockCallback.mock.results[0].value).toBe(4);
    
});

test('mock return values',()=>{
    const myMock = jest.fn();
    myMock.mockReturnValueOnce(10).mockReturnValueOnce('x');
    console.log(myMock(),myMock());
});

test('Filtering an array',()=>{
    const filterMock = jest.fn();
    
    filterMock.mockReturnValueOnce(true).mockReturnValueOnce(false).mockReturnValueOnce(true);
    
    const result = [100,200,300].filter(num =>filterMock(num));
    console.log(result);
});

