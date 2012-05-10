<?php
require("../includes/init.php");
//Lets first get some genres...
$genres = getGenres();
//Lovely, now lets get some tracks and do some pagination..
$perpage = 20;
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
	
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	
	<link rel="image_src" href="http://www.audiblecoffee.com/img/logo1.jpg"/>
	<link rel="icon" href="/img/Large_Mug.ico" type="image/x-icon"> 
    <link rel="shortcut icon" href="/img/Large_Mug.ico" type="image/x-icon">
    
    <link rel="stylesheet" type="text/css" href="layoutmobile.css"/>
    <link href='http://fonts.googleapis.com/css?family=Quattrocento+Sans' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" type="text/css" href="css/miniplayertest.css"/>

<style type="text/css">

  .square.playing h1 { color: #f710ef; }
  .square.playing h2 { color: #f710ef; }

  .square.playing .img1 { opacity: 0.5; }
  .square.playing .background { opacity: 1; }

  .square.playing .box { opacity: 0.8; }

</style>

<style type="text/css">

		   
</style>
</head>  


<body>

<div id="header">
<h2 class="headername">AUDIBLE COFFEE</h2>
</div>
<div id="headerbutton"></div>
<div id="headphonebutton"></div>


<div id="filters">
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


<div class="thegoods">
<div id="dropdown">
	<div class="dropdownsquare <?php echo $genreinfo['ClassName'];?>">
    <!-- DJ Picture -->
    <img src="/pictures/<?php echo $trackinfo['ArtistImage'];?>"  class="img2" />
    		<div class="boxtop">
    	    <span class="genre"><?php echo $genreinfo['Name'];?></span>
    	    </div>
    	   <div class="dropdownsocial">
				<div class="facebook">
					<a href="http://www.facebook.com/sharer.php?s=100&amp;p[url]=http://www.audiblecoffee.com/singles/m<?php echo $trackinfo['ID'];?>&amp;p[images][0]=http://www.audiblecoffee.com/img/logo.jpg&amp;p[title]=<?php echo $trackinfo['SharingTitle'];?>&amp;p[summary]=Revolutionizing the way you discover and listen to electronic dance music." target="_blank">
					<div class="fab_button"></div>
					</a>
				</div>
			
				
				<div class="twitter">
					<a href="http://twitter.com/home/?status=@AudibleCoffee Revolutionizing the way you discover and listen to electronic dance music. www.audiblecoffee.com/singles/m<?php echo $trackinfo['ID'];?>" 
					target="_blank"><div class="twi_button"></div></a>
				</div>
				
				<div class="email">
					<a href="mailto:?subject=Check out Audible Coffee&amp;body=www.audiblecoffee.com/singles/m<?php echo $trackinfo['ID'];?>"><div class="email_button"></div></a>
				</div>
				
	</div>
    		<div class="dropdownbox">
    		<!-- DJ Name -->
    		<h1 class="dropdownartist"><?php echo $trackinfo['Artist'];?></h1>
    		
    		<!-- Song Title -->
    		<h2 class="dropdowntitle"><?php echo $trackinfo['Title'];?></h2>
    		
    		 <!--Song Description(179 characters with spaces)-->
    		<h4><?php echo $trackinfo['Description'];?></h4> 
			</div>
	</div> 
	
	

</div>
<h1 class="instructions">Tap a song to play</h1>

<div id="audiocontrols">
	
	<div id="repeats">
	<div id="repeatoff"></div>
	<div id="repeaton"></div>
	</div>
	
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
	</div>
</div>

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
    <img src='/mobilepictures/{$value['ArtistImage']}' class='img1' />
    		
    	    <div class='datespace'><span class='date'>{$trackdate[0]}<br/>{$trackdate[1]}</span></div>
    		<div class='box'>	
    		<!-- DJ Name -->
    		<h1>{$value['Artist']}</h1>
    		<!-- Song Title -->
    		<h2>{$value['Title']}</h2>
    		
    		<div class='player'>
				<a id='m{$value['ID']}' class=\"audio {skin:'#010101',showVolumeLevel:false,showTime:true,showRew:false}\" href='/mp3/{$value['MP3File']}'></a>
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
	<script src="../mobileinc/jquery.232fd31.min.js"></script>
	<script src="../mobileinc/debug.js"></script>
	
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
//Filter slider button
		$('#headerbutton').toggle( 
		function() {
		$('.thegoods').animate({ left: 312 }, 'fast');
		$('#filters').animate({ left: 0 }, 'fast').css('display' , 'block');
		}, 
		function() {
		$('.thegoods').animate({ left: 0 }, 'fast');
		$('#filters').animate({ left: -312 }, 'fast').css('display' , 'none');		
		});
		
//shuffle button
		$('#shufflebuttons').toggle( 
		function() {
		$('#original-order, .onshuffle').css('display','block');
		$('#shuffle, .offshuffle').css('display','none');
		}, 
		function() {
		$('#original-order, .onshuffle').css('display','none');
		$('#shuffle, .offshuffle').css('display','block');
		});
		
//Repeat button
		$('#repeats').toggle( 
		function() {
		$('#repeatoff').css('display','none');
		$('#repeaton').css('display','block');
		}, 
		function() {
		$('#repeatoff').css('display','block');
		$('#repeaton').css('display','none');
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

	
//global back button
		$('#globalback').click(function() { playPrevious(0,$('.playing .box')); });
	
//global forward button		
		$('#globalforward').click(function() { 
		ID = $('.playing').find('.audio').attr("id");
		$("#"+"MP_"+ID).jPlayer("stop");
		playNext(0,$('.playing .box'));
		});


//global play/pause (button toggle)		
		$('#globalplaypause').toggle( 
		function() {
		$('#globalplay').css('display','block');
		$('#globalpause').css('display','none');
		$('.playing').find('.play').click();
		}, 
		function() {
		$('#globalplay').css('display','none');
		$('#globalpause').css('display','block');
		$('.playing').find('.play').click();
		});

//Tap on square to view controls
$(".square").click(function(){
		$("#audiocontrols").fadeIn("slow");		
		$(".square").find(this).css('color', '#f710ef');
		$('#headphonebutton').css('display' , 'block');
		});

		$('#sharelink').toggle(function() {
		$(".social").css('display', 'block');
		}, 
		function() {
		$(".social").css('display', 'none');
		});
		
//Dropdown Toggle
		$('#headphonebutton').toggle(function() {
		$('#dropdown').css('display' , 'block'); 
		$('#dropdown').animate({ top: -10 }, 'fast'
		);
		}, 
		function() {
		$('#dropdown').animate({ top: -410 }, 'fast');
		$('#dropdown').css('display' , 'none');
		});	
		
		
</script>        

  
	
</body>
</html>

