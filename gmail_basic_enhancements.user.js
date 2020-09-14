// ==UserScript==
// @name           gmail basic enhancements
// @namespace      camelsoft
// @description    Extended labels and toggle all messages
// @include        https://mail.google.com/mail/u/0/h/*
// @icon           https://ssl.gstatic.com/ui/v1/icons/mail/images/favicon5.ico
// @downloadURL    https://github.com/acavalin/gmail_basic_enhancements/raw/master/gmail_basic_enhancements.user.js
// @require        https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js
// @version        1.0.0
// @grant          none
// ==/UserScript==

jQuery.noConflict();

(function ($) { $(function () {
// -----------------------------------------------------------------------------

function shorten_combobox_options () {
  var cur_path = $('body').data('cbb_cur_path')||'';
  var cur_lvl  = $('body').data('cbb_cur_lvl' )||0;

  var path = $(this).val().substring(3);
  var path_parent  = path.substr(0, path.lastIndexOf("/"));
  var path_element = path.substring(parseInt(path.lastIndexOf("/"))+1);

  if (cur_path != path_parent) {
    cur_path = path_parent;
    cur_lvl  = (path_parent.match(/\//g) || []).length;
    $('body').data('cbb_cur_path', path_parent);
    $('body').data('cbb_cur_lvl' , cur_lvl);
  }//if

  var label = '<tt>';
  if (cur_lvl > 0) {
    label += "&nbsp;&nbsp;".repeat(cur_lvl);
    label += '&#x21B3;&nbsp;';
  }//if
  label += '</tt>'

  $(this).
    attr('title', decodeURIComponent(path)).
    html(label + decodeURIComponent(path_element));
}//shorten_combobox_options

function shorten_sidebar_links () {
  var cur_path = $('body').data('sbl_cur_path')||'';
  var cur_lvl  = $('body').data('sbl_cur_lvl' )||0;

  var path = $(this).attr('href').substring(8);
  var path_parent  = path.substr(0, path.lastIndexOf("/"));
  var path_element = path.substring(parseInt(path.lastIndexOf("/"))+1);

  if (cur_path != path_parent) {
    cur_path = path_parent;
    cur_lvl  = (path_parent.match(/\//g) || []).length;
    $('body').data('sbl_cur_path', path_parent);
    $('body').data('sbl_cur_lvl' , cur_lvl);
  }//if

  var label = '';
  if (cur_lvl > 0) {
    label += '&#x21B3;&nbsp;';
    $(this).css('padding-left', (0.75*cur_lvl)+'rem');
  }//if

  $(this).
    attr('title', decodeURIComponent(path)).
    children().first().html(label + decodeURIComponent(path_element));
}//shorten_sidebar_links

// extend labels on "More actions..." combobox
$('select[name=tact] option[value^=ac_]').each(shorten_combobox_options);
$('select[name=tact] option[value^=rc_]').each(shorten_combobox_options);

// extend labels on the left sidebar
$('td.lb:contains(Labels) a').each(shorten_sidebar_links);

// add toggle all messages checkbox
$('<input type="checkbox" name="toggle_all" title="Toggle all messages">').
  insertBefore('input[name=nvp_a_arch]');
$('input[type=checkbox][name=toggle_all]').click(function () {
  $(this).prop('checked', false);
  $('input[type=checkbox][name=t]').each(function () {
    $(this).prop('checked', !$(this).prop('checked'));
  });
});

// -----------------------------------------------------------------------------
});})(jQuery);
