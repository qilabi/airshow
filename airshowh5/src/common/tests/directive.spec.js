let Directive;
const bind = (fn, me) => function(){ return fn.apply(me, arguments); };

Directive = (() => {
    Directive.prototype.scope = {};

    Directive.prototype.view = {};

    Directive.prototype.httpBackend = {};

    function Directive(template, mock, injectionCallback, scope) {
        this.mock = mock;
        this.injectionCallback = injectionCallback;
        this.cleanup = bind(this.cleanup, this);
        module('app');
        module((function(_this) {
            return function($provide) {
                let key, ref, value;
                if (!mock) {
                    return;
                }
                ref = _this.mock;
                for (key in ref) {
                    value = ref[key];
                    $provide.value(key, value);
                }
            };
        })(this));
        inject((function(_this) {
            return function($compile, $rootScope, $httpBackend) {
                let injections;
                injections = {
                    $compile,
                    $rootScope,
                    $httpBackend
                };
                if (typeof _this.injectionCallback === "function") {
                    _this.injectionCallback(injections);
                }
                _this.scope = scope ? $.extend(true, $rootScope.$new(), scope) : $rootScope;
                $('body').append(_this.view = $compile(template)(_this.scope));
                $rootScope.$apply();
                _this.scope = _this.view.scope();
                _this.isolateScope = _this.view.isolateScope();
                _this.httpBackend = $httpBackend;
            };
        })(this));
    }

    Directive.prototype.cleanup = function() {
        this.httpBackend.verifyNoOutstandingExpectation();
        this.httpBackend.verifyNoOutstandingRequest();
        return $('body').empty();
    };

    return Directive;

})();
