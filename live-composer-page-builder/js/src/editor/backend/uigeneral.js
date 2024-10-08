/*********************************
 *
 * = UI - GENERAL =
 *
 * - dslc_hide_composer ( Hides the composer elements )
 * - dslc_show_composer ( Shows the composer elements )
 * - dslc_show_publish_button ( Shows the publish button )
 * - dslc_show_section now showSection ( Show a specific section )
 * - dslc_generate_filters ( Generate origin filters )
 * - dslc_filter_origin ( Origin filtering for templates/modules listing )
 * - dragAndDropInit ( Initiate drag and drop functionality )
 ***********************************/

import { elementOptionsTabs } from './settings.panel.js';
import { CModalWindow } from './modalwindow.class.js';

import Sortable from 'sortablejs';

/**
 * Try to detect JS errors in WP Admin part.
 */
 window.onerror = function( error, file, line, char ) {

	dslca_generate_error_report ( error, file, line, char );
}

/**
 * Hook - Open Error Log button
 */
jQuery(document).on( 'click', '.dslca-show-js-error-hook', function(e){

	e.preventDefault();

	var errors_container = document.getElementById('dslca-js-errors-report');

	if ( ! jQuery('body').hasClass('dslca-saving-in-progress') ) {

		CModalWindow({

			title: '<a href="https://livecomposerplugin.com/support/" target="_blank"><span class="dslca-icon dslc-icon-comment"></span> &nbsp; Get Support Info</a>',
			content: '<span class="dslca-error-report">' + errors_container.value + '</span>',
		});
	}
});


/**
 * UI - GENERAL - Document Ready
 */

jQuery(document).ready(function($) {

	/**
	 * Try to detect JS errors in preview area.
	 */
	jQuery("#page-builder-frame")[0].contentWindow.onerror = function( error, file, line, char ) {
		dslca_generate_error_report ( error, file, line, char );
	}

	// Put JS error log data in a hidden textarea.
	dslca_update_report_log();

 	jQuery('body').addClass('dslca-enabled dslca-drag-not-in-progress');
 	jQuery('.dslca-invisible-overlay').hide();
 	jQuery('.dslca-section').eq(0).show();
});

/**
 * Action - "Currently Editing" scroll on click
 */

jQuery(document).on( 'click', '.dslca-currently-editing', function(){

	var activeElement = false,
	newOffset = false,
	outlineColor;

	if ( jQuery('.dslca-module-being-edited', LiveComposer.Builder.PreviewAreaDocument).length ) {

		activeElement = jQuery('.dslca-module-being-edited', LiveComposer.Builder.PreviewAreaDocument);
		outlineColor = '#5890e5';

	} else if ( jQuery('.dslca-modules-section-being-edited', LiveComposer.Builder.PreviewAreaDocument).length ) {

		activeElement = jQuery('.dslca-modules-section-being-edited', LiveComposer.Builder.PreviewAreaDocument);
		outlineColor = '#eabba9';
	}

	if ( activeElement ) {
		newOffset = activeElement.offset().top - 100;
		if ( newOffset < 0 ) { newOffset = 0; }

		var callbacks = [];

		jQuery( 'html, body', LiveComposer.Builder.PreviewAreaDocument ).animate({ scrollTop: newOffset }, 300, function(){
			activeElement.removeAttr('style');
		});
	}

});

/**
 * Save composer code with CMD+S or Ctrl+S
 */
jQuery(window).keypress( function(e){

	if ((e.metaKey || e.ctrlKey) && e.keyCode == 83) {

		dslc_ajax_save_composer();
		e.preventDefault();
        return false;
	}
});

/**
 * Hook - Hide Composer
 */

jQuery(document).on( 'click', '.dslca-hide-composer-hook', function(e){

	e.preventDefault();
	dslc_hide_composer()
});

/**
 * Hook - Show Composer
 */

jQuery(document).on( 'click', '.dslca-show-composer-hook', function(e){
	e.preventDefault();
	dslc_show_composer();
});

/**
 * Hook - Section Show - Modules Listing
 */

jQuery(document).on( 'click', '.dslca-go-to-modules-hook', function(e){
	e.preventDefault();
	showSection( '.dslca-modules' );
});

/**
 * Hook - Section Show - Dynamic
 */

