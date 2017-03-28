var mainApplicationModuleName = 'timesheet';
var mainApplicationModule = angular.module(mainApplicationModuleName ,
    [
        'ui.router',
        'restangular',
        'oitozero.ngSweetAlert',
        'ngFileUpload',
        'ui.bootstrap'
]);

angular.element(document).ready(function () {
    angular.bootstrap(document, [mainApplicationModuleName]);
});

if (window.location.hash === '#_=_')
    window.location.hash = '#!';

mainApplicationModule.config(['$locationProvider','RestangularProvider', function ($locationProvider, RestangularProvider) {
    $locationProvider.hashPrefix('!');
    RestangularProvider.setFullResponse(true);
    }]);
