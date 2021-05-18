exports.true = function(){
    return true;
}
exports.false = function(){
    return false;
}
exports.number = function(){
    return 12;
}
exports.floatingPoints = function(){
    return 11.25;
}
exports.iterable = function(){
    return ['beer','coffee','pasta','fries','vegetables'];
}
exports.error = function(){
    throw new Error('404:Not Found');
}