

(function () {
    'use strict';

    angular.module('timesheet').controller('AddEntriesController', AddEntriesController);

    AddEntriesController.$inject = ['Restangular','$state'];
    
    function AddEntriesController(Restangular, $state) {
        var vm = this;
        vm.addentries = [
        {project:'Perfeqta',date:'11/07/1996',description : 'Quality Manager',hours:10},
        {project:'Sigma',date:'12/07/1996',description : ' Blood',hours:11},
        {project:'timesheet',date:'13/07/1996',description : 'Boutique',hours:12},
     ];
    }

})();