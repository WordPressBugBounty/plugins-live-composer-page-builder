<?php

/**
 * Table of contents
 *
 * - dslc_plugin_action_links ( Additional links on plugin listings page )
 * - dslc_icons
 * - dslc_w3tc_admin_notice (Show notice if some of the W3TC settings are problematic)
 */

// Prevent direct access to the file.
if ( ! defined( 'ABSPATH' ) ) {
	header( 'HTTP/1.0 403 Forbidden' );
	exit;
}


/**
 * Additional links on plugin listings page
 *
 * @since 1.0
 */

function dslc_plugin_action_links( $links ) {

	// Woo integration
	$woo_integration_link = '<a href="https://livecomposerplugin.com/downloads/woocommerce-page-builder/?utm_source=wp-admin&utm_medium=plugins-list&utm_campaign=woo_integration_link" target="_blank">Woo integration</a>';
	array_unshift( $links, $woo_integration_link );

	// Themes link
	$themes_link = '<a href="https://livecomposerplugin.com/themes/?utm_source=wp-admin&utm_medium=plugins-list&utm_campaign=themes_link" target="_blank">Themes</a>';
	array_unshift( $links, $themes_link );

	// Addons link
	$addons_link = '<a href="https://livecomposerplugin.com/downloads/extensions/?utm_source=wp-admin&utm_medium=plugins-list&utm_campaign=addons_link" target="_blank">Extensions</a>';
	array_unshift( $links, $addons_link );

	// Support link
	$support_link = '<a href="https://livecomposerplugin.com/support/?utm_source=wp-admin&utm_medium=plugins-list&utm_campaign=support_link" target="_blank">Support</a>';
	array_unshift( $links, $support_link );

	// Pass it back
	return $links;

} add_filter( 'plugin_action_links_' . DS_LIVE_COMPOSER_BASENAME, 'dslc_plugin_action_links' );

