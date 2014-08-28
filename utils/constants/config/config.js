var menuItemTitlePrefix = "mainpage.sideMenu.item.";

angular.module('glxUtils').constant('glxConfig',{

    userPingTimeout: 10000,
    showAlertTimeout: 5000,
    tagSuggestionsLimit: 10,
    socialObjectLimit: 10,
    defaultAvatar: "imgs/def_avatar.png",
    menuItems: {
        selfpage: function(id){ return {link: "/user/" + id, label: menuItemTitlePrefix + 'selfpage', classes: 'glyphicon glyphicon-user'}},
        companies: function(id){ return {link: "/user/" + id + "/companies", label: menuItemTitlePrefix + 'companies', classes: 'glyphicon glyphicon-home'}},
        followers: function(id){ return {link: "/user/" + id + "/followers", label: menuItemTitlePrefix + 'followers', classes: 'glyphicon glyphicon-thumbs-up'}},
        followed: function(id){ return {link: "/user/" + id + "/followed", label: menuItemTitlePrefix + 'followed', classes: 'glyphicon glyphicon-star'}}
    }
});