jQuery(document).on( 'click', '.dslca-go-to-section-hook', function(e){

	e.preventDefault();

	// Do nothing if clicked on active tab
	if ( jQuery(this).hasClass('dslca-active') ) {

		return;
	}

	var sectionTitle = jQuery(this).data('section');
	showSection( sectionTitle );

	if ( jQuery(this).hasClass('dslca-go-to-section-modules') || jQuery(this).hasClass('dslca-go-to-section-templates')  ) {

		jQuery(this).addClass('dslca-active').siblings('.dslca-go-to-section-hook').removeClass('dslca-active');
	}
});

/**
 * Hook - Close Composer
 */

jQuery(document).on( 'click', '.dslca-close-composer-hook', function(e){

	e.preventDefault();

	var redirect_url = jQuery(this).attr('href');

	if ( ! jQuery('body').hasClass('dslca-saving-in-progress') && jQuery('.dslca-save-composer').is(':visible') ) {
		// Show warning if changes weren't saved.
		CModalWindow({

			title: DSLCString.str_exit_title,
			content: DSLCString.str_exit_descr,
			confirm: function() {
				window.location = redirect_url;
			}
		});
	} else {
		window.location = redirect_url;
	}
});

/**
 * Submit Form
 */

jQuery(document).on( 'click', '.dslca-submit', function(){
	jQuery(this).closest('form').submit();
});

/**
 * Hook - Show Origin Filters
 */

jQuery(document).on( 'click', '.dslca-section-title', function(e){

	e.stopPropagation();

	if ( jQuery('.dslca-section-title-filter', this).length ) {

		dslc_generate_filters();

		// Open filter panel
		jQuery('.dslca-section-title-filter-options').slideToggle(300);
	}
});

/**
 * Hook - Apply Filter Origin
 */

jQuery(document).on( 'click', '.dslca-section-title-filter-options a', function(e){

	e.preventDefault();
	e.stopPropagation();

	var origin = jQuery(this).data('origin');
	var section = jQuery(this).closest('.dslca-section');

	if ( section.hasClass('dslca-templates-load') ) {
		jQuery('.dslca-section-title-filter-curr', section).text( jQuery(this).text());
	} else {
		jQuery('.dslca-section-title-filter-curr', section).text( jQuery(this).text());
	}

	jQuery('.dslca-section-scroller-inner').css({ left : 0 });

	dslc_filter_origin( origin, section );

	// Close filter panel
	jQuery('.dslca-section-title-filter-options').slideToggle(300);
});


/**
 * UI - GENERAL - Hide Composer
 */

function dslc_hide_composer() {

	if ( window.dslcDebug ) console.log( 'dslc_hide_composer' );

	// Hide "hide" button and show "show" button
	jQuery('.dslca-hide-composer-hook').hide();
	jQuery('.dslca-show-composer-hook').show();

	// Add class to know it's hidden
	jQuery('body').addClass('dslca-composer-hidden');
	jQuery('body', LiveComposer.Builder.PreviewAreaDocument).addClass('dslca-composer-hidden');
	LiveComposer.Builder.Flags.uiHidden = true;


	// Hide ( animation ) the main composer area ( at the bottom )
	jQuery('.dslca-container').css({ bottom : jQuery('.dslca-container').outerHeight() * -1 });

	// Hide the header  part of the main composer area ( at the bottom )
	jQuery('.dslca-header').hide();

}

/**
 * UI - GENERAL - Show Composer
 */

function dslc_show_composer() {

	if ( window.dslcDebug ) console.log( 'dslc_show_composer' );

	// Hide the "show" button and show the "hide" button
	jQuery('.dslca-show-composer-hook').hide();
	jQuery('.dslca-hide-composer-hook').show();

	// Remove the class from the body so we know it's not hidden
	jQuery('body').removeClass('dslca-composer-hidden');
	jQuery('body', LiveComposer.Builder.PreviewAreaDocument).removeClass('dslca-composer-hidden');
	LiveComposer.Builder.Flags.uiHidden = false;


	// Show ( animate ) the main composer area ( at the bottom )
	jQuery('.dslca-container').css({ bottom : 0 });

	// Show the header of the main composer area ( at the bottom )
	jQuery('.dslca-header').show();
}

/**
 * UI - GENERAL - Show Publish Button
 */

window.dslc_show_publish_button = function() {

	if ( window.dslcDebug ) console.log( 'dslc_show_publish_button' );

	jQuery('.dslca-save-composer').show().addClass('dslca-init-animation');
	jQuery('.dslca-save-draft-composer').show().addClass('dslca-init-animation');
}

