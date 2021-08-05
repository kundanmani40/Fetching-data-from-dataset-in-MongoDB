const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema({
                     SAMPLEID: {
                         type: String,
                         required : true
                         
                         },
                    COORDINATE :{
                        type:Number,
                        required:true,
			default: undefined
			//index: true
     
                        },
                   COUNT:{
                        type:Number,
                        required:true
                        
                        },
		  QUANTIFICATION :{
			type : Number,
			required : true
			}
                        
                        
})
employeeSchema.index({COORDINATE: 1});
//define collection
const Dna = new mongoose.model("Dna",employeeSchema );
//const Dna = new mongoose.model("Dna",employeeSchema,"dnas");
module.exports = Dna;
