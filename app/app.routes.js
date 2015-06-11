homeWork.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	$urlRouterProvider.otherwise("/timetable");

	$stateProvider
		.state('timetable', 
		{
			url: "/timetable",
			templateUrl: "app/views/timetable.html"
		})
		.state('docs', 
		{
			url: "/docs",
			templateUrl: "app/views/docs.html"
		})
		.state('reporters', 
		{
			url: "/reporters",
			templateUrl: "app/views/reporters.html"
		});

		$locationProvider.html5Mode(true);
})