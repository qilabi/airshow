angular.module('common.services').service('cuiDialog', ['cuiModal', '$q', function(cuiModal, $q) {
    return function(config) {
      var instance, scope;
      if (config == null) {
        config = {};
      }
      scope = cuiModal({
        type: 'confirm',
        scope: config.scope,
        templateUrl: "common/services/dialog/dialog.tpl.html",
        "static": true,
        keyboard: config.keyboard || false
      });
      instance = function() {
        var button, deferred, promise, _i, _j, _len, _len1, _ref, _ref1;
        deferred = $q.defer();
        promise = deferred.promise;
        scope.message = config.message;
        scope.title = {};
        scope.title.label = config.title || 'Unnamed Dialog';
        scope.title.icon = ` cux-icon--${config.icon || 'info-sign'}`;
        scope.title.iconColor = ` cux-font--${config.iconColor || 'blue'}`;
        scope.classes = [scope.title.icon, scope.title.iconColor];
        scope.buttons = [];
        if (angular.isArray(config.buttons)) {
          _ref = config.buttons;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            button = _ref[_i];
            scope.buttons.push({
              label: button.label,
              cuiType: button.cuiType || 'default',
              value: button.value,
              promise: button.promise,
              focus: button.focus
            });
          }
        } else {
          scope.buttons = (function() {
            switch (config.buttons) {
              case 'yesno':
                return [
                  {
                    label: 'Yes',
                    promise: 'resolve',
                    cuiType: 'primary',
                    focus: true
                  }, {
                    label: 'No',
                    promise: 'reject',
                    cuiType: 'default'
                  }
                ];
              case 'okcancel':
                return [
                  {
                    label: 'OK',
                    promise: 'resolve',
                    cuiType: 'primary',
                    focus: true
                  }, {
                    label: 'Cancel',
                    promise: 'reject',
                    cuiType: 'default'
                  }
                ];
              case 'close':
                return [
                  {
                    label: 'Close',
                    promise: 'resolve',
                    cuiType: 'primary',
                    focus: true
                  }
                ];
              default:
                return [
                  {
                    label: 'OK',
                    promise: 'resolve',
                    cuiType: 'primary',
                    focus: true
                  }
                ];
            }
          })();
        }
        _ref1 = scope.buttons;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          button = _ref1[_j];
          if (button.promise === 'reject') {
            button.action = function() {
              scope.modal.hide();
              return deferred.reject.apply(null, arguments);
            };
          } else {
            button.action = function() {
              scope.modal.hide();
              return deferred.resolve.apply(null, arguments);
            };
          }
        }
        scope.$on('hide', function(e, message) {
          if (message === 'keyboard') {
            return deferred.reject('keyboard');
          }
        });
        scope.modal.show();
        return promise;
      };
      instance.hide = scope.modal.hide;
      instance.dismiss = scope.modal.dismiss;
      return instance;
    };
  }]);
