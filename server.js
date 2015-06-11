var express = require('express'),
	multer  = require('multer'), // middleware для загрузки файлов
	app		= express(),
	done	= false;

var server = app.listen(3000, function () {
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

app.post('/uploads',function(req,res){
  if(done==true){
    console.log(req.files);
    res.end("File uploaded.");
  }
});