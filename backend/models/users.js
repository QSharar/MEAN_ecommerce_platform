var mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});



const Users = mongoose.model('User', userSchema);

module.exports.addUser = (user) => {
    return new Promise( (resolve,reject) => { Users.create(user, (err) => 
        {
            if(err){
                console.log("error adding proudct")
                reject();
            
            }else{
                console.log("successfully added");
                resolve();
            
            }
        })
    })
}

module.exports.findUser = (email) => {
    
    return new Promise( (resolve, reject) => {
        
        Users.find(email, (err, user) => {
        
        if(err){
            reject(err);
           
        }else{

            resolve(user);
        }
    })
})
}
