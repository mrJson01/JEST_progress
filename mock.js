module.exports = function(){
    //For instance it gets data form MYSQL server and returns them asynchronusly
    
    return new Promise((resolve,reject)=>{
        resolve({id:'47',name:'Hitman'});
    });
}