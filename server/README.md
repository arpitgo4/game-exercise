
# Architecture
## Route <-> Controller <-> Model <-> Database

## Flow
    All the validation regarding the balance of user's in each wallets can be done at MasterWallet Service.
    All the individual crypto wallet related functionality will stay in MicroWallet Services.

## Custom Event Emitters
    Custom Event Emitters are created at './utils/event-emitters.js' for notifiying other parts of the code about certain events, mostly, connection established and initialization with MongoDB and Redis.

## Dynamic File Imports 
    Circular dependencies between some modules have been resolved with runtime requires.
    In Async Programming Environments,
    Import all the dependencies in the entry file, in the independent to dependent order.
    OR, 
    Import files at the runtimes (inside callbacks), when those dependencies will be fully loaded.


# Mongoose
## Schema
    Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.

    ```
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var blogSchema = new Schema({
        title:  String,
        author: String,
        body:   String,
        comments: [{ body: String, date: Date }],
        date: { type: Date, default: Date.now },
        hidden: Boolean,
        meta: {
        votes: Number,
        favs:  Number
        }
    });
    ```

## Model
    To use our schema definition, we need to convert our blogSchema into a Model we can work with. To do so, we pass it into mongoose.model(modelName, schema):

    ```
    // define a schema
    var animalSchema = new Schema({ name: String, type: String });

    // assign a function to the "methods" object of our animalSchema
    animalSchema.methods.findSimilarTypes = function(cb) {
        return this.model('Animal').find({ type: this.type }, cb);
    };

     var dog = new Animal({ type: 'dog' });

    dog.findSimilarTypes(function(err, dogs) {
        console.log(dogs); // woof
    });
    ```

    Note: methods must be added to the schema before compiling it with mongoose.model()
    
    Do not declare methods using ES6 arrow functions (=>). Arrow functions explicitly prevent binding this,so your method will not have access to the document and the above examples will not work.

## Statics
    Adding static methods to a Model is simple as well. Continuing with our animalSchema:
    ```
    // assign a function to the "statics" object of our animalSchema
    animalSchema.statics.findByName = function(name, cb) {
        return this.find({ name: new RegExp(name, 'i') }, cb);
    };

    var Animal = mongoose.model('Animal', animalSchema);
    Animal.findByName('fido', function(err, animals) {
        console.log(animals);
    });
    ```

    _Do not declare statics using ES6 arrow functions (=>). Arrow functions explicitly prevent binding this, so the above examples will not work because of the value of this._

# Request HTTP Module
## POST Request
    ```
    request_post({url: api, body, json: true });
    ```
    json: true => for sending json body without the need to stringify.

# Security Concerns

# TODO
## add kyc status api for sidebar.

## User wallet smart contract (done)
    sweep => send all the ethers/tokens to cold storage
    ownerChange => change the owner
    kill => self destruct

# JWT
## Payload Structure
    ```
        {
            "uid": "3dff4098-b893-40c7-917f-0ad7dad17ffe",
            "trollname": "coinesta",
            "data": {
                "name": "",
                "mobile_code": "",
                "mobile_number": "",
                "email": "abhinav.nishu94@gmail.com",
                "trollname": "coinesta",
                "language": "",
                "timezone": "",
                "verification_level": 0
            },
            "iat": 1520430784,
            "exp": 1527270784,
            "jti": "7iQ0qWJA8C3xT15ZuOsFl9"
        }
    ```

# Mail Events

## User Auth

Password change (done)
KYC Submissions (done)
KYC events (updates)    (done)
Pin change  (done)
New device login
New currency introduced
Login   (done)

## Master Wallet

Deposit confirmed
Deposit detect
Withdraw 
Buy
Sell
Send