export const hidePublishButton = () => {
	if ( window.dslcDebug ) console.log( 'hidePublishButton' );

	jQuery('.dslca-save-composer').hide();
	jQuery('.dslca-save-draft-composer').hide();
}

/**
 * UI - GENERAL - Show Section
 */

export const showSection = ( section ) => {
	if ( window.dslcDebug ) console.log( 'showSection' );

	// Add class to body so we know it's in progress
	// jQuery('body').addClass('dslca-anim-in-progress');

	// Get vars
	var sectionTitle = jQuery(section).data('title'),
	newColor = jQuery(section).data('bg');

	// Hide ( animate ) the container
	jQuery('.dslca-container').css({ bottom: -500 });

	// Hide all sections and show specific section
	jQuery('.dslca-section').hide();
	jQuery(section).show();

	// Change "currently editing"
	if ( section == '.dslca-module-edit' ) {

		jQuery('.dslca-currently-editing')
			.show()
				.find('strong')
				.text( jQuery('.dslca-module-being-edited', LiveComposer.Builder.PreviewAreaDocument).attr('title') + ' element' );
	} else if ( section == '.dslca-modules-section-edit' ) {

		jQuery('.dslca-currently-editing')
			.show()
			.css( 'background-color', '#e5855f' )
				.find('strong')
				.text( 'Row' );
	} else {

		jQuery('.dslca-currently-editing')
			.hide()
				.find('strong')
				.text('');
	}

	// Filter module option tabs
	elementOptionsTabs();

	// Show ( animate ) the container
	// setTimeout( function() {
		jQuery('.dslca-container').css({ bottom : 0 });
	// }, 300 );

	// Remove class from body so we know it's finished
	// jQuery('body').removeClass('dslca-anim-in-progress');

	// Set initial background color for the color picker fields
	// Fixes the bug with section color pickers to keep values from the previously
	// edited section.
	jQuery(section).find('input.dslca-module-edit-field-colorpicker').each( function (item) {
		jQuery(this).css('background', jQuery(this).val());
	});
}

/**
 * UI - GENERAL - Generate Origin Filters
 */

function dslc_generate_filters() {

	if ( window.dslcDebug ) console.log( 'dslc_generate_filters' );

	// Vars
	var el, filters = [], filtersHTML = '<a html="#" data-origin="">Show All</a>', els = jQuery('.dslca-section:visible .dslca-origin');

	// Go through each and generate the filters
	els.each(function(){
		el = jQuery(this);

		if ( jQuery.inArray( el.data('origin'), filters ) == -1 ) {
			filters.push( el.data('origin') );
			filtersHTML += '<a href="#" data-origin="' + el.data('origin') + '">' + el.data('origin') + '</a>';
		}
	});

	jQuery('.dslca-section:visible .dslca-section-title-filter-options').html( filtersHTML ).css( 'background', jQuery('.dslca-section:visible').data('bg') );
}

/**
 * UI - GENERAL - Origin Filter
 */

function dslc_filter_origin( origin, section ) {

	if ( window.dslcDebug ) console.log( 'dslc_filter_origin' );

	jQuery('.dslca-origin', section).attr('data-display-module', 'false');
	jQuery('.dslca-origin[data-origin="' + origin + '"]', section).attr('data-display-module', 'true');

	if ( origin == '' ) {

		jQuery('.dslca-origin', section).attr('data-display-module', 'true');
		jQuery('.dslca-origin.dslca-exclude', section).attr('data-display-module', 'false')
	}
}


/**
 * Prevent drag and drop of the modules
 * into the inner content areas of the other modules
 */
export const fixContenteditable = () => {

	window.LiveComposer.Builder.PreviewAreaDocument.on('dragstart', '.dslca-module, .dslc-module-front, .dslc-modules-area, .dslc-modules-section', function (e) {

		jQuery('[contenteditable]', window.LiveComposer.Builder.PreviewAreaDocument).attr('contenteditable', false);
	});

	window.LiveComposer.Builder.PreviewAreaDocument.on('dragend mousedown', '.dslca-module, .dslc-module-front, .dslc-modules-area, .dslc-modules-section', function (e) {

		jQuery('[contenteditable]', window.LiveComposer.Builder.PreviewAreaDocument).attr('contenteditable', true);
	});
}

/**
 * Disable/Enable module control.
 *
 * @param  {string} control_id CSS ID of the control we are toggling
 * @return {void}
 */
