jQuery(document).ready(function($){
	var transitionEnd = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';
	var transitionsSupported = ( $('.csstransitions').length > 0 );
	if( !transitionsSupported ) transitionEnd = 'noTransition';
	
  var films;

	initEvents = function() {
		var self = this;
    
    html = ''
    $.each( films, function(index, film) {
      html += "<div class='film'>"
      
      html += "<em class='film-name'>"
      html += film.title
      html += "<span class='film-time'>" + film.details + '</span>'
      html += "</em>"
      html += "<div class='film-description'>"
      html += film.description
      html += "</div>"
    
      if(film.url ) {
        html += "<div class='film-link'>"
        html += '<a href="' + film.url + '">' + film.url + '</a>'
        html += "</div>"
      }
      
      if( film.video && film.video.includes('vimeo') ) {
        id = film.video.match("vimeo.com\/(\\d*)")[1]
        html += "<div class='film-video'>"
        html += '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/' + id + '?title=0&byline=0&portrait=0" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>'
        html += "</div>"
    
      }
    
      html += "</div>"
    })
    $('.films').append(html)
	};

  jQuery.ajax({
    url: 'https://raw.githubusercontent.com/padraicm/festival_tickets/master/data/films.json', 
    success: function( data, status, xhr ) {
      films = JSON.parse(data).films.sort()
      initEvents();
    }
  });
  





});