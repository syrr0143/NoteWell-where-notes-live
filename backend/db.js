const mongoose = require('mongoose');
/* this function used to deo the same work earlier but as of now this is discarded if yo  
will use this then you will get the error , so you have to use the new async await function to get your work done 
const mongoose = require('mongoose');
const mongoURL = "mongodb://localhost:27017";
const connectToMongo = ()=>{
    mongoose.connect(mongoURL,()=>{
        console.log("connected to mongo successfully");
    }); 
}
module.exports=connectToMongo;

*/

/* one thing to note here is that most of time the below function will not work 

const mongoURL = 'mongodb://localhost:27017';

in this condition we have to use the new mongourl function that should work 


The reason it worked with this connection string is that it explicitly instructs MongoDB to use the IPv4 loopback address (127.0.0.1) and the default MongoDB port (27017). In contrast, when you use 'mongodb://localhost:27017', MongoDB may attempt to use IPv6 (::1) or another mechanism that didn't work correctly in your setup.
*/

const mongoURL = 'mongodb://127.0.0.1:27017';
const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectToMongo;
