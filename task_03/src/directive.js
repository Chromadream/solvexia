const angular = require("angular");

angular
  .module("demo", [])
  .controller("DemoController", function demoController() {
    this.sampleValue = 1;
  })
  .directive("ngNoLocalScope", ($http, $templatecache, $compiler) => {
    return function(scope, element, attrs) {
      let templatePath = attrs.ngNoLocalScope;
      $http.get(templatePath, { cache: $templatecache }).success(response => {
        let contents = element.html(response).contents();
        $compiler(contents)(scope);
      });
    };
  });
