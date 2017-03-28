angular.module('timesheet').factory('Authentication', function () {
    this.user = window.user;
    return {
        user: this.user,
        isAuthenticated: function () {
            return user ? true : false;
            //return true;
        }
    };
});
