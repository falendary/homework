var express 	        = require("express"),
	config              = require("./config"),
    bodyParser          = require("body-parser"),
    favicon             = require("serve-favicon"),
    morgan              = require("morgan"),
    methodOverride      = require("method-override"),
	ReportModel         = require("./mongoose").ReportModel,
	multer  	        = require("multer"), // middleware для загрузки файлов
    log                 = require("./log")(module)
	app			        = express(),
	done		        = false;


app.use(favicon(__dirname + '/favicon.ico'));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(morgan('combined', {skip: function (req, res) { return res.statusCode < 400 }}));

var server = app.listen(config.port, function () {
	console.log("Server running on http://localhost:"+config.port+" port");
	app.use("/", express.static(__dirname));
	app.get("*", function(req, res)
	{
		res.sendFile(__dirname + "/index.html");
	});
});

app.use(multer({ dest: './uploads/',
	rename: function (fieldname, filename) { //ренеймим полученный файл
	    return filename;
	  },
	onFileUploadStart: function (file) { //для консоли
	  console.log(file.originalname + ' is starting ...')
	},
	onFileUploadComplete: function (file) { 
	  console.log(file.fieldname + ' uploaded to  ' + file.path)
	  done=true;
	}
}));

app.get("/api/reports", function(req, res)
{
	return ReportModel.find(function (err, reports) {
        if (!err) {
            return res.send(reports);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
    });
});

app.post("/api/reports", function(req, res)
{
	var report = new ReportModel({
        reportName: req.body.reportName,
        author: req.body.author,
        city: req.body.city,
        timeStart: req.body.timeStart,
        timeEnd: req.body.timeEnd,
        description: req.body.description,
        photo: req.body.photo
    });


    report.save(function (err) {
        if (!err) {
            log.info("report created");
            return res.send({ status: 'OK', report:report });
        } else {
            console.log(err);
            if(err.name == 'ValidationError') {
                res.statusCode = 400;
                res.send({ error: 'Validation error' });
            } else {
                res.statusCode = 500;
                res.send({ error: 'Server error' });
            }
            log.error('Internal error(%d): %s',res.statusCode,err.message);
        }
    });

})

app.get("/api/reports/:id", function(req, res)
{
	return ReportModel.findById(req.params.id, function (err, report) {
        if(!report) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        if (!err) {
            return res.send({ status: 'OK', report:report });
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
    });
})

app.put("/api/reports/:id", function(req, res)
{
	return ReportModel.findById(req.params.id, function (err, report) {
        if(!report) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }

        report.reportName = req.body.reportName,
        report.author = req.body.author,
        report.city = req.body.city,
        report.timeStart = req.body.timeStart,
        report.timeEnd = req.body.timeEnd,
        report.description = req.body.description,
        report.photo = req.body.photo

        return report.save(function (err) {
            if (!err) {
                log.info("report updated");
                return res.send({ status: 'OK', report:report });
            } else {
                if(err.name == 'ValidationError') {
                    res.statusCode = 400;
                    res.send({ error: 'Validation error' });
                } else {
                    res.statusCode = 500;
                    res.send({ error: 'Server error' });
                }
                log.error('Internal error(%d): %s',res.statusCode,err.message);
            }
        });
    });
})

app.delete("/api/reports/:id", function(req, res)
{
	return ReportModel.findById(req.params.id, function (err, report) {
        if(!report) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        return report.remove(function (err) {
            if (!err) {
                log.info("report removed");
                return res.send({ status: 'OK' });
            } else {
                res.statusCode = 500;
                log.error('Internal error(%d): %s',res.statusCode,err.message);
                return res.send({ error: 'Server error' });
            }
        });
    });
})



app.post('/uploads',function(req,res){
  if(done==true){
    console.log(req.files);
    res.end("File uploaded.");
  }
});