function dslc_icons() {

	global $dslc_var_icons;

	$dslc_var_icons = array(
		'fontawesome' => array( '500px', 'adjust', 'adn', 'align-center', 'align-justify', 'align-left', 'align-right', 'amazon', 'ambulance', 'anchor', 'android', 'angellist', 'angle-down', 'angle-left', 'angle-right', 'angle-up', 'apple', 'archive', 'area-chart', 'circle-arrow-left', 'circle-arrow-right', 'arrow-down', 'arrow-left', 'arrow-right', 'arrow-up', 'asterisk', 'at', 'automobile', 'backward', 'balance-scale', 'ban', 'bank', 'bar-chart-o', 'barcode', 'battery-0', 'battery-1', 'battery-2', 'battery-3', 'battery-4', 'battery-empty', 'battery-full', 'battery-half', 'battery-quarter', 'battery-three-quarters', 'flask', 'bed', 'beer', 'behance', 'behance-square', 'bell', 'bell-o', 'bell-slash', 'bell-slash-o', 'bicycle', 'binoculars', 'birthday-cake', 'bitbucket', 'bitbucket-square', 'bitcoin', 'black-tie', 'bold', 'bolt', 'bomb', 'book', 'bookmark', 'bookmark-empty', 'briefcase', 'btc', 'bug', 'building', 'building', 'bullhorn', 'bullseye', 'bus', 'buysellads', 'cab', 'calculator', 'calendar', 'calendar-check-o', 'calendar-o', 'calendar-minus-o', 'calendar-plus-o', 'calendar-times-o', 'camera', 'camera-retro', 'car', 'caret-down', 'caret-left', 'caret-right', 'caret-square-o-left', 'caret-up', 'cart-arrow-down', 'cart-plus', 'cc', 'cc-amex', 'cc-diners-club', 'cc-discover', 'cc-jcb', 'cc-mastercard', 'cc-paypal', 'cc-stripe', 'cc-visa', 'certificate', 'check', 'square-o', 'minus-square-o', 'check-square', 'chevron-down', 'chevron-left', 'chevron-right', 'chevron-circle-down', 'chevron-circle-left', 'chevron-circle-right', 'chevron-circle-up', 'chevron-up', 'child', 'chrome', 'circle', 'arrow-circle-o-down', 'circle-arrow-left', 'circle-arrow-right', 'arrow-circle-o-up', 'circle-blank', 'circle-o-notch', 'circle-thin', 'clone', 'cloud', 'cloud-download', 'cloud-upload', 'cny', 'code', 'code-fork', 'codepen', 'coffee', 'cog', 'cogs', 'minus', 'caret-square-o-up', 'columns', 'comment', 'comment-o', 'commenting', 'commenting-o', 'comments', 'comments-o', 'compass', 'connectdevelop', 'contao', 'copy', 'copyright', 'creative-commons', 'credit-card', 'crop', 'css3', 'cube', 'cubes', 'cut', 'dashboard', 'dashcube', 'database', 'delicious', 'desktop', 'deviantart', 'diamond', 'digg', 'dollar', 'dot-circle-o', 'angle-double-down', 'angle-double-left', 'angle-double-right', 'double-angle-up', 'arrow-circle-o-down', 'download', 'dribbble', 'dropbox', 'drupal', 'pencil-square-o', 'pencil-square', 'eject', 'ellipsis-h', 'ellipsis-v', 'empire', 'envelope', 'envelope-o', 'envelope-square', 'eraser', 'eur', 'euro', 'exchange', 'exclamation', 'exclamation-circle', 'expand', 'expeditedssl', 'external-link', 'external-link-square', 'eye-slash', 'eye', 'eyedropper', 'facebook', 'facebook-official', 'facebook-square', 'video-camera', 'fast-backward', 'fast-forward', 'fax', 'female', 'fighter-jet', 'file', 'file-o', 'file-archive-o', 'file-audio-o', 'file-code-o', 'file-excel-o', 'file-image-o', 'file-movie-o', 'file-pdf-o', 'file-photo-o', 'file-picture-o', 'file-powerpoint-o', 'file-sound-o', 'file-text', 'file-text-o', 'file-video-o', 'file-word-o', 'file-zip-o', 'film', 'filter', 'fire', 'fire-extinguisher', 'firefox', 'flag', 'flag-o', 'flag-checkered', 'flickr', 'folder', 'folder-o', 'folder-open', 'folder-open-o', 'font', 'fonticons', 'cutlery', 'forumbee', 'forward', 'foursquare', 'frown-o', 'arrows-alt', 'futbol-o', 'gamepad', 'gbp', 'ge', 'gear', 'gears', 'get-pocket', 'gg', 'gg-circle', 'gift', 'git', 'git-square', 'github', 'github-alt', 'github-square', 'gittip', 'glass', 'globe', 'google', 'google-plus', 'google-plus-square', 'google-wallet', 'graduation-cap', 'group', 'h-square', 'hacker-news', 'hand-o-down', 'hand-grab-o', 'hand-o-left', 'hand-lizard-o', 'hand-paper-o', 'hand-peace-o', 'hand-pointer-o', 'hand-o-right', 'hand-rock-o', 'hand-scissors-o', 'hand-spock-o', 'hand-stop-o', 'hand-o-up', 'hdd-o', 'header', 'headphones', 'heart', 'heart-o', 'heartbeat', 'history', 'home', 'hospital-o', 'hotel', 'hourglass', 'hourglass-1', 'hourglass-2', 'hourglass-3', 'hourglass-end', 'hourglass-half', 'hourglass-o', 'hourglass-start', 'houzz', 'html5', 'i-cursor', 'ils', 'inbox', 'outdent', 'indent', 'industry', 'info', 'info-circle', 'inr', 'instagram', 'institution', 'internet-explorer', 'ioxhost', 'italic', 'joomla', 'jpy', 'jsfiddle', 'key', 'keyboard-o', 'krw', 'language', 'laptop', 'lastfm', 'lastfm-square', 'leaf', 'leanpub', 'legal', 'lemon-o', 'level-down', 'level-up', 'life-bouy', 'life-ring', 'life-saver', 'lightbulb-o', 'line-chart', 'link', 'linkedin', 'linkedin-square', 'linux', 'list', 'list-alt', 'list-ol', 'list-ul', 'location-arrow', 'lock', 'long-arrow-down', 'long-arrow-left', 'long-arrow-right', 'long-arrow-up', 'magic', 'magnet', 'mail-forward', 'mail-reply', 'mail-reply-all', 'male', 'map', 'map-marker', 'map-o', 'map-pin', 'map-signs', 'mars', 'mars-double', 'mars-stroke', 'mars-stroke-h', 'mars-stroke-v', 'maxcdn', 'meanpath', 'medium', 'medkit', 'meh-o', 'mercury', 'microphone', 'microphone-slash', 'minus', 'minus-circle', 'minus-square', 'mobile-phone', 'money', 'moon-o', 'mortar-board', 'motorcycle', 'mouse-pointer', 'arrows', 'music', 'neuter', 'newspaper-o', 'object-group', 'object-ungroup', 'odnoklassniki', 'odnoklassniki-square', 'power-off', 'check', 'check-circle-o', 'check-circle', 'opencart', 'openid', 'opera', 'optin-monster', 'pagelines', 'paint-brush', 'paperclip', 'paper-plane', 'paper-plane-o', 'paperclip', 'paragraph', 'paste', 'pause', 'paw', 'paypal', 'pencil', 'phone', 'phone-square', 'picture-o', 'pie-chart', 'pied-piper', 'pied-piper-alt', 'pied-piper-pp', 'pinterest', 'pinterest-p', 'pinterest-square', 'plane', 'play', 'play-circle-o', 'play-circle', 'plug', 'plus', 'plus-circle', 'plus-square', 'power-off', 'print', 'thumb-tack', 'puzzle-piece', 'qq', 'qrcode', 'question', 'question-circle', 'quote-left', 'quote-right', 'ra', 'random', 'rebel', 'recycle', 'reddit', 'reddit-square', 'refresh', 'registered', 'remove', 'times-circle-o', 'times-circle', 'renren', 'reorder', 'repeat', 'reply', 'reply-all', 'expand', 'arrows-h', 'compress', 'arrows-v', 'retweet', 'road', 'rocket', 'rotate-left', 'rotate-right', 'rouble', 'rss', 'rss-square', 'rupee', 'safari', 'save', 'crosshairs', 'search', 'sellsy', 'send', 'send-o', 'server', 'share', 'share-alt', 'share-alt', 'share-alt-square', 'share-square', 'shield', 'ship', 'shirtsinbulk', 'shopping-cart', 'square', 'signal', 'sign-in', 'sign-out', 'simplybuilt', 'sitemap', 'skyatlas', 'skype', 'slack', 'sliders', 'slideshare', 'smile-o', 'sort', 'sort-alpha-asc', 'sort-alpha-desc', 'sort-amount-asc', 'sort-amount-desc', 'sort-numeric-asc', 'sort-numeric-desc', 'sort-down', 'sort-up', 'soundcloud', 'space-shuttle', 'spinner', 'spoon', 'spotify', 'stack-exchange', 'stack-overflow', 'star', 'star-o', 'star-half', 'star-half-empty', 'star-half-full', 'steam', 'steam-square', 'step-backward', 'step-forward', 'stethoscope', 'sticky-note', 'sticky-note-o', 'stop', 'street-view', 'strikethrough', 'stumbleupon', 'stumbleupon-circle', 'subscript', 'subway', 'suitcase', 'sun', 'superscript', 'support', 'table', 'tablet', 'tag', 'tags', 'tasks', 'taxi', 'television', 'tencent-weibo', 'terminal', 'text-height', 'text-width', 'th', 'th-large', 'th-list', 'thumbs-down', 'thumbs-o-down', 'thumbs-up', 'thumbs-o-up', 'ticket', 'clock-o', 'tint', 'toggle-off', 'toggle-on', 'trademark', 'train', 'transgender', 'transgender-alt', 'trash', 'trash', 'tree', 'trello', 'tripadvisor', 'trophy', 'truck', 'tty', 'tumblr', 'tumblr-square', 'turkish-lira', 'tv', 'twitch', 'twitter', 'twitter-sign', 'umbrella', 'square-o', 'underline', 'undo', 'university', 'chain-broken', 'unlock', 'unlock-alt', 'arrow-circle-o-up', 'upload', 'usd', 'user', 'user-md', 'user-plus', 'user-secret', 'user-times', 'venus', 'venus-double', 'venus-mars', 'viacoin', 'vimeo', 'vimeo-square', 'vine', 'vk', 'volume-down', 'volume-off', 'volume-up', 'exclamation-triangle', 'wechat', 'weibo', 'weixin', 'whatsapp', 'wheelchair', 'wifi', 'wikipedia-w', 'windows', 'won', 'wordpress', 'wrench', 'xing', 'xing-square', 'y-combinator', 'yahoo', 'yc', 'yelp', 'yen', 'youtube', 'youtube-play', 'youtube-square', 'search-plus', 'search-minus' ),
	);

	// Allow devs to alter available icons
	$dslc_var_icons = apply_filters( 'dslc_available_icons', $dslc_var_icons );

	// Dear developers, make sure to have icon set name written without spaces
	global $dslc_var_icon_fonts;

	$dslc_var_icon_fonts = array(
		'fontawesome' => array(
				'font_path' => DS_LIVE_COMPOSER_URL . 'css/font-awesome.css', // File.
				'version' => DS_LIVE_COMPOSER_VER, // Version stamp to reset browser cache.
			),
	);

	$dslc_var_icon_fonts = apply_filters( 'dslc_icon_fonts', $dslc_var_icon_fonts );

	/**
	 * Usage example from 3-rd party plugin:
	 *
	 * function sklc_linecons_alter_icons( $icons ) {
	 * 	$icons['linecons'] = array( "linecons-banknote", "linecons-bubble", ... );
	 * 	return $icons;
	 * } add_filter( 'dslc_available_icons', 'sklc_linecons_alter_icons' );
	 *
	 * function sklc_linecons_add_files( $icon_fonts ) {
	 * 	$icon_fonts['linecons'] = array(
	 * 		'font_path' => plugin_dir_url( __FILE__ ) . 'css/font-linecons.css',
	 * 	),
	 * 	return $icon_fonts;
	 * } add_filter( 'dslc_icon_fonts', 'sklc_linecons_add_files' );
	 */

} add_action( 'init', 'dslc_icons' );



