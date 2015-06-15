homeWork.controller("DocsController", function ($scope, $http, Upload, reportService, reportsService, $q, $location) {
	
	$scope.reporters = {};

	reportsService.query(function(data)
	{
		$scope.reporters = data;
		// console.log($scope.reporters);
	});
	
		// Сохранить
	$scope.saveReporter = function(reporter)
	{
		console.log(reporter);
		reportService.update(reporter);
	}
	// Создать
	$scope.addReporter = function()
	{
		$scope.inserted = reportsService.create();
		$scope.reporters = reportsService.query()
	}
	// Удалить
	$scope.removeReporter = function(reportId) 
	{
		console.log(reportId);
		reportService.delete({id: reportId});
		$scope.reporters = reportsService.query()
 	 };
})