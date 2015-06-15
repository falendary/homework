var mongoose	= require("mongoose"),
	config 		= require("./config.json");

mongoose.connect(config.mongoose.uri);

var db = mongoose.connection;

db.on("error", function (err) {
	console.log(err.message)
})

db.once("open", function callback()
{
	console.log("connected to db");
})

var Schema = mongoose.Schema;

var Report = new Schema(
	{
		author: {type: String},
		reportName: {type: String},
		city: {type: String},
		timeStart: {type: Date},
		timeEnd: {type: Date},
		description: {type: String},
		photo: {type: String}
	}
);
var ReportModel = mongoose.model("Report", Report);

module.exports.ReportModel = ReportModel;