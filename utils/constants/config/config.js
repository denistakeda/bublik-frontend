angular.module('glxUtils').constant('glxConfig',function() {

	var glxCongig = {
        userPingTimeout: 10000,
        showAlertTimeout: 5000,
        tagSuggestionsLimit: 10,
        defaultAvatar: "imgs/def_avatar.png"
    };

	return glxCongig;
});