var homeWork = angular.module("homeWork", 
	[
		"ui.router", // роутер
		"ngResource", // ngresource
		"ngStorage", // локалсторож
		"mainService",
		"xeditable", // красивые формы
    	"ngFileUpload", // Загрузка файлов
    	"ui.bootstrap" // ui bootstrap
	]);

homeWork.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});