// ==UserScript==
// @name         STM Sort by match count DESC
// @namespace    *://www.loigistal.at/
// @version      0.2.2
// @description  Adds a sort by match count DESC button to STM's navigation on compare page
// @author       Barokai | www.loigistal.at
// @homepage     https://github.com/Barokai/userscripts/
// @updateURL    https://github.com/Barokai/userscripts/raw/master/stm_sort_by_match_count_desc.user.js
// @match        http://www.steamtradematcher.com/compare
// @icon         http://www.steamtradematcher.com/res/img/favicon.jpg
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
  
    // TODO:
    // automatically start sort when progress is 100%
    // include options in STM's settings page
  
    function startSort(){
      var matchBoxes = $("div.panel.match-box");
      $.each(matchBoxes, function( index, box ) {
        var matchCount = $(".matches", box).length;
        $(box).attr("data-sort", matchCount);
      });
  
      matchBoxes.detach();
  
      // for sorting asc, swap < and >
      matchBoxes.sort(function (a, b) {
        var contentA =parseInt( $(a).attr('data-sort'));
        var contentB =parseInt( $(b).attr('data-sort'));
        // descending version
        return (contentA > contentB) ? -1 : (contentA < contentB) ? 1 : 0;
  
        // ascending version
        // return (contentA < contentB) ? -1 : (contentA > contentB) ? 1 : 0;
      });
  
      $("#match-results").append(matchBoxes);
    }
  
    $(".nav.navbar-nav").first().append("<li><a href='#' id='sort' title='sort results by match count descending'><span class='glyphicon glyphicon-sort-by-attributes-alt'></span></a></li>");
    $( "#sort" ).click(function(e) {
      e.preventDefault();
      startSort();
    });
  })();