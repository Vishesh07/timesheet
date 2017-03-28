

(function () {
    'use strict';

    angular.module('timesheet').controller('HomeController', HomeController);

    HomeController.$inject = ['Authentication'];
    
    function HomeController(Authentication) {
        var vm = this;
        vm.user = Authentication.user;
        vm.toggle = toggle;

        function toggle() {
            $(".navbar").slideToggle();
        }
         vm.home = [
            {name:'Vishesh',taskid:1,date:'11/07/1996',project:'Perfeqta',description : 'Quality Manager',hours:10},
            {name:'Aadil',taskid:2,date:'12/07/1996',project:'Sigma',description : ' Manager',hours:10},
            {name:'Jigar',taskid:3,date:'13/07/1996',project:'timesheet',description : 'Qu',hours:10}
        ];
    }

})();
