angular.module('ui.bootstrap.demo', ['ui.bootstrap']);
angular.module('ui.bootstrap.demo').controller('ModalDemoCtrl', function($scope, $modal, $log) {

    var id = 103;
    $scope.names = [{
        id: 100,
        name: 'Ramesh',
        position: 'PSE'
    }, {
        id: 101,
        name: 'Raju',
        position: 'SSE'
    }, {
        id: 102,
        name: 'Manoj',
        position: 'SE'
    }];
    $scope.buttonText = 'SAVE';
    $scope.addRecord = function() {

        if ($scope.newEmployee.id == null) {
            $scope.newEmployee.id = id++;
            $scope.names.push($scope.newEmployee);
        } else { // when we edit the record and then save

            for (i in $scope.names) {
                if ($scope.names[i].id == $scope.newEmployee.id) {
                    $scope.names[i] = $scope.newEmployee;
                }
            }
        }
        $scope.newEmployee = {};
        $scope.buttonText = 'SAVE';
    }

    $scope.deleteRecord = function($index) {

        $scope.names.splice($index, 1);
    }

    $scope.editRecord = function($index) {

        $scope.newEmployee = angular.copy($scope.names[$index]);
        $scope.buttonText = 'UPDATE';
    }
    $scope.items = ['item1', 'item2', 'item3'];

    $scope.open = function(size) {

        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function() {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
	$scope.isInvalid = function(field){
		return $scope.myForm[field].$invalid && $scope.myForm[field].$dirty;
	  };
	  
	  $scope.isValid = function(field){
		return $scope.myForm[field].$valid && $scope.myForm[field].$dirty;
	  };
	  
	  $scope.submitTheForm = function(field){
		$scope.validationFlag =  $scope.myForm["name"].$invalid && $scope.myForm["name"].$dirty;
		alert($scope.validationFlag );
	  };
	  
	  $scope.user = {};

});

angular.module('ui.bootstrap.demo').controller('ModalInstanceCtrl', function($scope, $modalInstance, items) {

    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function() {
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
});