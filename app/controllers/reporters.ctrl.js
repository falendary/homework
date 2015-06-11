homeWork.controller("ReportersController", function ($scope, $http, Upload, $localStorage) {
	$scope.reporters = $localStorage.data || [
		{
			id: 1,
			name: "Сергей Житенев",
			report: "Создание SPA приложений",
			city: "Воронеж",
			timeStart: "14:00",
			timeEnd: "14:30",
			desc: "Создание демонстративного SPA приложения на тему Конференция по программированию",
			photo: null
		}
	];

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
                	for (var i = $localStorage.data.length - 1; i >= 0; i--) {
						if ($localStorage.data[i].id == id) {
							$localStorage.data[i].photo = config.url+"/"+config.file.name;
						};
					};
                });
            }
        }
    };

	// Сохранить
	$scope.saveReporter = function($data, id)
	{
		for (var i = $localStorage.data.length - 1; i >= 0; i--) {
			console.log($localStorage.data[i]);
		};
	}
	// Создать
	$scope.addReporter = function()
	{
		$scope.inserted = {
			id: $scope.reporters.length+1,
			name: '',
			report: '',
			city: '',
			timeStart: '',
			timeEnd: '',
			desc: '',
			photo: ''
		};
		$scope.reporters.push($scope.inserted);
	}
	// Удалить
	$scope.removeReporter = function(index) 
	{
    	$scope.reporters.splice(index, 1);
 	 };
})