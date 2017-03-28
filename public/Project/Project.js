

(function () {
    'use strict';

    angular.module('timesheet').controller('AddProjectController', AddProjectController);

    AddProjectController.$inject = ['Restangular', '$state'];

    function AddProjectController(Restangular, $state) {
        var vm = this;
        vm.project = [
            { project: 'Perfeqta', description: 'Quality Manager' },
            { project: 'Sigma', description: ' Manager' },
            { project: 'timesheet', description: 'Qu' },
        ]
    }
})();