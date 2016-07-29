/* jshint ignore:start */
// Read only sample file //


"use strict";

module.exports = [ "$scope", "$uibModal", "Requisition", "requisitionsInfo", "$timeout", "$filter", "$rootScope",
    function ( $scope, $uibModal, Requisition, requisitionsInfo, $timeout, $filter, $rootScope )
    {
        $scope.split = false;
        $scope.dateOptions = [ "All", "Within 1 Week", "Within 1 Month", "Within 3 Months",
            "Within 6 Months", "Within 1 Year" ];
        $scope.vendors = "-1";
        $scope.pageSizeOptions = [ "10", "20", "30", "40", "50" ];
        $scope.csvExportRecords = [];
        $scope.curPage = 0;
        $scope.displayCount = 100;
        $scope.varPageSize = 5000;
        $scope.splitDisabled = false;
        $scope.initCall = true;
        $scope.loadingscoller = $scope.totalRecordCount > 100 ? true : false;
        $scope.showSplitDialog = false;
        $scope.vendorSplitIndexes = [];

        $scope.requisitionsInfo = requisitionsInfo;
        $scope.reqItems = $scope.requisitionsInfo.requisitionResponse.requisitions;
        $scope.requisitionsBackup = angular.copy( $scope.requisitionsInfo.requisitionResponse );
        $scope.groupingHeaderData = $scope.requisitionsInfo.requisitionResponse.requisitionGroupHeaders;
        $scope.orgBackUpData = angular.copy( $scope.reqItems );
        $scope.userType = $scope.requisitionsInfo.userDetails.userType;
        $scope.totalRecordCount = $scope.requisitionsInfo.totalRecordCount;
        $scope.hasVcReadOnlyPermission = !$scope.requisitionsInfo.hasVcEditPermission;
        $scope.reasonCode = $scope.requisitionsInfo.reasonCodes;
        $scope.reasonCode.splice( 0, 0, { reason: "-1", description: "-Select-" } );
        $scope.footerDate = new Date().getFullYear();

        $scope.numberOfPages = function ()
        {
            return Math.ceil( $scope.totalRecordCount / $scope.varPageSize );
        };

        $scope.readonlyField = function ( event )
        {
            var allowedKeys = {
                37: "arrow-left",
                38: "arrow-up",
                39: "arrow-right",
                40: "arrow-down",
                9: "tab",
                27: "esc"
            };
            if( !allowedKeys[ event.which ] )
            {
                event.preventDefault();
            }
        };

        $scope.preventBackSpaceFromRedirecting = function ( event, editable )
        {
            if( event.which === 8 && !editable )
            { // backspace key and non editable requisition
                event.preventDefault();
            }
        };

        $scope.exportRecords = function ( allowdbcall )
        {
            $scope.isexportCall = true;
            if( !$scope.checkIfAnyItemIsUpdated() && allowdbcall )
            {
                var records = Requisition.exportCsvrecords( $scope );
                $scope.isexportCall = false;
            }
        };

        $scope.detectErrors = function ( selection )
        {
            for( var i = 0; i < selection.length; i++ )
            {
                if( selection[ i ].priceError || selection[ i ].qtyError )
                {
                    return true;
                }
            }
            return false;
        };

        $scope.submitUpdates = function ()
        {

            $scope.showSplitDialog = false;
            $scope.itemsFailed = [];
            $scope.selectAll = false;

            var selectedData = $scope.GetUpdateSelectedData( null, "submit" );

            if( $scope.detectErrors( selectedData ) )
            {
                $( "#submit_error_alert" ).modal( "show" );
            }
            else
            {
                Requisition.submit( selectedData, $scope );
            }

        };

        $scope.getSearchCriteriaData = function ()
        {
            var data = {};
            var statusCode = "";
            var vendorCode = "";

            if( $scope.userType == USERTYPE.BUYER )
            { //buyer
                if( $scope.vendors == -1 )
                {
                    vendorCode = "-1";
                }
                else
                {
                    vendorCode = $scope.vendors.replace( /(,)$/g, "" );
                    vendorCode = "(" + vendorCode + ")";
                }
            }


            if( $scope.status == -1 )
            {
                statusCode = "-1";
            }
            else
            {
                statusCode = $scope.status.replace( /(,)$/g, "" );
                statusCode = "(" + statusCode + ")";
            }

            if( $scope.userType == USERTYPE.BUYER )
            { //buyer
                data.vendorCodes = vendorCode;
            }
            data.statusCodes = statusCode;
            data.searchText = $scope.itemText != null ? $scope.itemText : "";
            data.days = convertDatetoDays( $scope.dateRange );
            return data;
        };

     .......*/
/* jshint ignore:end */
