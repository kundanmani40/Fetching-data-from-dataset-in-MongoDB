const express = require("express");
const http = require("http");

const path = require("path");
const app = express();
const hbs = require("hbs");
require ("./db/conn");
 const Dna = require("./models/registers");

 
const port = process.env.PORT || 3000;
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);


app.get("/",(req,res) => {
		
		res.render("register1");
});
app.get("/login",(req,res) => {
	res.render("login");
	
});
app.get("/indexc",(req,res) => {
	res.render("indexc");
});
app.get("/index1",(req,res) => {
	res.render("index1");
});
app.get("/index2",(req,res) => {
	res.render("index2");
});
app.get("/index",(req,res) => {
	res.render("index");
})
	
app.post("/indexc", async (req,res) => {
	try{
		
	      const Start = req.body.Start;
	      const End = req.body.End;
	 


             const result = await Dna.find({COORDINATE :{$gte :Start , $lte : End}});
		 
		// return res.redirect("/register");
	        res.send(result);

	     //  res.render("register1");
	      	        
		// res.end(); 
		//const result = await Dna.find({COUNT : {$lt :2}});
              // const result = await Dna.find({COORDINATE :{$lt : 9411185},COUNT :{$lt :2}});
	      // res.send(result);
	
	 }catch(err){
	      res.status(400).send(err);
	      }
	
}); 

app.post("/index1", async (req,res) => {
	try{
		
	      const Start = req.body.Start;
	      const End = req.body.End; 
	  //    const result1 = await Dna.find({COORDINATE :{$gte :Start , $lte : End}});
	
	      const result1 =await Dna.aggregate([
		  
		    { $match : {
				COORDINATE :{$gte : 9411183 , $lte : 9411193}
		              //COORDINATE :{$gte :Start , $lte : End}
			}},
		
                     { $group : {
 				_id : "$SAMPLEID",
			      "MaximumValue" : {$max: "$COUNT"},
			      "MinimumValue ": { $min: "$COUNT"}

			   }}

]);    
 
    
	   res.send(result1);
	   console.log(result1);
   
 

		
	      // res.render("register");
	      	        
		// res.end(); 
		//const result = await Dna.find({COUNT : {$lt :2}});
              // const result = await Dna.find({COORDINATE :{$lt : 9411185},COUNT :{$lt :2}});
	      // res.send(result);
	
	 }catch(err){
	      res.status(400).send(err);
	      }
	
});

app.post("/index2", async (req,res) => {
	try{
		
	      const Start = req.body.Start;
	      const End = req.body.End;
	      
             const result2 =await  Dna.aggregate([
		     { "$match" : {
				COORDINATE :{$gte :9411195 , $lte : 9411225}
				//COORDINATE :{$gte : Start , $lte :End }
			}},
                     { "$group" : {
 				_id : null,
			          Average : { $avg : "$COUNT"}

			   }}

]); 
    
	     res.send(result2);
   
	
	 }catch(err){
	      res.status(400).send(err);
	      }
	
});
app.post("/index", async (req,res) => {
	try{
		//const database = client.db("chromosome");
		//const Dna = database.collection("Dna");
		//const results= Dna.createIndex({COORDINATE: 1});
		//console.log(`index : ${results}`);
		const Start = req.body.Start;
		const query = {COORDINATE :  Start};
		//const sort = {COORDINATE : 1};
		//const projection = {COORDINATE: 1};
		const result = await Dna.find(query);
		//.find(query)
		//.sort(sort)
		//.project(projection);
		res.send(result);
		
	
	 }catch(err){
	      res.status(400).send(err);
	      }
	
});

app.post("/login", async (req,res) => {
	try{
		//const result = await Dna.find({COORDINATE :{$lt : 9411185},COUNT :{$lt :2}});
	      //res.send(result);

	
	 }catch(err){
	      res.status(400).send(err);
	      }
	
});
app.post("/register1", async (req,res) => {
	try{
		//res.send(result);
	
	 }catch(err){
	      res.status(400).send(err);
	      }
	
})

app.listen(port ,() => {
	console.log(`Server is Running at Port no ${port}`);
})
