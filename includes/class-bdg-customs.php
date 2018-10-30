<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


if( ! class_exists( 'BDG_Customs' ) ) {
    
  class BDG_Customs { 
    /**
    * Constructor
    */
    public function __construct() {
      // Enqueue styles/scripts
      add_action( 'wp_enqueue_scripts', array( $this, 'bdg_enqueue_styles_scripts'), 999 );

      // Enqueue admin styles/scripts
      add_action( 'admin_enqueue_scripts', array( $this, 'bdg_enqueue_admin_styles_scripts'), 999 );

      // Print instead of enqueue
      add_action( 'wp_print_scripts', array( $this, 'bdg_print_scripts_instead_of_enqueue') );

      // Add custom image sizes
      add_action('after_setup_theme', array( $this,'bdg_custom_image_sizes') );

      // Enable /woocommerce/ template overrides from plugin
      add_filter( 'woocommerce_locate_template',  array( $this, 'bdg_woocommerce_locate_template'), 10, 3 );

      // Add custom page templates
      add_filter( 'theme_page_templates', array($this,'bdg_add_page_templates_to_select'), 10, 4 );
      add_filter( 'template_include', array($this,'bdg_load_plugin_templates') );

      // Modify Storefront
      add_action( 'init', array($this,'bdg_modify_storefront_templates'), 10 );
      // replace parent/child theme google fonts
      // add_filter( 'storefront_google_font_families', array( $this, 'bdg_google_fonts' ), 99 );

    }


    /*----------------------------------------------djh Oct 29, 2018
      Enqueue styles/scripts
    ----------------------------------------------*/
    function bdg_enqueue_styles_scripts(){
      if ( is_admin() ) {
        return; // TODO: I think this check is redundant?
      }

      /*----------------------------------------------djh Oct 29, 2018
        Break cache on non-production env
        * see includes/helpers.php
      ----------------------------------------------*/
      $version = bdg_current_version();
      /*----------------------------------------------djh Oct 30, 2018
        Bulk activate enqueues below
        * if using /assets/ dir, set to true else false
        * if using /static/ dir, set to true else false
      ----------------------------------------------*/
      $using_assets = true; // for /assets/ dir
      $using_static = false;// for /static/ dir
      /*----------------------------------------------djh Oct 29, 2018
       * * * WARNING * * * * * * * * * * * * * * * * * * * *
       * Do not put vanilla/static css in /assets/ dir
       * the /assets/ dir is cleaned with every 'gulp build'
       * * * * * * * * * * * * * * * * * * * * * * * * * * */
      /*----------------------------------------------djh Oct 29, 2018
        Site wide CSS
      ----------------------------------------------*/
      if ( $using_assets )
        wp_enqueue_style( 'bdg-style', BDG_PLUGIN_URL . 'assets/css/style.min.css', array(), $version );
      if ( $using_static )
        wp_enqueue_style( 'bdg-css', BDG_PLUGIN_URL . 'static/css/style.css', array(), $version );

      /*----------------------------------------------djh Oct 29, 2018
        Site wide JS
      ----------------------------------------------*/
      if ( $using_assets ) {
        wp_register_script( 'bdg-scripts-min', BDG_PLUGIN_URL . 'assets/js/script.min.js', array('jquery'), $version, true );
        wp_enqueue_script( 'bdg-scripts-min' );
      }
      if ( $using_static ) {
        wp_register_script( 'bdg-scripts', BDG_PLUGIN_URL . 'assets/js/script.js', array('jquery'), $version, true );
        wp_enqueue_script( 'bdg-scripts' );
      }

      /*----------------------------------------------djh Oct 29, 2018
        WooCommerce My Account Pages
      ----------------------------------------------*/
      if ( function_exists('is_account_page') && is_account_page() ) {
        if ( $using_assets ) { 
          wp_enqueue_style( 'bdg-styles-my-account-min', BDG_PLUGIN_URL . 'assets/css/my-account.min.css', array(), $version );
          wp_register_script( 'bdg-scripts-my-account-min', BDG_PLUGIN_URL . 'assets/js/my-account.min.js', array('jquery'), $version, true );
          wp_enqueue_script( 'bdg-scripts-my-account-min' );
        }
        if ( $using_static ) { 
          wp_enqueue_style( 'bdg-styles-my-account', BDG_PLUGIN_URL . 'static/css/my-account.css', array(), $version );
          wp_register_script( 'bdg-scripts-my-account', BDG_PLUGIN_URL . 'assets/js/my-account.js', array('jquery'), $version, true );
          wp_enqueue_script( 'bdg-scripts-my-account' );
        }
      }

      /*----------------------------------------------djh Oct 29, 2018
        Localize scripts and add query params
      ----------------------------------------------*/
      if ( isset( $_REQUEST['your_query_param_here'] ) ) {
        $example = $_REQUEST['your_query_param_here'];
      } else {
        $example = false;
      }

      $config_custom = array( 
        'ajax_url'   => admin_url( 'admin-ajax.php' ),
        'site_url'   => site_url(),
        'userID'     => get_current_user_id(),
        'example'    => $example
      );
      if ( $using_assets )
        wp_localize_script( 'bdg-scripts-min', 'config_custom', $config_custom );
      if ( $using_static )
        wp_localize_script( 'bdg-scripts', 'config_custom', $config_custom );
    }


    /*----------------------------------------------djh Oct 29, 2018
      Enqueue admin styles/scripts
    ----------------------------------------------*/
    function bdg_enqueue_admin_styles_scripts(){
      if ( ! is_admin() || wp_doing_ajax() ) { return; }

      $version = bdg_current_version();

      if ( $using_assets ) {
        wp_enqueue_style( 'pgh-style-admin-min', BDG_PLUGIN_URL . 'assets/css/admin-style.min.css', array(), $version );
        wp_register_script( 'bdg-scripts-admin-min', BDG_PLUGIN_URL . 'assets/js/admin.min.js', array('jquery'), $version, false );
        wp_enqueue_script( 'bdg-scripts-admin-min' );
      }
      if ( $using_static ) {
        wp_enqueue_style( 'pgh-admin-style', BDG_PLUGIN_URL . 'static/css/admin-style.css', array(), $version );
        wp_register_script( 'bdg-scripts-admin', BDG_PLUGIN_URL . 'static/js/admin.js', array('jquery'), $version, false );
        wp_enqueue_script( 'bdg-scripts-admin' );
      }
    }


    /*----------------------------------------------djh Oct 30, 2018
      Print styles/scripts instead of enqueue
    ----------------------------------------------*/
    function bdg_print_scripts_instead_of_enqueue(){
      if ( is_admin() ) { return; } // TODO: I think this check is redundant?
      /*----------------------------------------------djh Oct 30, 2018
        EXAMPLE: Font Awesome 5
      ----------------------------------------------*/
      // echo '<link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-9ralMzdK1QYsk4yBY680hmsb4/hJ98xK3w0TIaJ3ll4POWpWUYaA2bRjGGujGT8w" crossorigin="anonymous">';
      /*----------------------------------------------djh Oct 30, 2018
        EXAMPLE: Print inline style/script with php vars
      ----------------------------------------------*/
      // if ( is_front_page() ) {
      //   $color = #000;
      //   echo '<style>';
      //   echo '#example23 {background-color:'.$color.'}';
      //   echo '</style>';
      // }
    }



    /*----------------------------------------------djh Aug 23, 2018
      Add Image Sizes
    ----------------------------------------------*/
    function bdg_custom_image_sizes() {
      // add_image_size( 'subscription_thumbnail', 889, 1333, true );
      // add_image_size( 'mp_thumbnail', 30, 30, true );
    }



    /*----------------------------------------------djh Oct 30, 2018
      Enable /templates/woocommerce/ overrides from plugin
    ----------------------------------------------*/
    /**
     * @global object $woocommerce
     * @param string $template
     * @param string $template_name
     * @param string $template_path
     * @return string
     */
    function bdg_woocommerce_locate_template( $template, $template_name, $template_path ) {
      global $woocommerce;
      $_template = $template;
      if ( ! $template_path ) $template_path = $woocommerce->template_url;
      $plugin_path  = BDG_TEMPLATE_DIR . '/woocommerce/';
      $template = locate_template(
        array(
          $template_path . $template_name,
          $template_name
        )
      );
      if ( ! $template && file_exists( $plugin_path . $template_name ) )
        $template = $plugin_path . $template_name;
      if ( ! $template )
        $template = $_template;
      return $template;
    }



    /*----------------------------------------------djh Oct 29, 2018
     * Add Custom templates to page attribute template selection.
     * NOTE: be sure this corresponds to a template-something.php
     *       file in the plugin root directory
    ----------------------------------------------*/
    function bdg_add_page_templates_to_select( $post_templates, $wp_theme, $post, $post_type ) {
      // Add custom templates to select dropdown 
      $post_templates['template-custom.php'] = __('Custom Template');
      // $post_templates['template-example.php']   = __('Example Template');
      return $post_templates;
    }

    /*----------------------------------------------djh Oct 29, 2018
     * Check if current page has our custom template. Try to load
     * template from theme directory and if no exist load it 
     * from root plugin directory.
    ----------------------------------------------*/
    function bdg_load_plugin_templates( $template ) {
      // custom
      if(  get_page_template_slug() === 'template-custom.php' ) {
        if ( $theme_file = locate_template( array( 'template-custom.php' ) ) ) {
          $template = $theme_file;
        } else {
          $template = BDG_PLUGIN_DIR . '/template-custom.php';
        }
      }
      // // example (uncomment to use)
      // if(  get_page_template_slug() === 'template-example.php' ) {
      //   if ( $theme_file = locate_template( array( 'template-example.php' ) ) ) {
      //     $template = $theme_file;
      //   } else {
      //     $template = BDG_PLUGIN_DIR . '/template-example.php';
      //   }
      // }
      // // throw error if none
      if($template == '') {
        throw new \Exception('No template found');
      }
      return $template;
    }



    /*----------------------------------------------djh Oct 30, 2018
      Modify Storefront with hooks
      REFERENCE: 
        https://docs.woocommerce.com/document/storefront-hooks-actions-filters/
        https://github.com/woocommerce/storefront/blob/master/inc/storefront-template-hooks.php
        https://businessbloomer.com/storefront-theme-visual-hook-guide/
    ----------------------------------------------*/
    function bdg_modify_storefront_templates() {
      if ( is_admin() ) {
        return;
      }
      // EXAMPLE: REPLACE HOMEPAGE HEADER
      // remove_action( 'storefront_homepage', 'storefront_homepage_header', 10 );
      // add_action( 'storefront_homepage', array($this,'bdg_storefront_homepage_header'), 15 );

      // EXAMPLE: SEEK AND DESTROY
      // remove_action('storefront_header', 'storefront_skip_links', 0);
      // remove_action('storefront_header', 'storefront_social_icons', 10);
      // remove_action('storefront_header', 'storefront_site_branding', 20);
      // remove_action('storefront_header', 'storefront_secondary_navigation', 30);
      // remove_action('storefront_header', 'storefront_product_search', 40);
      // remove_action('storefront_header', 'storefront_primary_navigation', 99);
      // remove_action('storefront_header', 'storefront_header_cart', 60);

      // EXAMPLE: SEEK AND REBUILD
      // add_action('storefront_header', array($this,'bdg_secondary_menu'), 61);

      // EXAMPLE: REPLACE FOOOTER CREDITS
      // remove_action( 'storefront_footer', 'storefront_credit', 20 ); 
      // add_action( 'storefront_footer', array($this, 'bdg_custom_footer_credit'), 20 );

    }
    /*----------------------------------------------djh Oct 29, 2018
      EXAMPLE: REPLACE HOMEPAGE HEADER
      NOTE: Here we're changing title to an h2 and adding custom classes
    ----------------------------------------------*/
    function bdg_storefront_homepage_header() {
      if ( is_admin() ) {
        return;
      }
      edit_post_link( __( 'Edit this section', 'storefront' ), '', '', '', 'button storefront-hero__button-edit' );
      ?>
      <header class="entry-header">
        <?php
        the_title( '<h2 class="entry-title custom-class-1 custom-class-2">', '</h2>' );
        ?>
      </header><!-- .entry-header -->
      <?php
    }
    /*----------------------------------------------djh Oct 29, 2018
      EXAMPLE: REPLACE FOOOTER CREDITS
    ----------------------------------------------*/
    function bdg_custom_footer_credit() {
      ?>
      <div class="footer-copyright"><?php echo 'Copyright &copy; ' . date('Y') . ' Company Name Here'; ?></div>
      <div class="footer-credit"><?php echo sprintf('<div id="footer-credit"><a href="%s">WEBSITE DESIGN BY BRKICH DESIGN GROUP</a></div>',esc_url('https://brkichdesign.com/')); ?><div id="backToTop" class="hidden-by-default"><a id="backToTopLink" href="#page" title="Back to top"><i class="far fa-arrow-up"></i></a></div></div>

      <?php 
    }
    /*----------------------------------------------djh Sep 16, 2018
      EXAMPLE: Create Secondary Menu
    ----------------------------------------------*/ 
    function bdg_secondary_menu() {
      $args = array(
        'menu' => 'Secondary Menu',
        'container' => 'nav',
        'container_id' => 'secondary-navigation',
        'container_class' => 'main-navigation',
        // 'items_wrap'     => '<ul><li id="item-id">Catering</li>%3$s</ul>'
      );
      wp_nav_menu($args);
    }


    /*----------------------------------------------djh Oct 30, 2018
      Replaces Storefront/Child google fonts with your own
    ----------------------------------------------*/
    /**
     * @param  array $fonts the desired fonts.
     * @return array
     */
    public function bdg_google_fonts( $fonts ) {
      if ( is_admin() ) {
        return;
      }
      $fonts = array(
        'montserrat'  => 'Montserrat:400,400i,700',
        'oswald'      => 'Oswald:400,700',
      );
      return $fonts;
    }

  } // END BDG_Customs class
}
