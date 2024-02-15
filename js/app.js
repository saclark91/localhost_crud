// app.js

// Define your AngularJS application module
var app = angular.module('TestApp', []);

// Define a controller for your AngularJS application
app.controller('TestController', function ($scope, $http) {
    // Initialize an empty array to store records
    $scope.records = [];

    $scope.errorMessage = '';
    $scope.activeTab = 'create';
    $scope.recordLoaded = false;

    $scope.setActiveTab = function(tabName) {
        $scope.activeTab = tabName;
    };

    $scope.isActiveTab = function(tabName) {
        return $scope.activeTab === tabName;
    };



    // Function to reset update fields
    $scope.resetUpdateFields = function () {
        $scope.updateName = '';
        $scope.updatePrice = '';
        $scope.recordLoaded = false; // Hide the update form
        $scope.errorMessage = ''; // Clear any previous error message
    };

    $scope.cancelUpdate = function() {
        $scope.updateId = '';
        $scope.updateName = '';
        $scope.updatePrice = '';
        $scope.recordLoaded = false;
    };


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
        console.log('Creating record with item_name:', $scope.newItemName, 'and item_price:', $scope.newItemPrice);
        $http.post('/api/test', { item_name: $scope.newItemName, item_price: $scope.newItemPrice })
            .then(function (response) {
                alert('Record created successfully!');
                console.log('Record created successfully:', response.data);
                $scope.newItemName = ''; // Clear input fields
                $scope.newItemPrice = ''; // Clear input fields
                $scope.fetchRecords(); // Refresh records
            })
            .catch(function (error) {
                console.error('Error creating record:', error);
            });
    };

    // Update a record
    $scope.updateRecord = function (updateId, updateName, updatePrice) {
        console.log('Updating record with ID:', updateId);
        console.log('Updating record with Name:', updateName);
        console.log('Updating record with Price:', updatePrice);
        
        // Convert updateId to number (optional if you're confident updateId is already a number)
        var itemId = parseInt(updateId);
        console.log('Parsed item_id:', itemId);

        // Check if itemId is a valid number
        if (!isNaN(itemId)) {
            $http.put(`/api/test/${itemId}`, { item_name: updateName, item_price: updatePrice })
                .then(function (response) {
                    alert('Record updated successfully!');
                    console.log('Record updated successfully:', response.data);

                    // Update the corresponding record in $scope.records
                    var index = $scope.records.findIndex(record => record.item_id === itemId);
                    if (index !== -1) {
                        $scope.records[index].item_name = updateName;
                        $scope.records[index].item_price = updatePrice;
                    }
                })
                .catch(function (error) {
                    console.error('Error updating record:', error);
                });
        } else {
            console.error('Invalid item_id:', updateId);
        }
    };



    // Load a record
    $scope.loadRecord = function () {
        // Fetch record from server based on ID
        var itemId = parseInt($scope.updateId);
        console.log('Loading record with ID:', itemId);
        if (!isNaN(itemId)) {
            $http.get(`/api/test/${itemId}`)
                .then(function (response) {
                    var record = response.data;
                    if (record) {
                        // Set remaining fields with current record values
                        $scope.updateName = record.item_name;
                        $scope.updatePrice = record.item_price;
                        $scope.recordLoaded = true; // Set flag to indicate record is loaded
                    } else {
                        $scope.errorMessage = 'Record not found!'; // Set error message
                        $scope.resetUpdateFields(); // Reset fields if record not found
                    }
                })
                .catch(function (error) {
                    console.error('Error fetching record:', error);
                    $scope.errorMessage = 'Error fetching record. Please try again.'; // Set error message
                    $scope.resetUpdateFields(); // Reset fields on error
                });
        } else {
            $scope.errorMessage = 'Invalid item ID!'; // Set error message for invalid item ID
            console.error('Invalid item_id:', $scope.updateId);
        }
    };


    // Delete a record
    $scope.deleteRecord = function (deleteId) {
        console.log('Deleting record with ID:', deleteId);
        // Convert deleteId to number
        var itemId = parseInt(deleteId);
        console.log('Parsed item_id:', itemId);

        // Check if itemId is a valid number
        if (!isNaN(itemId)) {
            $http.delete(`/api/test/${itemId}`)
                .then(function (response) {
                    alert('Record deleted successfully!');
                    console.log('Record deleted successfully:', response.data);
                    $scope.fetchRecords(); // Refresh records
                })
                .catch(function (error) {
                    console.error('Error deleting record:', error);
                });
        } else {
            console.error('Invalid item_id:', deleteId);
        }
    };


    $scope.formatPrice = function(price) {
        return price.toFixed(2); // Rounds to 2 decimal places and appends '.00' if necessary
    };



    // Fetch records initially when the controller is loaded
    $scope.fetchRecords();
});
