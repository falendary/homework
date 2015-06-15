var services = angular.module("mainService", ["ngResource"]);

services.factory("reportsService", function ($resource) {
	return $resource('api/reports/', {}, {
		query: {method: "GET", isArray: true},
		create: {method: "POST"}
	});
})

services.factory("reportService", function ($resource) {
	return $resource('api/reports/:id', {}, {
		show: {method: "GET"},
		update: {method: "PUT", params: {id: '@_id'} },
		delete: {method: "DELETE", params: {id: '@id'} }
	});
});