/**
 * Output the modal with icons when LC is in active editing mode
 *
 * @since 1.8
 */

function dslc_icons_modal() {

	// Make no sense to continue if used not logged in.
	if ( ! is_user_logged_in() ) {
		return;
	}

	global $dslc_active,
			 $dslc_var_icons; // Array with icon sets.

	$screen = get_current_screen();
	$screens_with_icon_modal = array(
			'toplevel_page_livecomposer_editor',
			'nav-menus', // used by premium mega menu extension.
		);

	if ( ! is_object( $screen ) ) {
		return;
	}

	if ( ! in_array( $screen->id, $screens_with_icon_modal, true ) ) {
		return;
	}

	if ( current_user_can( DS_LIVE_COMPOSER_CAPABILITY ) ) {

		// Output list of icons.
			echo '<div class="dslca-modal-icons dslca-modal dslc-list-icons" style="display:none;">';
				echo '<ul class="dslc-icons-grid">';
		foreach ( $dslc_var_icons as $key => $value ) {

			echo '<li class="set-heading">' . $key . '</li>';

			foreach ( $dslc_var_icons[ $key ] as $k => $v ) {
				$icon_name = $v;
				echo '<li class="icon-item">';
					echo '<span class="icon-item_icon dslc-icon-' . $icon_name . '"></span>';
					echo '<span class="icon-item_name">' . $icon_name . '</span>';
				echo '</li>';
			}
		}

				echo '</ul>';
			echo '</div><div class="dslca-prompt-modal-custom"></div>';
	}
}
add_action( 'admin_footer', 'dslc_icons_modal' );


