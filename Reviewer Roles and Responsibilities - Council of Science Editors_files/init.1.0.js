(function($) {

	//console.log( 'jQuery version: ' + jQuery.fn.jquery ); // version
	//console.log( 'jQuery version (aliased): ' $.fn.jquery ); // version, alias confirmation

	// books table filter
	$( '.members-books-filter select' ).change(function(){
		_this_val = $( this ).val();
		_rows = $( '.members-books tr.member-book-item' );
		console.log( _this_val );
		if( _this_val === '' ) {
			_rows.show();
		}
		else {
			_rows.hide();
			$( '.members-books tr.' + _this_val ).show();
		}
	});

	// Archives side nav link text
	if( $( '.letters-archives' ).is(':visible') ) {
		$( '.letters-archives li a' ).append( ' Letters' );
	}

	//disable top-level links (headings) in desktop menu
	$(' .nav-main > ul > .page_item > a' ).click(function() { return false; });


	//mobile menu toggle
	$(' .js-toggleNav ').click(function(e){
		e.preventDefault();
		$(' .container-mobile-drawer' ).toggleClass("isActive");
	});

	// mobile nav
	$( '.nav-secondary > ul > li > a' ).click(function(e){
		e.preventDefault();
		_this = $( this );
		_this.parent().siblings( 'li' ).toggleClass( 'isActive', false );
		_this.parent().siblings().children( 'ul' ).slideUp( 300 );
		_this.parent( 'li' ).toggleClass( 'isActive' );
		_this.siblings( 'ul' ).slideToggle( 300 );
	});

	//mobile drawer height
		$(' .mobile-drawer' ).css('min-height', $(document).height());

	// initialize Twitter post fetcher
	twitterFetcher.fetch({"id": '440553876853227520', "domId": 'twitter-timeline', "maxTweets": 1, "enableLinks": true, "showUser": true, "showTime": true, "dateFunction": dateFormat, "showRetweet": false});

	function dateFormat(d) {
	  var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
	    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
	   return (d.getDate() + ' ' + monthNames[d.getMonth()]);
	};

	// books table sorter
	$( '#tbl_members_books' ).tablesorter({
		headers: {
			2: { sorter: false }, // no sort for third column
		},
		sortList: [ [ 0 , 0 ] ], // initial sort on first column
	});

	// for CSE Policies sidebar page nav
	$( '.nav-policies > ul > .isParent' ).each(function(){
		_this = $( this );
		if( _this.hasClass( 'current_page_ancestor')
			|| _this.hasClass( 'current_page_parent' )
			|| _this.hasClass( 'current_page_item' ) )
		{
			_this.addClass( 'active' );
		}
	});
	$( '.nav-policies > ul > .isParent > a' ).click(function(e){
		e.preventDefault();
		_this = $( this );
		_this.parent( 'li' ).toggleClass( 'active' );
		_this.siblings( 'ul' ).slideToggle( 300 );
	});

	// external links
	$(' a[rel="external"] ').click(function(e){
		e.preventDefault();
		window.open( this.href );
	});

	// image hovers
	$(' img.over ').each(function(){
		// preloader
	    var image = new Image();
	    image.src = this.src.replace(/\.(?=[^.]*$)/, '-o.');
	    //console.log( 'image preload: ' + image.src );
	}).hover(
		function(){
			// use -o on hover
			var obj = this;
			var image = obj.src;
			var lio = image.lastIndexOf( '.' );
			if( lio != -1 ) {
				obj.src = image.substr( 0 , lio ) + '-o' + image.substr( lio );
	    		//console.log( 'image hover: ' + obj.src );
			}
		},
		function(){
			// remove -o on blur
			var obj = this;
			var image = obj.src;
			if( image.indexOf( "-o." ) != -1 ) {
				obj.src = image.replace( "-o." , "." );
	    		//console.log( 'image blur: ' + obj.src );
			}
		}
	);

})(jQuery);