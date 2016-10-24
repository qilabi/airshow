angular.module('common.services')
.factory('cuiModals', [function() {
    var modals;
    modals = document.getElementById('cui-modals');
    if (modals == null) {
      modals = document.createElement('div');
      modals.id = 'cui-modals';
      document.body.appendChild(modals);
    }
    return modals;
}])
.factory('cuiModalDismiss', ['$document', 'cuiModals', function($document, cuiModals) {
  var modalCloseEvent;
  modalCloseEvent = function(e) {
    var lastModal, lastModalWrapper, modalOptions;
    if (e.which === 27) {
      lastModalWrapper = cuiModals.lastChild;
      if (lastModalWrapper) {
        lastModal = angular.element(lastModalWrapper.getElementsByClassName('cui-modal')[0]);
        modalOptions = lastModal.scope().modal;
        if (modalOptions.keyboard) {
          return modalOptions.hide('keyboard');
        }
      }
    }
  };
  $document.bind('keyup', modalCloseEvent);
  return modalCloseEvent;
}])
.provider('cuiModal', [function() {
    var ANIMATE_SPEED;
    ANIMATE_SPEED = 250;
    this.$get = ['$rootScope', '$compile', '$document', '$templateCache', '$log', '$timeout', '$controller', 'cuiModalDismiss', 'cuiModals', function($rootScope, $compile, $document, $templateCache, $log, $timeout, $controller, cuiModalDismiss, cuiModals) {
      return function(options) {
        var afterHideAnimation, config, currentAnimation, defaultConfig, dom, el, scope;
        var showClass = "cux-modal--showing";
        if (options == null) {
          options = {};
        }
        defaultConfig = {
          backdrop: true,
          visible: false,
          "static": false,
          keyboard: true,
          type: 'dismiss'
        };
        config = angular.extend({}, defaultConfig, options);
        config.classes = [];
        if (config.className != null) {
          config.classes.push(config.className);
        }
        dom = $templateCache.get("common/services/modal/modal.tpl.html");
        scope = angular.extend((config.scope || $rootScope).$new(), {
          modal: config
        });
        if (config.controller) {
          $controller(config.controller, {
            $scope: scope
          });
        }
        el = $compile(dom)(scope);
        currentAnimation = null;
        scope.modal.show = function() {
          if (scope.modal.visible) {
            cuiModals.removeChild(el[0]);
            cuiModals.appendChild(el[0]);
            return;
          }
          if (currentAnimation) {
            $timeout.cancel(currentAnimation);
            afterHideAnimation();
          }
          $document.find('html').addClass('cui-modal-no-scrollbars');
          el.addClass(showClass);
          cuiModals.appendChild(el[0]);
          scope.modal.visible = true;
          scope.$broadcast('show');
        };
        if (scope.modal.visible === true) {
          scope.modal.visible = false;
          scope.modal.show();
        }
        afterHideAnimation = function(message, broadcastHide) {
          if (broadcastHide == null) {
            broadcastHide = true;
          }
          cuiModals.removeChild(el[0]);
          currentAnimation = null;
          if (broadcastHide) {
            if (message != null) {
              return scope.$broadcast('hide', message);
            } else {
              return scope.$broadcast('hide');
            }
          }
        };
        scope.modal.hide = function(message, broadcastHide) {
          if (!scope.modal.visible) {
            return;
          }
          el.removeClass(showClass);
          currentAnimation = $timeout(function() {
            return afterHideAnimation(message, broadcastHide);
          }, ANIMATE_SPEED);
          $document.find('html').removeClass('cui-modal-no-scrollbars');
          scope.modal.visible = false;
          return currentAnimation;
        };
        scope.modal.dismiss = function() {
          scope.modal.hide(null, false);
          return $timeout(function() {
            scope.$broadcast('dismiss');
            scope.$destroy();
            return el = null;
          }, ANIMATE_SPEED);
        };
        return scope;
      };
    }];
    return this;
  }]);
