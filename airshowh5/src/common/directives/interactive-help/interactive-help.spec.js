describe('common.directives.interactiveHelp', () => {
    let setup = {};
    let mock = {};

    function createDirective() {
        let scope = {};
        scope.shown = true;
        setup = new Directive('<div interactive-help ng-show="shown"></div>', mock, (injections) => {
        }, scope);
    }

    beforeEach(() => {
        module('common.directives');
    });

    beforeEach(() => {
        createDirective();
    });

    describe('when directive is initialized', () => {
        it('then the dashboard-helper view should be displayed', () => {
            expect($("dashboard-helper", setup.view).is(":visible")).toBeTruthy()
        })
    });
});