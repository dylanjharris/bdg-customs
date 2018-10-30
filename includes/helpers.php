<?php
/*----------------------------------------------djh Oct 30, 2018
  Add general functions below
----------------------------------------------*/



/*----------------------------------------------djh Oct 29, 2018
  Check for production env
  * generally configured for WPEngine & Pantheon
  * IMPORTANT: adjust for your environment(s) as needed
----------------------------------------------*/
if ( ! function_exists('bdg_in_production') ) {
  function bdg_in_production() {
    if ( strpos(site_url(), 'dev') !== false || strpos(site_url(), 'test') !== false || strpos(site_url(), 'wpengine') !== false ) {
      return false;
    } else {
      return true;
    }
  }
}

/*----------------------------------------------djh Oct 15, 2018
  Current version for scripts/styles
  * force cache break in non-production env
  * NOTE 1: there is a small perf hit for rand, disable as needed
  * NOTE 2: recommend updating this
----------------------------------------------*/
if ( ! function_exists('bdg_current_version') ) {
  function bdg_current_version() {
    $version = '1.0.1';
    if ( ! bdg_in_production() ) { // randomize version if not in production
      return '0.' rand(1,999);
    } else {
      return $version;
    }
  }
}

/*----------------------------------------------djh Oct 29, 2018
  Custom Error Log
  * only log if in non-production environment
  * tweak to fit your debug/workflow as needed
----------------------------------------------*/
if ( ! function_exists('c_log') ) {
  function c_log($data = 'fnord') {
    if ( ! bdg_in_production() ) { // check this stays out of production
      error_log($data);
    }
  }
}

/*----------------------------------------------djh Aug 28, 2018
  Debug a PHP object in JavaScript console
----------------------------------------------*/
if ( ! function_exists('debug_to_console') ) {
  function debug_to_console($obj) {
    if ( ! bdg_in_production() ) { // check this stays out of production
      $jsonprd = json_encode($obj);
      print_r('<script>console.log('.$jsonprd.')</script>');      
    }
  }
}

/*----------------------------------------------djh Aug 28, 2018
  Custom Var Dump
  * var_dump for humans
----------------------------------------------*/
if ( ! function_exists('cvar_dump') ) {
  function cvar_dump($var) {
    if ( ! bdg_in_production() ) { // check this stays out of production
      echo '<pre>';
      var_dump($var);
      echo '</pre>';
    }
  }
}

/*----------------------------------------------djh Aug 28, 2018
  Check a URL for 404 status
----------------------------------------------*/
if ( ! function_exists('check_is_404') ) {
  function check_is_404( $url = null ){
    $code = '';
    if( is_null( $url ) ){
      return false;
    } else {
      $handle = curl_init($url);
      curl_setopt($handle,  CURLOPT_RETURNTRANSFER, TRUE);
      curl_exec($handle);
      $code = curl_getinfo($handle, CURLINFO_HTTP_CODE);
      if( $code == '404' ){
          return true;
      }else{
          return false;
      }
      curl_close($handle);
    }
  }
}