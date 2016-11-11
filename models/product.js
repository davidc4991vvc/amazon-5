var mongoose =require('mongoose');
var mongoosastic = require('mongoosastic');
var elasticsearch = require('elasticsearch');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  category:{ type:Schema.Types.ObjectId,ref:'Category'},
  name:String,
  price:Number,
  image:String
});

ProductSchema.plugin(mongoosastic);

var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'info',
  requestTimeout: Infinity, // Tested
   keepAlive: true // Tested

});


module.exports=mongoose.model('Product',ProductSchema);
