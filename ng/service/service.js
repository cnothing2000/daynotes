app.service('daynotesService', function($http, $q) {
    
    this.getdaynotesData = function () {
        var deferred = $q.defer();
        $http.get("../data/daynotesDB.json?timestamp=" + new Date().getTime()).
        success(function(data, status, headers, config) {
          //suppose $http will parse JSON for you, really? seems yes...
            deferred.resolve(data);
        }).
        error(function(data, status, headers, config) {
          // log error
            deferred.reject({ message: "Really bad" });
        });

        return deferred.promise;
    }

    this.savedaynotesData = function (in_daynotesData) {
        //save datnotes
        //daynotesDataArray = angular.copy(in_daynotesData);
        //console.log(in_daynotesData);
        var deferred = $q.defer();
        $http.post("../php/save_DB.php?timestamp=" + new Date().getTime(), in_daynotesData).
        success(function(data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available
            deferred.resolve(data);
        /*console.log("print server reply");
            console.log(data);
            if data.success=='1'{
               console.log();
            }*/
          }).
        error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            deferred.reject({ message: "Really bad" });
        });
        //return true;
        return deferred.promise;
    }

    this.backupdaynotesData = function () {
        //save datnotes
        //daynotesDataArray = angular.copy(in_daynotesData);
        //console.log(in_daynotesData);
        var deferred = $q.defer();
        $http.get("../php/backup_DB.php?timestamp=" + new Date().getTime()).
        success(function(data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available
            deferred.resolve(data);
        /*console.log("print server reply");
            console.log(data);
            if data.success=='1'{
               console.log();
            }*/
          }).
        error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            deferred.reject({ message: "Really bad" });
        });
        //return true;
        return deferred.promise;
    }
});