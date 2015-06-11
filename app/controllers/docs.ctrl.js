homeWork.controller("DocsController", function ($scope, $http, $localStorage) {
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

})