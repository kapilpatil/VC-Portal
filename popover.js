module.exports = [ "Requisition", function( Requisition )
{

    return {
        restrict: 'EA',
        link: function( scope, el, attrs )
        {
            $( el ).popover(
            {
                trigger: 'manual',
                html: true,
                title: '<h4>Requisition Details</h4>',
                placement: function( context, source )
                {
                    var elemofftop = $( source ).offset().top;
                    var tableofftop = $( '.inner-wrapper table' ).offset().top
                    var tableoffbottom = tableofftop + $( ".inner-wrapper table" ).height();
                    var visibleofftop = $( ".inner-wrapper" ).offset().top;
                    var visibleoffbottom = visibleofftop + $( ".inner-wrapper" ).height();
                    var popover_top_pos = elemofftop - 416;
                    var popover_bottom_pos = elemofftop + 416;

                    // If the popover would appear beyond the top of the table
                    if( popover_top_pos < tableofftop )
                    {
                        return 'bottom';
                    }
                    // If there is more visible space above the info button than below it OR
                    // if the popover would appear beyond the bottom of the table
                    if(
                        elemofftop - visibleofftop > visibleoffbottom - elemofftop ||
                        popover_bottom_pos > tableoffbottom
                    )
                    {
                        return "top";
                    }
                    else
                    {
                        return 'bottom';
                    }
                }
            } ).on( 'click', function()
            {

                var data = $.parseJSON( attrs.popupinfo );
                var obj = {};
                if( data.lineNo == null )
                {
                    obj.lineNo = data.splitLineNo;
                }
                else
                {
                    obj.lineNo = data.lineNo;
                }
                obj.reqNo = data.requisitionNo;
                obj.trackingId = data.trackingId;
                Requisition.getRequisitionInfo( obj ).then( function( data, status )
                {
                    var data = data[ 0 ].requisitionInfo;
                    $( '#requisition_info_wrapper .requisitionNo' ).text( data.requisitionNo );
                    $( '#requisition_info_wrapper .lineNo' ).text( data.lineNo );
                    $( '#requisition_info_wrapper .materialNo' ).text( data.materialNum );
                    $( '#requisition_info_wrapper .itemdesc' ).text( data.materialDesc );
                    $( '#requisition_info_wrapper .materialVolume' ).text( data.materialVolume );
                    $( '#requisition_info_wrapper .unitOfMeasure' ).text( data.unitOfmeasure );
                    $( '#requisition_info_wrapper .uomConversion' ).text( data.uomConversion );
                    $( '#requisition_info_wrapper .eanupcNo' ).text( data.eanupcNbr );
                    $( '#requisition_info_wrapper .vendor_nbr' ).text( data.sourceVendorNum );
                    $( '#requisition_info_wrapper .vendor_nm' ).text( data.vendorName );
                    $( '#requisition_info_wrapper .incoTerm' ).text( data.incoTerm );
                    $( '#requisition_info_wrapper .paymentTerm' ).text( data.paymentTerm );
                    var content = $( '#requisition_info_wrapper' ).html();

                    $( "[data-toggle='popover']" ).not( el ).popover( "hide" );
                    $( el ).attr( 'data-content', content ).popover( 'show' );

                } );
            } );
        }
    };
} ];
