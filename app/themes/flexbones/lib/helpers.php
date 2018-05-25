<?php 
/**
 * Shortcut to the assets folder
 * easier to read than get_stylesheet_directory_uri() . '/assets/folder'
 * direct output and get_output
 */

function get_assets($subdir){
    return get_stylesheet_directory_uri() .'/assets'.($subdir ? '/'. $subdir : '');
}

function assets($subdir){
    echo get_stylesheet_directory_uri() .'/assets'.($subdir ? '/'. $subdir : '');
}

function custom_jquery() {
	wp_deregister_script('jquery');
	wp_enqueue_script('jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js', array(), null, true);
}
add_action('wp_enqueue_scripts', 'custom_jquery');