angular.module('<%= "glx"+_.capitalize(name) %>', ['ui.bootstrap','ui.utils','<%= routerModuleName %>','ngAnimate']);
<% if (!uirouter) { %>
angular.module('<%= "glx"+_.capitalize(name) %>').config(function($routeProvider) {

    /* Add New Routes Above */

});
<% } %><% if (uirouter) { %>
angular.module('<%= "glx"+_.capitalize(name) %>').config(function($stateProvider) {

    /* Add New States Above */

});
<% } %>
