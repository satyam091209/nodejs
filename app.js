const mongoose=require("mongoose")
mongoose.set('strictQuery', true);
//connection ceation and new db
const mongodb="mongodb://127.0.0.1/satmongo" ;
mongoose.connect(mongodb,(err)=>{
    if(err)
    {
        console.log(err);
    }
    else{
        console.log("Connected");
    }
});

// schema
//A mongoose schema defines the structure of the document,
// default values , validators , etc.

const fd=new mongoose.Schema({// fd is object or instance
    name:{
        type:String,
        required:true,
    },
    ctype:String,
    rollno:Number,
    active:Boolean,
    date:{
        type:Date,
        default:Date.now
    }

})
//A mongoose model is a wrappe on the mongoose schema.
//A mongoose schema defines the structure of the document.
//default values, validators , etc., whereas a mongoose model
//provides an interface to the database for creating , 
//quering  , updating , deleting records , etc.
//we can say that creating collections  using model
//collection creation
const F=new mongoose.model("fdatabase" , fd)// here F is class so it is in capital letter.

//create document or insert document
const create=async()=>{
    try{
        const frstdoc=new F({
            name: "Satyam Bhaskar",
            ctype:"Student",
            rollno:09,
            active:true
        
        })
        const result= await frstdoc.save();
        console.log(result);
    }catch(err)
    {
        console.log(err);   
    }
}
create();
