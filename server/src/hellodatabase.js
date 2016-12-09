var MongoClient = require('mongodb').MongoClient;

//connect to database named facebook
var url  = 'mongodb://localhost:27017/facebook';
MongoClient.connect(url,function(err,db){
  if(err){
    throw new Error("Could not connect to database :"+ err);
  }
  else{
    console.log(("Connected to server. "));
    // perform other actions here since we are Connected
    mongoExample(db);
  }
});

/**
* Inserts a simple document into the 'helloworld'
* document collection.
* @param db The database connection
* @param callback A callback function to call once the
*   operation completes. We will pass back the new object's
*   ID.
*/

function insertExample(db,callback){
  //A doc is just a JSON object, like in our mock db

  var exampleDocument = {
    message : "Hello , World!"
  };
  //Insert the exampleDocument into collection helloworld
  db.collection('helloworld').insertOne(exampleDocument,function(err,result){
    if(err){
      //shit hit the fan
      throw err;
    }
    else{
      //Success!
      console.log("Successfully updated db! The new object's ID is "+ result.insertedId);
      callback(result.insertedId);
    }
  });
}
/**
* Get a document from the helloworld document collection with
* a particular _id.
* @param db The database connection.
* @param id The _id of the object to retrieve.
* @param callback A callback function to run when the operation completes.
*   It is called with the requested object.
*/
function getHelloWorldDocument(db, id,callback)
{
  //our query find an object with this _id
  var query = {
    "_id": id
  };
  //returns the first object that matches query
  //since _id must be uniquw, there will only be one match
  db.collection('helloworld').findOne(query, function(err,doc){
    if(err){
      //shit hit the fan
      throw err;
    }
    else{
      //we probably found it else doc will be null
      callback(doc);
    }
  });
}

/**
* Add a new document to helloworld collection, read the document,
* print the document.
*/
function mongoExample(db){
  //Step 1: Insert the document
  insertExample(db,function(newId){
    //Step 2 read the document
    getHelloWorldDocument(db,newId, function(doc){
      //Step 3: print the document
      console.log("Wrote new project to helloworld collection");
      console.log(doc);
    });
  });
}