/**
 * Show notice if wrong settings detected in the W3TC plugin
 *
 * @since 1.0.7
 *
 * Check important settings in the W3TC plugin
 * to make sure it doesn't break our page builder
 * with unnecessary page caching or minimization
 */

function dslc_w3tc_admin_notice() {

	if ( class_exists( 'W3_Root' ) ) {

		$w3tc_config = w3_instance( 'W3_Config' );

		$screen = get_current_screen();
		$current_parent_base = $screen->parent_base;

		$notice_id = 'w3tc_wrong_settings';
		$display_notice = false;
		$notice_dismissed = dslc_notice_dismissed( $notice_id );
		$notice_nonce = dslc_generate_notice_nonce( $notice_id );

		// Page Cache
		// Don't cache pages for logged in users
		$pgcache_reject_logged = $w3tc_config->get_boolean( 'pgcache.reject.logged' );

		// Minify
		$minify_reject_logged = $w3tc_config->get_boolean( 'minify.reject.logged' );

		// Database cache
		$dbcache_reject_logged = $w3tc_config->get_boolean( 'dbcache.reject.logged' );

		if ( ! $notice_dismissed && ( ! $pgcache_reject_logged || ! $minify_reject_logged || ! $dbcache_reject_logged ) ) {
			$display_notice = true;
		}

		if ( $display_notice && $current_parent_base != 'dslc_plugin_options' ) {?>

			<div class="notice dslc-notice notice-error is-dismissible" id="<?php echo $notice_id; ?>" data-nonce="<?php echo $notice_nonce; ?>">
				<p><?php _e( 'There is a problem in W3 Total Cache plugin settings that <strong>can break your page builder</strong>. Luckily, <a href="' . admin_url( 'admin.php?page=dslc_getting_started' ) . '">it\'s easy to fix it</a>.', 'live-composer-page-builder' ); ?></p>
			</div><?php

		} elseif ( $display_notice && $current_parent_base == 'dslc_plugin_options' ) { ?>

				<div class="notice dslc-notice notice-error is-dismissible" id="<?php echo $notice_id; ?>" data-nonce="<?php echo $notice_nonce; ?>">
					<p><?php _e( 'Wrong <strong>W3 Total Cache plugin</strong> settings can break Live Composer. Please check the next settings:', 'live-composer-page-builder' ); ?></p>
					<ul style="padding-left: 30px;">
						<?php if ( ! $pgcache_reject_logged ) { ?>
							<li type="disc"><?php
								echo ' <a href="' . admin_url( 'admin.php?page=w3tc_pgcache' ) . '" target="_blank">';
								_e( 'WP Admin &#8594; Performance &#8594; Page Cache', 'live-composer-page-builder' );
								echo ' &#8594; ';
								_e( 'General ', 'live-composer-page-builder' );
								echo '</a> &#8594;<strong> ';
								_e( 'Don\'t cache pages for logged in users', 'live-composer-page-builder' );
								echo '</strong> ';
								_e( '– should be selected', 'live-composer-page-builder' );
								?>
							</li>
						<?php } ?>
						<?php if ( ! $minify_reject_logged ) { ?>
							<li type="disc"><?php
								echo ' <a href="' . admin_url( 'admin.php?page=w3tc_minify' ) . '" target="_blank">';
								_e( 'WP Admin &#8594; Performance &#8594; Page Cache', 'live-composer-page-builder' );
								echo ' &#8594; ';
								_e( 'Minify ', 'live-composer-page-builder' );
								echo '</a> &#8594;<strong> ';
								_e( 'Disable minify for logged in users', 'live-composer-page-builder' );
								echo '</strong> ';
								_e( '– should be selected', 'live-composer-page-builder' );
								?>
							</li>
						<?php } ?>
						<?php if ( ! $dbcache_reject_logged ) { ?>
							<li type="disc"><?php
								echo ' <a href="' . admin_url( 'admin.php?page=w3tc_dbcache' ) . '" target="_blank">';
								_e( 'WP Admin &#8594; Performance &#8594; Page Cache', 'live-composer-page-builder' );
								echo ' &#8594; ';
								_e( 'Database Cache ', 'live-composer-page-builder' );
								echo '</a> &#8594;<strong> ';
								_e( 'Don\'t cache queries for logged in users', 'live-composer-page-builder' );
								echo '</strong> ';
								_e( '– should be selected', 'live-composer-page-builder' );
								?>
							</li>
						<?php } ?>
					</ul>
				</div>
		<?php }// End if().
	}// End if().

}
add_action( 'admin_notices', 'dslc_w3tc_admin_notice' );

