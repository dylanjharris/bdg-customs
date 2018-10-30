<?php
/*
  Plugin Name: BDG Customs
  Plugin URI: https://github.com/dylanjharris/bdg-customs.git
  Description: Customizations from Brkich Design Group
  Version: 1.0.1
  Author: Brkich Design Group
  Author URI: https://brkichdesign.com/
  TextDomain: bdg-customs
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
define('BDG_PLUGIN_DIR', __DIR__);
define('BDG_PLUGIN_URL', plugin_dir_url(__FILE__));
define('BDG_TEMPLATE_DIR', BDG_PLUGIN_DIR . '/templates');
include(dirname(__FILE__) . '/includes/helpers.php');
include(dirname(__FILE__) . '/includes/class-bdg-customs.php');
include(dirname(__FILE__) . '/includes/class-custom-shortcodes.php');
new BDG_Customs();