function dslc_toogle_control ( control_id ) {

	if ( control_id === undefined) control_id = false;
	if ( !control_id ) return;

	var control         = jQuery('.dslca-module-edit-option-' + control_id );
	var control_storage = control.find('.dslca-module-edit-field');

	// Get the element we are editing
	var module = jQuery('.dslca-module-being-edited', LiveComposer.Builder.PreviewAreaDocument);

	// Get the element id
	var module_id = module[0].id;

	var responsive_prefix = '';

	if ( 'tablet_responsive' === control.data('tab') ) {
		responsive_prefix = 'body.dslc-res-tablet ';
	} else if ( 'phone_responsive' === control.data('tab') ) {
		responsive_prefix = 'body.dslc-res-phone ';
	}

	var affect_on_change_el = control_storage.data('affect-on-change-el');

	if ( affect_on_change_el === undefined) return;

	var affect_on_change_elmts = affect_on_change_el.split( ',' );

	affect_on_change_el = '';

	// Loop through elements (useful when there are multiple elements)
	for ( var i = 0; i < affect_on_change_elmts.length; i++ ) {

		if ( i > 0 ) {

			affect_on_change_el += ', ';
		}

		affect_on_change_el += responsive_prefix + '#' + module_id + ' ' + affect_on_change_elmts[i];
	}

	var affect_on_change_rule  = control_storage.data('affect-on-change-rule').replace(/ /g,'');
	var affect_on_change_rules = affect_on_change_rule.split( ',' );

	var control_value;
	var control_data_ext = control_storage.data('ext');

	control.toggleClass('dslca-option-off');

	if ( control.hasClass('dslca-option-off')) {
		// Disable

		control_value = dslc_get_control_value(control_id);
		// Temporary backup the current value as data attribute
		control_storage.data( 'val-bckp', control_value );
		// control_value = dslc_combine_value_and_extension( control_value, control_data_ext);

		// Loop through rules (useful when there are multiple rules)
		for ( var i = 0; i < affect_on_change_rules.length; i++ ) {

			// remove css rule in element inline style
			jQuery( affect_on_change_el, LiveComposer.Builder.PreviewAreaDocument ).css( affect_on_change_rules[i] , '' );
			// remove css rule in css block
			disable_css_rule ( affect_on_change_el, affect_on_change_rules[i], module_id);
			// PROBLEM do not work with multiply rules ex.: .dslc-text-module-content,.dslc-text-module-content p
		}

		control_storage.val('').trigger('change');
	} else {
		// Enable

		// Restore value of the data backup attribute
		control_storage.val( control_storage.data('val-bckp') ).trigger('change');
		control_value = dslc_get_control_value(control_id);
		control_value = dslc_combine_value_and_extension( control_value, control_data_ext || '');

		// Loop through rules (useful when there are multiple rules)
		for ( var i = 0; i < affect_on_change_rules.length; i++ ) {

			var styleContent = affect_on_change_el + "{" + affect_on_change_rules[i] + ": " + control_value + "}";

			LiveComposer.Builder.Helpers.processInlineStyleTag({

				context: control,
				rule: affect_on_change_rules[i],
				elems: affect_on_change_el.replace(new RegExp('#' + module_id, 'gi'), '').trim(),
				styleContent: styleContent
			});
		}
	}
}

jQuery(document).ready(function($){

	// Option Control Toggle
	jQuery(document).on( 'click', '.dslca-module-edit-option .dslc-control-toggle', function(e){

		e.preventDefault();
		var control_id = jQuery(e.target).closest('.dslca-module-edit-option').find('.dslca-module-edit-field').data('id');
		dslc_toogle_control ( control_id );
	});


	// Disable Toggle If the Control Focused
	jQuery(document).on( 'mousedown', '.dslca-module-edit-option', function(e){

		var toggle = jQuery('.dslc-control-toggle');
		if ( ! toggle.is(e.target) // if the target of the click isn't the container...
		     && toggle.has(e.target).length === 0 ) // ... nor a descendant of the container
		{

			if ( jQuery(e.target).closest('.dslca-module-edit-option').hasClass('dslca-option-off') ) {

				var control_id = jQuery(e.target).closest('.dslca-module-edit-option').find('.dslca-module-edit-field').data('id');
				dslc_toogle_control (control_id);
			}
		}
	});
});

