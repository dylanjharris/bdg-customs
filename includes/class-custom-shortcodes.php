<?php
if ( ! class_exists( 'BDG_Custom_Shortcodes' ) ) {    

  class BDG_Custom_Shortcodes {

    public function __construct() {

    /*----------------------------------------------djh Sep 9, 2018
      Add various shortcodes
    ----------------------------------------------*/
    // Example shortcode
    add_shortcode( 'shortcode_name', array($this, 'bdg_shortcode_name') );

    }

    /*----------------------------------------------djh Aug 15, 2018
      SHORTCODE: Example Shortcode
      USAGE: [shortcode_name example_attribute="example_value"]
    ----------------------------------------------*/
    public function bdg_shortcode_name( $atts ) {

      $atts = shortcode_atts( array(
        'example_attribute' => 'example_value_default',
      ), $atts, 'shortcode_name' );

      $example = $atts['example_attribute'];

      $output = '';

      $output .= $example;

      return $output;
    }

  }
  $BDG_Custom_Shortcodes = new BDG_Custom_Shortcodes();
}
?>