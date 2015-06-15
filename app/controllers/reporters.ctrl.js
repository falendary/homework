homeWork.controller("ReportersController", function ($scope, $http, Upload, reportService, reportsService, $q, $location) {

	$scope.reporters = {};

	reportsService.query(function(data)
	{
		$scope.reporters = data;
		// console.log($scope.reporters);
	});
	


	$scope.upload = function (files, id) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                Upload.upload({
                    url: '/uploads',
                    file: file
                })
                .success(function (data, status, headers, config) {
                	console.log(config);
                	for (var i = $scope.reporters.length - 1; i >= 0; i--) {
						if ($scope.reporters[i]._id == id) {
							$scope.reporters[i].photo = config.url+"/"+config.file.name;
						};
					};
                });
            }
        }
    };

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