function disable_css_rule(selectorCSS, ruleCSS, moduleID) {

	var cssRules;
	var target_stylsheet_ID = 'css-for-' + moduleID;
	var stylesheet = document.getElementById('page-builder-frame').contentWindow.document.getElementById(target_stylsheet_ID);

	selectorCSS = selectorCSS.replace( /\s\s+/g, ' ' );

	if (stylesheet) {

	   stylesheet = stylesheet.sheet;

		if (stylesheet['rules']) {

			cssRules = 'rules';
		} else if (stylesheet['cssRules']) {

			cssRules = 'cssRules';
		} else {

			//no rules found... browser unknown
		}

		// Go through each CSS rule (ex.: .content h1 {...})
		for (var R = 0; R < stylesheet[cssRules].length; R++) {

			// Is current CSS rule equal to the selectorCSS we are looking for?
			// (ex.: '.content h1' == '.content h1' )
			if (stylesheet[cssRules][R].selectorText == selectorCSS) {

				// Get CSS property we are looking for... (ex.: font-size : ...; )
				if(stylesheet[cssRules][R].style[ruleCSS]){

						stylesheet[cssRules][R].style[ruleCSS] = '';
					break;
				}
			}
		}
	}
}

function dslc_combine_value_and_extension ( value, extension) {
	if ( '' === value || null === value ) {
		return value;
	}

	// Check if value do not already include extension
	if ( value.indexOf(extension) == -1 ) {
		value = value + extension;
	}

	return value;
}

function dslc_get_control_value ( control_id ) {

	var control      = jQuery('.dslca-module-edit-option-' + control_id );
	var control_type = 'text';
	var control_storage = control.find('.dslca-module-edit-field');
	var value;

/*
	if ( control.hasClass('dslca-module-edit-option-select') ) {

	} else {
		// text based controls
		value = control_storage.val();
	}
*/
	value = control_storage.val();

	return value;
}

/**
 * Bind keypress events with both parent and iframe pages.
 * Function called when content inside iframe is loaded.
 *
 * @return {void}
 */
export const keypressEvents = () => {

	jQuery( [document, LiveComposer.Builder.PreviewAreaWindow.document ] ).unbind('keydown').bind('keydown', function (keydown_event) {
		// Modal window [ESC]/[Enter]
		window.dslc_modal_keypress_events( keydown_event );

		// Prevent backspace from navigating back
		dslc_disable_backspace_navigation( keydown_event );

		// Prompt Modal on F5
		dslc_notice_on_refresh( keydown_event );

		// Save Page
		dslc_save_page( keydown_event );

		// CMD button press event.
		dslc_cmd_press( keydown_event );

		// Events to run when any button preset.
		dslc_keydown( keydown_event );
	});

	// Key UP events.
	jQuery( [document, LiveComposer.Builder.PreviewAreaWindow.document ] ).unbind('keyup').bind('keyup', function (keyup_event) {
		dslc_cmd_unpress( keyup_event );
	});
}

/**
 * Action - Prevent backspace from navigating back
 */

function dslc_disable_backspace_navigation (event) {

	var doPrevent = false;

	if (event.keyCode === 8) {

		var d = event.srcElement || event.target;

		if ( (d.tagName.toUpperCase() === 'INPUT' && (
				d.type.toUpperCase() === 'TEXT' ||
				d.type.toUpperCase() === 'PASSWORD' ||
				d.type.toUpperCase() === 'NUMBER' ||
				d.type.toUpperCase() === 'FILE')
			  )
			 || d.tagName.toUpperCase() === 'TEXTAREA'
			 || jQuery(d).hasClass('dslca-editable-content')
			 || jQuery(d).hasClass('dslc-tabs-nav-hook-title')
			 || jQuery(d).hasClass('dslc-accordion-title') ) {

			doPrevent = d.readOnly || d.disabled;
		} else {

			doPrevent = true;
		}
	}

	if (doPrevent) {
		event.preventDefault();
	}
}

/**
 * Actions - Prompt Modal on F5
 *
 * 116 – F5
 * 81 + event.metaKey = CMD + R
 */

