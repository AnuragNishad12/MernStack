const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path')



mongoose.connect('mongodb://127.0.0.1:27017/Start_Up', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
    console.log('Database is Connected');
})

const app = express();
app.use(cors());
app.use(bodyParser.json());

const userSchema = new mongoose.Schema({
    SNo:{
     type:Number,
     required:true
    },
    Date:{
        type:Date,
        required:true
    },
    StartupName:{
        type:String,
        required:true
    },
    IndustryVertical:{
        type:String,
        required:true
    },
    SubVertical:{
        type:String,
        required:true
    },
    CityLocation:{
        type:String,
        required:true
    },
    InvestorsName:{
        type:String,
        required:true
    },
    InvestmentType:{
        type:String,
        required:true
    },
    AmountInUSD:{
        type:String,
        required:true
    },

})

app.use(express.static(path.join(__dirname,'./InterProject/dist')));
app.get('*',function(req,res){
    res.send(path.join(__dirname,'./InterProject/dist/index.html'));
})

const User = mongoose.model('users',userSchema);

app.get('/api/data/', async (req, res) => {
    try {
      
        console.log('Fetching data...');
      const data = await User.find();
      console.log('Data fetched successfully:', data);
      res.json(data);
      console.log(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


app.listen(5000,()=>{
    console.log('Server is running on port 5000');
})
