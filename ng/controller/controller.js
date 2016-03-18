var app;
app = angular.module('ZZ_daynotes', []);
app.controller('daynotesController', ['$scope', '$window', 'daynotesService', function($scope, $window, daynotesService) {
    //$scope.myresult=testService.testme(6);
    //console.log(daynotesService.getdaynotesData());
    //$scope.daynotesData=daynotesService.adddaynotesDataLocal("33");
    
    
    var daynotesDataObj;
    var daynotesDataItem = {};
    $scope.lastupdatetime=""
    
    $scope.isChanged=false;

    $scope.operation="list";
    //$scope.showlist = '';
    //$scope.showedit = 'display: none;';
    
    $scope.autogetdaynotesData = function(){
        
            daynotesService.getdaynotesData()
                .then(
                    function (result) {
                        daynotesDataObj=result;
                        //console.log(daynotesDataObj);
                        $scope.daynotesData=daynotesDataObj.data;
                        $scope.isChanged=false;
                        $scope.isRefreshed=true;
                        $scope.lastupdatetime="refreshed @ " + new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000).toISOString().replace("T", " ").replace("Z", " ");
                    },
                    function (error) {
                        // handle errors here
                        console.log(error.statusText);
                    }
                );
    };
    
    $scope.getdaynotesData = function(){
        
        if ($window.confirm("Refresh?")) {
            daynotesService.getdaynotesData()
                .then(
                    function (result) {
                        daynotesDataObj=result;
                        //console.log(daynotesDataObj);
                        $scope.daynotesData=daynotesDataObj.data;
                        $scope.isChanged=false;
                        $scope.isRefreshed=true;
                        $scope.lastupdatetime="refreshed @ " + new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000).toISOString().replace("T", " ").replace("Z", " ");
                    },
                    function (error) {
                        // handle errors here
                        console.log(error.statusText);
                    }
                );
        }
    };
     
    $scope.daytimestyle = function(indate){

        var today=new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000).toISOString().slice(0,10);
        // console.log("2016-3-0");
        //console.log("2016-3-16s" + ":" + new Date("2016-3-16").getTime() / 1000);
        //console.log("2016-03-16s" + ":" + new Date("2016-03-16").getTime() / 1000);
        //console.log("2016-03-16".toString("yyyy-m-d"));
        // console.log("2016-03-16");
        // console.log(new Date("2016-03-16").getTime() / 1000);
        
        // console.log(new Date(today).getTime() / 1000);
        // console.log(new Date(indate).getTime() / 1000);
        //return((new Date(today).getTime() / 1000)>(new Date(indate).getTime() / 1000));
        //console.log("indate before:" + indate);
        var temp=indate.split("-");
        if (temp[1].length==1) {temp[1]="0"+temp[1];}
        if (temp[2].length==1) {temp[2]="0"+temp[2];}
        indate = temp[0] + "-" + temp[1] + "-" + temp[2];
        //console.log("indate after:" + indate);
        
        if ((new Date(today).getTime() / 1000)>(new Date(indate).getTime() / 1000)) {
            //console.log(today + ":" + new Date(today).getTime() / 1000);
            //console.log(indate + ":" + new Date(indate).getTime() / 1000);           
            return("color:red;");
        }else if ((new Date(today).getTime() / 1000)==(new Date(indate).getTime() / 1000)) {
            return("");
        }else{
            return("color:blue;");
        }
       
    };
    
    $scope.canceldaynotesDataDialog = function(tobeconfirm) {    
        //$scope.showlist = '';
        //$scope.showedit = 'display: none;';
        if (!tobeconfirm) {
             $scope.operation="list";
        }else if ($window.confirm("Cancel?")) {
            $scope.operation="list";
        }
    };
    
    $scope.adddaynotesDataDialog = function() {    

            $scope.operation="add";
            daynotesDataItem={};
            //$scope.editItem.id="";
            $scope.editItemdatetime=new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000).toISOString().slice(0,10);
            $scope.editItempriority="2";
            $scope.editItemnotes="";
            $scope.editItemdetails="";
    };
    
    $scope.adddaynotesData = function() {
        this.canceldaynotesDataDialog(false);
        
        $scope.isChanged=true;
        
        var d = new Date();
        var n = d.getTime();
        
        //console.log("add");
        daynotesDataItem.id=n.toString();
        daynotesDataItem.datetime=$scope.editItemdatetime;
        daynotesDataItem.priority=$scope.editItempriority;
        daynotesDataItem.notes=$scope.editItemnotes;
        daynotesDataItem.details=$scope.editItemdetails;
        daynotesDataObj.data.push(daynotesDataItem);
        //console.log(daynotesDataItem.id+" | " + daynotesDataItem.datetime+" | " +daynotesDataItem.priority+" | " + daynotesDataItem.notes+" | " +daynotesDataItem.details);
        daynotesDataItem={};
        $scope.editItemdatetime="";
        $scope.editItempriority="";
        $scope.editItemnotes="";
        $scope.editItemdetails="";
    };

    $scope.editdaynotesDataDialog = function(in_item) {    

        $scope.operation="edit";
        //console.log("editdiaglog");
        //$scope.editItemdatetime="what the fuuk!";
        $scope.editItemid=in_item.id;
        $scope.editItemdatetime=in_item.datetime;
        $scope.editItempriority=in_item.priority;
        $scope.editItemnotes=in_item.notes;
        $scope.editItemdetails=in_item.details;
    };
    
    $scope.editdaynotesData=function() {
        //edit
        if ($window.confirm("Save?")) {
            this.canceldaynotesDataDialog(false);
            //console.log("editdiaglog");
            $scope.isChanged=true;
            daynotesDataObj.data.forEach(function(item, index, object) {
                if (item["id"] == $scope.editItemid) {
                    item["datetime"]=$scope.editItemdatetime;
                    item["priority"]=$scope.editItempriority;
                    item["notes"]=$scope.editItemnotes;
                    item["details"]=$scope.editItemdetails;
                }
            });
        }
    };
    
    $scope.deletedaynotesData=function(itemid) {
        //remove
        //console.log(in_item);
        if ($window.confirm("Delete?")) {
            $scope.isChanged=true;
            daynotesDataObj.data.forEach(function(item, index, object) {
                if (item["id"] == itemid) {
                    object.splice(index, 1);
                }
            });
        }
    };

    
    $scope.savedaynotesData=function() {
        //save all
        //console.log("save");
        if ($window.confirm("Save?")) {
            daynotesService.savedaynotesData(daynotesDataObj)
                .then(
                    function (result) {
                        console.log(result);
                        if (result.success=='1') {
                            $scope.isChanged=false;
                            $scope.lastupdatetime="saved @ " + new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000).toISOString().replace("T", " ").replace("Z", " ");
                        }
                    },
                    function (error) {
                        // handle errors here
                        console.log(error.statusText);
                    }
                )
        }
    };

    $scope.backupdaynotesData = function(){
        
        daynotesService.backupdaynotesData()
            .then(
                function (result) {
                    console.log(result);
                    if (result.success=='1') {
                        $scope.isBackuped=true;
                        $scope.lastupdatetime="backuped @ " + new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000).toISOString().replace("T", " ").replace("Z", " ");
                    }
                    
                },
                function (error) {
                    // handle errors here
                    console.log(error.statusText);
                }
            );
    };
}]);