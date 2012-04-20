<?php
require("includes/init.php");
//Lets first get some genres...
$genres = getGenres();
//Lovely, now lets get some tracks and do some pagination..
$perpage = 40;
$page = 1;
//Check if user wants a different page..
if(!empty($_GET['page'])) {
	//Lets check if they gave us a valid page number...
	$tmppage = Sanitize::int($_GET['page']);
	if($tmppage > 0)
		$page = $tmppage;
}
$startrecord = ($page - 1) * $perpage;
$trackdata = getTracks($startrecord,$perpage);
$tracks = $trackdata[0];
if(empty($tracks)) {
	//We've hit the end of the line... (we'll display a nice error message below)
	header($_SERVER["SERVER_PROTOCOL"]." 404 Not Found");
	header("Status: 404 Not Found");
	$nextpage = -1;
}
else {
	$nextpage = $page + 1;
}
?>
<!doctype html>

<head>
	<meta charset='utf-8'> 
    <meta http-equiv="Cache-control" content="public">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    
    <title>Audible Coffee</title>
    
    <meta property="og:title" content="Audible Coffee" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="http://www.audiblecoffee.com/" />
	<meta property="og:image" content="http://www.audiblecoffee.com/img/logo1.jpg" />
	<meta property="fb:admins" content="184905639" />

	
	<link rel="image_src" href="http://www.audiblecoffee.com/img/logo1.jpg"/>
	<link rel="icon" href="/img/Large_Mug.ico" type="image/x-icon"> 
    <link rel="shortcut icon" href="/img/Large_Mug.ico" type="image/x-icon">
    
    <link rel="stylesheet" type="text/css" href="/css/layout.css"/>
    <link href='http://fonts.googleapis.com/css?family=Quattrocento+Sans' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" type="text/css" href="/css/miniplayertest.css"/>
 	<link rel="stylesheet" type="text/css" href="/css/puzzle.css"/>
 
 	<style type="text/css">
  .square h1 { color: #a3a8a4; }
  .square.hover h1 { color: #f710ef; }
  .square.playing h1 { color: #f710ef; }
  
  .square h2 { color: #a3a8a4; }
  .square.hover h2 { color: white; }
  .square.playing h2 { color: white; }
  
  .square .smallname { color: #a3a8a4; }
  .square.hover .smallname { color: #f710ef; }
  .square.playing .smallname { color: #f710ef; }
  
  .square .smalltitle { color: #a3a8a4; }
  .square.hover .smalltitle { color: white; }
  .square.playing .smalltitle { color: white; }
  
  .square.hover .img1 { opacity: 0.5; }
  .square.hover .background { opacity: 0.9; }
  .square.playing .img1 { opacity: 0.5; }
  .square.playing .background { opacity: 0.9; }

  .square .box { height: 50px; opacity: 0.7; }
  .square.hover .box { height: 160px; opacity: 0.8; }
  .square.playing .box { height: 160px; opacity: 0.8; }
  
  .square .close,
  .square .boxtop 
  .square.social{ display: none; }
  .square.hover .close,
  .square.hover .boxtop, 
  .square.hover .social { display: block; }
  .square.playing .close,
  .square.playing .boxtop, 
  .square.playing .social { display: block; }
</style>

<style type="text/css">
.facebook{position: relative;
		  top:0px;
		  left:0px;
		  z-index:1;
		  height:29px;
		  width:29px;
		  opacity: .8;
		  border-radius: 15px;}
		  
.twitter{position: relative;
 		 top:-29px;
 		 left:55px;
 		 z-index: 3;
 		 height:29px;
		 width:29px;
		 opacity: .8;
		 border-radius: 15px;}
 		 
.email{position: relative;
 		 top:-58px;
 		 left:110px;
 		 z-index: 3;
 		 height:29px;
		 width:29px;
		 opacity: .8;
		 border-radius: 15px;}
		 
.googleplus{position: relative;
 		 top:-87px;
 		 left:165px;
 		 z-index: 3;
 		 height:29px;
		 width:29px;
		 opacity: .8;
		 border-radius: 15px;}
		 
.social{position: absolute;
		top:66px;
		right:81px;
		display: none;
		width:151px;}
		
.fab_button{background: url(/img/socialbuttons2.png)0 -416px;
		   height:50px;
		   width:50px;
		   opacity: .9;
		   }
		   
		
.fab_button:hover{background: url(/img/socialbuttons2.png)1px -465px;
		   height:50px;
		   width:50px;
		   opacity: .9;
		   }
		   
		
.twi_button{background: url(/img/socialbuttons2.png)0 -514px;
		   height:50px;
		   width:50px;
		   opacity: .9;
		   }
		   
		
.twi_button:hover{background: url(/img/socialbuttons2.png)0 -564px;
		   height:50px;
		   width:50px;
		   opacity: .9;
		   }
		   
		 
.email_button{background: url(/img/socialbuttons2.png)0 -618px;
		   height:50px;
		   width:50px;
		   opacity: .9;
		   }
		   
		
.email_button:hover{background: url(/img/socialbuttons2.png)0 -672px;
		   height:50px;
		   width:50px;
		   opacity: .9;
		   }
		   
		   
</style>
</head>  

<body>
<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=255228347849970";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>

<script type="text/javascript">
  (function() {
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/plusone.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
  })();
</script>

<div id="sharetabs">
			
				<div class="twittab">
					<div class="twitcon"></div>
					<div class="twitterbutton"><a href="https://twitter.com/audiblecoffee" class="twitter-follow-button" data-show-count="false">Follow</a>
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
					</div>
				</div>
				
				<div id="googfaceblack">
					<div class="gogplustab">
						<div class="googlecon"></div>
						<div class="gicon">
							<div class="g-plusone" data-size="tall" data-annotation="inline" data-width="100"  data-href="http://www.audiblecoffee.com"></div>
						</div>
					</div>
						
					<div id="faceblack">
						<div class="fbooktab">
							<div class="fbookcon"></div>
							<div class="fb-like" data-href="http://www.facebook.com/audiblecoffee" data-send="false" data-layout="button_count" data-width="60" data-show-faces="false" data-font="arial">
							</div>
						</div>
							
					<div id="black">
						<div class="black"></div>
					</div>
					</div>
					</div>

</div>

<a href="http://www.audiblecoffee.com/about/" target="_blank" id="about">About</a>
<a href="http://www.audiblecoffee.com/faq/" target="_blank" id="faq">FAQ</a>

<div id="globalcontrols">
<div id="globalforward"></div>
<div id="globalback"></div>
<div id="globalplaypause">
<div id="globalplay"></div>
<div id="globalpause"></div>
</div>
</div>
<div id="shufflebuttons">
<img src="../img/shufflegrey.png" id="shuffle" class="shuffles"/>
<img src="../img/shuffle.png" id="original-order" class="shuffles"/>
<span class="onshuffle">On</span>
<span class="offshuffle">Off</span>
</div>

<div id="filters">
<a href="http://www.audiblecoffee.com/genre/" target="_blank" id="roast"><div id="roastbutton"><h5>What's Your Roast?</h5></div></a>
<div id="toggle"><img src="../img/newmug.png" id="gear"/></div>

<ul>
	<?php
	if(!empty($genres)) {
		$genredb = array();
		foreach($genres as $value) {
			echo "<li><input type='checkbox' value='.{$value['ClassName']}' name='genre' id='{$value['ClassName']}' checked='checked' />
		<label for='{$value['ClassName']}'>{$value['Name']}</label></li>";
			//We're also going to be clever here and generate a new array that will be used for lookups in the track loop
			$genredb[$value['ID']] = $value;
		}
	}
	?>
</ul>


</div>

<div id="thegoods">
<img src="../img/AC_LOGO-Rasterized.png" id="logo" />

<div class="container">
<?php
	if(!empty($tracks)) {
		foreach($tracks as $value) {
			if(isset($genredb[$value['GenreID']]))
				$trackgenre = $genredb[$value['GenreID']];
			else
				$trackgenre = array(1,"Track","track",0);
			$trackdate = array(date('M',$value['Date']),date('d',$value['Date']));
			echo "<div class='square {$trackgenre['ClassName']}'>
    <!-- DJ Picture -->
    <img src='/pictures/{$value['ArtistImage']}' class='img1' />
    		<div class='boxtop'>
    	    <span class='genre'>{$trackgenre['Name']}</span>
    	    </div>
    	    <div class='social'>
				<div class='facebook'>
					<a href='http://www.facebook.com/sharer.php?s=100&amp;p[url]=http://www.audiblecoffee.com/singles/m{$value['ID']}&amp;p[images][0]=http://www.audiblecoffee.com/img/logo1.jpg&amp;p[title]={$value['SharingTitle']}&amp;p[summary]=Revolutionizing the way you discover and listen to electronic dance music.' target='_blank'>
					<div class='fab_button'></div>
					</a>
				</div>
			
				
				<div class='twitter'>
					<a href='http://twitter.com/home/?status=@AudibleCoffee Revolutionizing the way you discover and listen to electronic dance music. www.audiblecoffee.com/singles/m{$value['ID']}' 
					target='_blank'><div class='twi_button'></div></a>
				</div>
				
				<div class='email'>
					<a href='mailto:?subject=Check out Audible Coffee&amp;body=www.audiblecoffee.com/singles/m{$value['ID']}'><div class='email_button'></div></a>
				</div>
				
			</div>
    		<div class='box'>
    		<a class='close' href='#close'>&times;</a>		
    		<div class='datespace'><span class='date'>{$trackdate[0]}<br/>{$trackdate[1]}</span></div>
    		<!-- DJ Name -->
    		<h1>{$value['Artist']}</h1>
    		<!-- Song Title -->
    		<h2>{$value['Title']}</h2>
    		 <!--Song Description(179 characters with spaces)-->
    		<h4>{$value['Description']}</h4> 
    		    <div class='buttons'>
    		    <!--Song file info-->
    			<div class='player'>
				<a id='m{$value['ID']}' class=\"audio {skin:'#010101',showVolumeLevel:false,showTime:true,showRew:false,ogg:'/mp3/{$value['OGGFile']}'}\" href='/mp3/{$value['MP3File']}'></a></div>
				</div>
			</div>
	</div>";
		}
	}
	?>

</div> <!--Container-->

</div> <!--thegoods-->

<nav id="page_nav">
<?php if($nextpage > 0) echo "<a href='page$nextpage.html'></a>";?>
</nav>

<!-- jQuery -->
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
	<script src="../inc/jquery.232fd31.min.js"></script>
	<script src="../inc/debug.js"></script>
	<script src="../inc/jquery.scrollTo-min.js"></script>
	
<script type="text/javascript">

var infloadmore = false;

//delay
		jQuery(document).ready(function(){
		delayShow();
		});
		
		function delayShow() {
		var secs = 2000;
		setTimeout('jQuery("body").css("visibility","visible");', secs);
		}
		
//checkbox 
		$("input[name=genre]").attr("checked","checked");
		$("input[name='genre']").imageTick({
		custom_button: function($label) {
		$label.hide();
		return '<div class="my-custom-button">' + $label.text() + '</div>';
		}
		});
		
		var switched = false;
		function revealToggle(e){
		if (!switched) {
		$("input[type='checkbox'],input[type='radio']").css('display', 'inline');
		$(e).val('Hide the REAL checkboxes/radios');
		switched = true;
		} else {
		$("input[type='checkbox'],input[type='radio']").css('display', 'none');
		$(e).val('Show me the REAL checkboxes/radios');
		switched = false;
		}
		//if($('.isotope-item:not(.isotope-hidden)').length < 2)
		//{
		//$('.container').infinitescroll('retrieve')
		//}
		};
//dave
		var $container = $('.container'),
		$checkboxes = $('#filters input');
		
		$container.isotope({
		itemSelector: '.square'
		});
		
		$checkboxes.change(function(){
		var filters = [];
		// get checked checkboxes values
		$checkboxes.filter(':checked').each(function(){
		filters.push( this.value );
		});
		// ['.red', '.blue'] -> '.red, .blue'
		filters = filters.join(', ') || 'none';
		$container.isotope({ filter: filters });
		//Now check if we have enough..
		setTimeout(function() {
			if($('.isotope-item:not(.isotope-hidden)').length < 4 && !$('.container').data('infinitescroll').options.state.isDone && !infloadmore)
				{
				infloadmore = setInterval(function() { 
					if($('.isotope-item:not(.isotope-hidden)').length < 4 && !$('.container').data('infinitescroll').options.state.isDone)
						{
						$('.container').infinitescroll('retrieve');
						}
					else
						{
						clearInterval(infloadmore);
						infloadmore = false;
						}
					}, 500);
				}
			}, 250)
		});
		
		$('#shufflebuttons').toggle( 
		function() {
		$container.isotope('shuffle');
		}, 
		function() {
		$container.isotope({ sortBy: 'original-order' });
		});

		
		var $items = $container.children();
		
		// close square when close is clicked
		function closeSquare( event ) {
		var $this = $(this)
		if ( $(event.target).is('a.close') ) {
		// remove this item
		$(event.target).siblings('.buttons').find('.audio').mb_miniPlayer_stop();
		$container.isotope( 'remove', $this ).isotope('reLayout');
		return false;
		} else {
		// select next item
		var idx = $this.index();
		var $filteredAtoms = $container.data('isotope').$filteredAtoms,
		isoIndex = $filteredAtoms.index( this ),
		nextIndex = ( isoIndex + 1 ) % $filteredAtoms.length;
		
		$items.filter('.next').removeClass('next');
		$filteredAtoms.eq( nextIndex ).addClass('next');
		}
		}
		
		function bindSquareEvents( $items ) {
		var $squares = $items.filter('.square');
		// simple hover events
		$squares.hover( function() {
		$(this).addClass('hover')
		}, function() {
		$(this).removeClass('hover')
		});
		$squares.click( closeSquare );
		}
		
		// initial bind
		bindSquareEvents( $('.square') );
//audio
   		$(".audio").mb_miniPlayer({
		width:210,
		height:34,
		inLine:false,
		onEnd:playNext,
		onPlay:playHover
		});
		
		
		var $audios = $('.audio');
		
		function playHover(idx,sitem){
		$('.square').removeClass("playing");
		boxel = $(sitem).parents(".box");
		document.title = boxel.children("h1").text()+' - '+boxel.children("h2").text();
		$(sitem).parents(".square").addClass("playing")	
		$('#globalplay').css('display','none');
		$('#globalpause').css('display','block');
        $('#globalcontrols,#shufflebuttons').fadeIn('slow', function() {})
        };
	
		function playNext(idx,sitem) {
		var $isoItem = $(sitem).parents(".square"),
		$filteredAtoms = $container.data('isotope').$filteredAtoms,
		isoIndex = $filteredAtoms.index(  $isoItem  ),
		
		nextIndex = ( isoIndex + 1 ) % $filteredAtoms.length;
		next = $filteredAtoms.eq( nextIndex ).find('.audio');
		$("#"+"MP_"+next.attr("id")).jPlayer("stop"); 
		next.mb_miniPlayer_play();
		$.scrollTo( $filteredAtoms.eq( nextIndex ), 800, {over:-0.5} );
		
		};

//IF
		var $container = $('.container');
		
		$container.isotope({
		itemSelector : '.square'
		});
		$container.infinitescroll({
		navSelector  : '#page_nav',    // selector for the paged navigation 
		nextSelector : '#page_nav a',  // selector for the NEXT link (to page 2)
		itemSelector : '.square',     // selector for all items you'll retrieve
		animate : false
		},function( newElements ) {
		var $newElements = $(newElements);
		
		$newElements.find(".audio").mb_miniPlayer({
		width:210,
		height:34,
		inLine:false,
		onEnd:playNext,
		onPlay:playHover
		});
		
		// add hover events for new items
		bindSquareEvents( $newElements );
		setTimeout(function() {
		$container.isotope('insert', $newElements );
		}, 1000);
		});
//genre
		$('#toggle').toggle( 
		function() {
		$('#filters').animate({ left: 4 }, 'slow', function() {
		});
		}, 
		function() {
		$('#filters').animate({ left: -259 }, 'slow', function() {
		});
		});
		
//shuffle
		$('#shufflebuttons').toggle( 
		function() {
		$('#original-order, .onshuffle').css('display','block');
		$('#shuffle, .offshuffle').css('display','none');
		}, 
		function() {
		$('#original-order, .onshuffle').css('display','none');
		$('#shuffle, .offshuffle').css('display','block');
		});
		
//global previous
		
		function playPrevious(idx,sitem) {
		ID = $('.playing').find('.audio').attr("id");
		var $isoItem = $(sitem).parents(".square"),
		$filteredAtoms = $container.data('isotope').$filteredAtoms,
		isoIndex = $filteredAtoms.index(  $isoItem  ),
		
		nextIndex = ( isoIndex - 1 ) % $filteredAtoms.length;
		$("#"+"MP_"+ID).jPlayer("stop"); 
		next = $filteredAtoms.eq( nextIndex ).find('.audio');
		$("#"+"MP_"+next.attr("id")).jPlayer("stop"); 
		next.mb_miniPlayer_play();
		$.scrollTo( $filteredAtoms.eq( nextIndex ), 800, {over:-0.5} );
		};
		
//global down
		
		function playDown(idx,sitem) {
		ID = $('.playing').find('.audio').attr("id");
		var $isoItem = $(sitem).parents(".square"),
		$filteredAtoms = $container.data('isotope').$filteredAtoms,
		isoIndex = $filteredAtoms.index(  $isoItem  ),
		
		nextIndex = ( isoIndex + 4 ) % $filteredAtoms.length;
		$("#"+"MP_"+ID).jPlayer("stop"); 
		next = $filteredAtoms.eq( nextIndex ).find('.audio');
		$("#"+"MP_"+next.attr("id")).jPlayer("stop"); 
		next.mb_miniPlayer_play();
		$.scrollTo( $filteredAtoms.eq( nextIndex ), 800, {over:-0.5} );
		};

//global up
		
		function playUp(idx,sitem) {
		ID = $('.playing').find('.audio').attr("id");
		var $isoItem = $(sitem).parents(".square"),
		$filteredAtoms = $container.data('isotope').$filteredAtoms,
		isoIndex = $filteredAtoms.index(  $isoItem  ),
		
		nextIndex = ( isoIndex - 4 ) % $filteredAtoms.length;
		$("#"+"MP_"+ID).jPlayer("stop"); 
		next = $filteredAtoms.eq( nextIndex ).find('.audio');
		$("#"+"MP_"+next.attr("id")).jPlayer("stop"); 
		next.mb_miniPlayer_play();
		$.scrollTo( $filteredAtoms.eq( nextIndex ), 800, {over:-0.5} );
		};

		
		
//global back
		$('#globalback').click(function() { playPrevious(0,$('.playing .box')); });
	
//global forward		
		$('#globalforward').click(function() { 
		ID = $('.playing').find('.audio').attr("id");
		$("#"+"MP_"+ID).jPlayer("stop");
		playNext(0,$('.playing .box'));
		});


//global play/pause (button toggle)		
		$('#globalplaypause').toggle( 
		function() {
		$('#globalplay').css('display','none');
		$('#globalpause').css('display','block');
		$('.playing').find('.play').click();
		}, 
		function() {
		$('#globalplay').css('display','block');
		$('#globalpause').css('display','none');
		$('.playing').find('.play').click();
		});
	
//global play/pause (button toggle)		
		$('.play').toggle( 
		function() {
		$('#globalplay').css('display','none');
		$('#globalpause').css('display','block');
		}, 
		function() {
		$('#globalplay').css('display','block');
		$('#globalpause').css('display','none');
		});

//Whats your roast color change		
		$("#roastbutton").hover(function(){
		$("#filters h5").css('color', '#f710ef');
		}, function(){
		$("#filters h5").css('color', 'white');
		});
		
//global arrow back
		$(document).keydown(function(e){
		if (e.keyCode == 37) { 
		playPrevious(0,$('.playing .box'));
		return false;
		}
		});
//global arrow forward		
		$(document).keydown(function(e){
		if (e.keyCode == 39) { 
		ID = $('.playing').find('.audio').attr("id");
		$("#"+"MP_"+ID).jPlayer("stop");
		playNext(0,$('.playing .box'));
		return false;
		}
		});
		
//global spacebar play/pause
		$(document).keydown(function(e){
		if (e.keyCode == 32) { 
		$('.playing').find('.play').click();
		return false;
		}
		});
		
//global arrow down
		$(document).keydown(function(e){
		if (e.keyCode == 40) { 
		playDown(0,$('.playing .box'));
		return false;
		}
		});
		
//global arrow up
		$(document).keydown(function(e){
		if (e.keyCode == 38) { 
		playUp(0,$('.playing .box'));
		return false;
		}
		});
				
//social Toggle

$(".twittab").mouseenter(showNav).mouseleave(hideNav);

function showNav(){  
    $('#googfaceblack').stop().animate({ left: 174 }, 'slow')};
function hideNav(){  
    $('#googfaceblack').stop().animate({ left: 27 }, 'slow')};
		
		
		$('.gogplustab').hover( 
		function() {
		$('#faceblack').stop().animate({ left: 174 }, 'slow', function() {
		});
		}, 
		function() {
		$('#faceblack').stop().animate({ left: 32 }, 'slow', function() {
		});
		});
		
		$('.fbooktab').hover( 
		function() {
		$('#black').stop().animate({ left: 173 }, 'slow', function() {
		});
		}, 
		function() {
		$('#black').stop().animate({ left: 30 }, 'slow', function() {
		});
		});


</script>        

<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-27304177-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>

  
	
</body>
</html>

