/**
 * Added classes alghoritm:
 * 1) Add alert object and class glx-added-alert
 * 2) Replace class glx-added-alert by the glx-show-alert
 * 3) Wait first timeout
 * 4) Replace class glx-show-alert by the glx-hide-alert
 * 5) Wait second timeout
 * 6) Delete alert
 */
angular.module('glxUtils').factory('glxMessager', function ($timeout, $q, glxConfig, $filter) {
    var _private = {
        showAlert: function (alert, bootstrapClass) {
            _public.alerts.push(alert);
            alert.displayClass = bootstrapClass + " glx-added-alert";
            $q.when($timeout(function () {
                alert.displayClass = bootstrapClass + " glx-show-alert";
            }, 50))
                .then(function () {
                    return $timeout(function () {
                        alert.displayClass = bootstrapClass + " glx-hide-alert";
                    }, glxConfig.showAlertTimeout)
                })
                .then(function () {
                    return $timeout(function () {
                        _public.alerts.splice(_public.alerts.indexOf(alert), 1);
                    }, 400);
                });
        }
    };
    var _public = {
        alerts: [],
        showSuccessAlert: function (header, body) {
            _private.showAlert({header: $filter('glxLocalize')(header), body: $filter('glxLocalize')(body)}, "alert alert-success");
        },
        showErrorAlert: function (header, body) {
            _private.showAlert({header: $filter('glxLocalize')(header), body: $filter('glxLocalize')(body)}, "alert alert-danger");
        }
    };

    return angular.extend({}, _public);
});