<?php
/*
Plugin Name: Policarpe
Description: Un vínculo a la página web de Accesorios Espaciales.
Version: 1.1
Author: APRDELESP
*/

function policarpe_enqueue_scripts()
{
    wp_enqueue_script('jquery-ui-draggable');
    wp_enqueue_script('policarpe-js', plugin_dir_url(__FILE__) . 'policarpe.js', array('jquery', 'jquery-ui-draggable'), null, true);
    wp_enqueue_style('policarpe-css', plugin_dir_url(__FILE__) . 'policarpe.css');
    wp_enqueue_style('tippy-css', 'https://unpkg.com/tippy.js@6/dist/tippy.css');
    wp_enqueue_style('tippy-css-svg-arrow', 'https://unpkg.com/tippy.js@6/dist/svg-arrow.css');
    wp_enqueue_style('tippy-css-border', 'https://unpkg.com/tippy.js@6/dist/border.css');
    wp_enqueue_script('popper-js', 'https://unpkg.com/@popperjs/core@2');
    wp_enqueue_script('tippy-js', 'https://unpkg.com/tippy.js@6');
}

add_action('wp_enqueue_scripts', 'policarpe_enqueue_scripts');

function display_policarpe_image()
{
    $image_directory = plugin_dir_url(__FILE__) . 'images/';
    $default_image = $image_directory . 'apagado.png'; // Replace with your default image filename
    $hover_image = $image_directory . 'prendido.png'; // Replace with your hover image filename

    echo '<a href="https://accesoriosespaciales.com" target="_blank" id="policarpe-link">';
    echo '<img src="' . esc_url($default_image) . '" data-hover="' . esc_url($hover_image) . '" id="draggable-image" />';
    echo '</a>';
}

add_action('wp_footer', 'display_policarpe_image');