angular.module('common.filters').filter('shortenLargeNumber', [() => {
        return (num, digits = 1)=>{
          let units = ['K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
          let decimal;

         for(var i=units.length-1; i>=0; i--) {
             decimal = Math.pow(1000, i+1);

             if(num <= -decimal || num >= decimal) {
                 return +(num / decimal).toFixed(digits) + units[i];
             }
         }
         return num;
        }
    }
]);
