angular.module('<%= appname %>').filter('<%= "glx"+_.capitalize(name) %>', function () {
    return function (input, arg) {
        return 'output';
    };
});