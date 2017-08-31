angular.module('autocomplete.directive', [])

.directive('ionicAutocomplete',
    function ($ionicPopover) {
        var popoverTemplate = 
         '<ion-popover-view style="left:0px !important;margin-top:5px;">' + 
             '<ion-content>' +
                 '<div class="list">' +
                    '<a  class="item" ng-repeat="item in items | filter:inputSearch" ng-click="selectItem(item)"><img style="width:20% !important;" src="http://siliconvalleynest.com/familykoolapi/uploaddata/profile/{{item.userPicture}}"> {{item.firstName}}</a>' +
                 '</div>' +
             '</ion-content>' +
         '</ion-popover-view>';
        return {
            restrict: 'A',
            scope: {
                params: '=ionicAutocomplete',
                inputSearch: '=ngModel'
            },
            link: function ($scope, $element, $attrs) {
                var popoverShown = false;
                var popover = null;
                setTimeout(function(){
                    // alert("hi");
                      $scope.items = $scope.params.items;
                },2000);
              
               

                //Add autocorrect="off" so the 'change' event is detected when user tap the keyboard
                $element.attr('autocorrect', 'off');


                popover = $ionicPopover.fromTemplate(popoverTemplate, {
                    scope: $scope
                });
                $element.on('focus', function (e) {
                    if (!popoverShown) {
                        popover.show(e);
                    }
                });

                $scope.selectItem = function (item) {
                    $element.val(item.firstName);
                    popover.hide();
                    $("#relativeUserId").val(item.userId);
                    $scope.params.onSelect(item);
                };
            }
        };
    }
);