function dslc_notice_on_refresh(e) {

	if ( e.which == 116 || ( e.which === 82 && e.metaKey ) ) {

		if ( jQuery('.dslca-save-composer-hook').offsetParent !== null || jQuery('.dslca-module-edit-save').offsetParent !== null ) {

			e.preventDefault();
			CModalWindow({

				title: DSLCString.str_refresh_title,
				content: DSLCString.str_refresh_descr,
				confirm: function() {

					window.location.reload();
				}
			});

			/*dslc_js_confirm( 'disable_lc', '<span class="dslca-prompt-modal-title">' + DSLCString.str_refresh_title +
			 '</span><span class="dslca-prompt-modal-descr">' + DSLCString.str_refresh_descr + '</span>', document.URL );*/
		}
	}
}

/**
 * If Control or Command key is pressed and the S key is pressed run dslc_save_composer.
 * 83 is the key code for S.
 */
function dslc_save_page(e) {

    if ( e.which == 83 && ( e.metaKey || e.ctrlKey )  ) {
    	if ( jQuery('.dslca-save-composer-hook').css('display') == 'block' ) {
	        dslc_save_composer();
	        e.preventDefault();
	        return false;
	    }
    }
}


/**
 * If any key is pressed.
 */
function dslc_keydown( e ) {
    if ( LiveComposer.Builder.UI.cmdMode ) {
		if ( ! e.metaKey && ! e.ctrlKey ) {
		LiveComposer.Builder.UI.cmdMode = false;
		LiveComposer.Builder.PreviewAreaWindow.document.querySelector('body').classList.remove( 'key-press-cmd' );
		}
    }
}

/**
 * If Command key is pressed.
 */
function dslc_cmd_press( e ) {
    if ( e.metaKey || e.ctrlKey ) {
		LiveComposer.Builder.UI.cmdMode = true;
		LiveComposer.Builder.PreviewAreaWindow.document.querySelector('body').classList.add( 'key-press-cmd' );
    }
}

/**
 * If Command key is released.
 */
function dslc_cmd_unpress( e ) {
    if ( e.key === "Meta" ) {
		LiveComposer.Builder.UI.cmdMode = false;
		LiveComposer.Builder.PreviewAreaWindow.document.querySelector('body').classList.remove( 'key-press-cmd' );
    }
}

/**
 * Generate report about JS error and save it in a local storage.
 * @param  String error Error text
 * @param  String file  File with error
 * @param  String line  Line with error
 * @param  String char  Column with error
 * @return void
 */
function dslca_generate_error_report ( error, file, line, char ) {

	var title = 'JavaScript error detected in a third-party plugin';

	if ( file.match("wp-content\/plugins\/live-composer-page-builder\/js") != null ) {

		title = 'Live Composer returned JS error';
	}

	var error_report = '';
	error_report += '<br /><strong style="color:#E55F5F;">' + title + '</strong><br />';
	error_report += error + '<br /> File "' + file + '", line ' + line + ', char ' + char + '<br />';

	if ( 'undefined' !== typeof(Storage)) {
		localStorage.setItem('js_errors_report', error_report);
	}
}

/**
 * Put in a hidden div#dslca-js-errors-report information from local storage
 * @return void
 */
function dslca_update_report_log() {

	var errors_container = document.getElementById('dslca-js-errors-report');
	var error_report = localStorage.getItem('js_errors_report');

	if ( null !== error_report ) {
		if ( error_report.includes('lc-extensions') || error_report.includes('page-builder') ) {
			errors_container.value = error_report;
			localStorage.removeItem('js_errors_report');
			document.querySelector( '.dslca-show-js-error-hook' ).setAttribute('style','visibility:visible');
		}
	}
}


// ============================================================
jQuery(document).on('editorFrameLoaded', function(){

	var $ = jQuery;
	var headerFooter = jQuery('div[data-hf]', LiveComposer.Builder.PreviewAreaDocument);
	var overlay = '';

	headerFooter.each(function(index, el) {
		var linkToEdit = jQuery(el).data('editing-link');
		var hfType = jQuery(el).data('editing-type');
		var editingLabel = jQuery(el).data('editing-label');
		var editingSubLabel = jQuery(el).data('editing-sublabel');

		overlay += '<div class="dslc-hf-block-overlay"><a target="_blank" href="' + linkToEdit + '" class="dslc-hf-block-overlay-button dslca-link">' + editingLabel + '</a>';
		if ( editingSubLabel !== undefined ) {
			overlay += ' <span class="dslc-hf-block-overlay-text">' + editingSubLabel + '</span>';
		}
		overlay += '</div>';

		var htmlObject = document.createElement('div');
		htmlObject.innerHTML = overlay;

		el.append( htmlObject );
	});

});
