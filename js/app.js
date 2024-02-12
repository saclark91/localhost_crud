// app.js


// Define your AngularJS application module
var app = angular.module('TestApp', []);

// Define a controller for your AngularJS application
app.controller('TestController', function ($scope, $http) {
    // Initialize an empty array to store records
    $scope.records = [];

    // Fetch records from the server
    $scope.fetchRecords = function () {
        $http.get('/api/test')
            .then(function (response) {
                $scope.records = response.data;
                console.log('Fetched records:', $scope.records);
            })
            .catch(function (error) {
                console.error('Error fetching records:', error);
            });
    };

    // Create a new record
    $scope.createRecord = function () {
        console.log('Creating record with test_value:', $scope.newTestValue);
        $http.post('/api/test', { test_value: $scope.newTestValue })
            .then(function (response) {
                alert('Record created successfully!');
                console.log('Record created successfully:', response.data);
                $scope.newTestValue = ''; // Clear input field
                $scope.fetchRecords(); // Refresh records
            })
            .catch(function (error) {
                console.error('Error creating record:', error);
            });
    };

    // Update a record
    $scope.updateRecord = function (updateId, updateName) {
        console.log('Updating record with ID:', updateId);
        console.log('Updating record with Name:', updateName);
        // Convert updateId to number (optional if you're confident updateId is already a number)
        var testId = parseInt(updateId);
        console.log('Parsed test_id:', testId);
        
        // Check if testId is a valid number
        if (!isNaN(testId)) {
            $http.put(`/api/test/${testId}`, { test_value: updateName })
                .then(function (response) {
                    alert('Record updated successfully!');
                    console.log('Record updated successfully:', response.data);
                    
                    // Update the corresponding record in $scope.records
                    var index = $scope.records.findIndex(record => record.test_id === testId);
                    if (index !== -1) {
                        $scope.records[index].test_value = updateName;
                    }
                })
                .catch(function (error) {
                    console.error('Error updating record:', error);
                });
        } else {
            console.error('Invalid test_id:', updateId);
        }
    };

    // Delete a record
    $scope.deleteRecord = function (deleteId) {
        console.log('Deleting record with ID:', deleteId);
        // Convert deleteId to number
        var testId = parseInt(deleteId);
        console.log('Parsed test_id:', testId);
        
        // Check if testId is a valid number
        if (!isNaN(testId)) {
            $http.delete(`/api/test/${testId}`)
                .then(function (response) {
                    alert('Record deleted successfully!');
                    console.log('Record deleted successfully:', response.data);
                    $scope.fetchRecords(); // Refresh records
                })
                .catch(function (error) {
                    console.error('Error deleting record:', error);
                });
        } else {
            console.error('Invalid test_id:', deleteId);
        }
    };


    // Fetch records initially when the controller is loaded
    $scope.fetchRecords();
});
