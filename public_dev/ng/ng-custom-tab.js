/**
 * 
 */

(function(angular) {
	' use strict';
	var app = angular.module("BTAPP");
	app.directive('showTab', [ '$compile', function($compile) {
		return {
			link : function(scope, element, attrs) {

				element.bind('click', function(e) {
					e.preventDefault();
					jQuery(element).tab('show');
				});

			}
		};
	} ]);

})(angular);
