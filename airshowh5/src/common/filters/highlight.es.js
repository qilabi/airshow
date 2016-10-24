angular.module('common.filters').filter('highlight', [() => {
    return function (text, search) {
          if (text && search) {
              text = text.toString();
              search = search.toString();
              text = text.replace(new RegExp(search, 'gi'), '<span class="highlight">$&</span>');
          }
          return text;
      }
    }
]);
