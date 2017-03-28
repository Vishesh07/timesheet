(function () {
    'use strict';
    angular.module('timesheet').controller("LoginController", LoginController);
    LoginController.$inject = ['Restangular','$state'];
    function LoginController(Restangular, $state) {
        var vm = this;
        vm.login = login;
        vm.logout = logout;
        vm.loginBtnText = 'Login';
        function login(form) {
            vm.loginBtnText = 'Login';
            if (form.$invalid) {
                _.forEach(form.$error.required, function (frm) {
                    frm.$setDirty();
                });
                vm.isSubmitted = true;
                return;
            }
            vm.startProcessing = true;
            vm.loginBtnText = 'Loging In...';
            Restangular.all('signin').post(vm.user).then(function (res) {
                if (res.data.message) {
                    vm.error = res.data.message;
                    vm.startProcessing = false;
                    vm.loginBtnText = 'Login';
                } else {
                    window.user = res.data;
                    window.location.reload();
                }
            }, function (err) {
                vm.error = err.data.message;
                vm.startProcessing = false;
                vm.loginBtnText = 'Login';
            });
        }
        function logout() {
            delete window.user;
            $state.go('home');
        }
    }
})();
