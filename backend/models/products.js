var mongoose = require('mongoose');


const productSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    subtitle: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true
    }
})



const Products = mongoose.model('Product', productSchema);

module.exports.addProduct = (prodObject) => {
    return new Promise( (resolve,reject) => { Products.create(prodObject, (err) => 
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

module.exports.findProduct = (id) => {
    
    return new Promise( (resolve, reject) => {
        
        Products.find(id, (err, product) => {
        
        if(err){
            reject(err);
           
        }else{
            resolve(product);
        }
    })
})
}