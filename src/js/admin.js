jQuery(document).ready(function($) {
  /*----------------------------------------------djh Aug 28, 2018
    All Orders Screen
  ----------------------------------------------*/
  // if ( $('#bulk-action-selector-top') ) {

  //   setTimeout(function() {

  //     // $('#bulk-action-selector-top').find('option[value="wc_pip_print_packing_list"]').text('Print Kitchen Report');
  //     // $('#bulk-action-selector-top').find('option[value="wc_pip_send_email_packing_list"]').text('Print Kitchen Report');

  //     $('#bulk-action-selector-top').find('option[value="wc_pip_print_pick_list"]').text('Print Kitchen Report');
  //     $('#bulk-action-selector-top').find('option[value="wc_pip_send_email_pick_list"]').text('Email Kitchen Report');

  //     // $('#wp-admin-message-handler-message').css('background','black');

  //     $('#wp-admin-message-handler-message ul li strong').contents().filter(function() {
  //         return this.nodeType == 3
  //     }).each(function(){
  //         this.textContent = this.textContent.replace('Pick List created.','Kitchen Report created.');
  //         this.textContent = this.textContent.replace('Pick List email for','Kitchen Report email for');
  //     });

  //   }, 10);

  // }




  /*----------------------------------------------djh Aug 28, 2018
    Single / All Product Pages
  ----------------------------------------------*/
  if ( $('.post-type-product').length ) {
    // $('.wrap').css('background','black');


    if ( $('#variable_product_options').length ) {
      // var styles = '<style>';
      // styles += '.variable_stock_status0_field,';
      // styles += '.variable_weight0_field,';
      // styles += '.dimensions_field';
      // styles += '';
      // styles += '';
      // styles += '';
      // styles += '{display:none!important}';
      // styles += '</style>';

      // $('#variable_product_options').append(styles);

      $('a[href="#variable_product_options"]').on('click',function(){
        setTimeout(function() {
          $('input[name^=variable_points_earned]').val('0');
          $('input[name^=variable_renewal_points]').val('0');
        }, 1000);
      });



    }

  }


}); /* end doc ready */