/**
 * Show notice if wrong settings detected in WP Admin > General
 *
 * @since 1.0.8
 *
 * Check settings in WP Admin > General. 
 * It's recommended to have WordPress Address and Site Address pointing
 * at the same URL.  Otherwise we can have an issue when WordPress
 * set authentication cookies for WordPress Address only. 
 * In this case users can't edit website via front end
 * as they not logged in as admin there.
 */
function dslc_check_wpsettings_admin_notice() {

	$wp_url = get_option( 'siteurl' );
	$wp_site_url = get_option( 'home' );
	$check_url = strcmp( $wp_url, $wp_site_url );

	$screen = get_current_screen();
	$current_parent_base = $screen->parent_base;

	$notice_id = 'wrong_wpsettings_settings';
	$display_notice = false;
	$notice_dismissed = dslc_notice_dismissed( $notice_id );
	$notice_nonce = dslc_generate_notice_nonce( $notice_id );

	if ( ! $notice_dismissed && $check_url ) {
		$display_notice = true;
	}

	if ( $display_notice && $current_parent_base != 'dslc_plugin_options' ) {?>

		<div class="notice dslc-notice notice-error is-dismissible" id="<?php echo $notice_id; ?>" data-nonce="<?php echo $notice_nonce; ?>">
			<p><?php _e( '<strong>Live Composer:</strong> probably there is a problem with your website settings. <a href="' . admin_url( 'admin.php?page=dslc_plugin_options' ) . '">Click here to find out more.</a>', 'live-composer-page-builder' ); ?></p>
		</div><?php

	} elseif ( $display_notice && $current_parent_base == 'dslc_plugin_options' ) { ?>

			<div class="notice dslc-notice notice-error is-dismissible" id="<?php echo $notice_id; ?>" data-nonce="<?php echo $notice_nonce; ?>">
				<p><?php _e( 'Wrong settings found in <strong><a href="' . admin_url( 'options-general.php' ) . '" target="_blank">WP Admin &#8594; Settings</a></strong>: <strong>Wordpress Address</strong> and <strong>Site Address</strong> should be the same to make front-editing possible with Live Composer.', 'live-composer-page-builder' ); ?></p>
			</div>
	<?php }
}
add_action( 'admin_notices', 'dslc_check_wpsettings_admin_notice' );

function dslc_module_options_func( $module_options ) {

	$other_options = DSLC_Module::common_options();
	$options = array_merge( $module_options, $other_options['custom_class'] );

	$elements_key = array_search( 'styling', array_column( $options, 'section' ) );
	array_splice( $options, $elements_key + 1, 0, $other_options['css_custom'] );

	return $options;
}
add_filter( 'dslc_module_options', 'dslc_module_options_func', 1 );


/**
 * Remove Yoast WP meta-boxes for Header/Footer and Template CPT
 *
 * @return void
 */
function dslc_remove_yoast_metabox() {
	$disalbe_for_cpt = array(
		'dslc_hf',
		'dslc_templates',
		'dslc_testimonials', // Testimonials CPT has no public posts.

	);

	foreach ( $disalbe_for_cpt as $cpt ) {
		remove_meta_box( 'wpseo_meta', $cpt, 'normal' );
	}
}
add_action( 'add_meta_boxes', 'dslc_remove_yoast_metabox', 11 );
