<?php 
include("../includes/init.php");
if(!checkAdminLogin()) {
	header("Location: index.php");
	die();
}
if(isset($_GET['success'])&&isset($_GET['type'])&&$_GET['type']=='add')
	$message = 'Track Successfuly Added.';

if(isset($_POST['deletesong'])&&!empty($_POST['song_id'])) {
	$songid = Sanitize::int($_POST['song_id']);
	if(deleteTrack($songid))
		$message = "Song Successfully Deleted.";
	else
		$error = "Could Not Delete Song.";
}
?>
<!doctype html>

<head>
	<meta charset='utf-8'> 
    <meta http-equiv="Cache-control" content="public">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
     <title>Audible Coffee</title>
    
	<link rel="icon" href="../../img/Large_Mug.ico" type="image/x-icon"> 
    <link rel="shortcut icon" href="../../img/Large_Mug.ico" type="image/x-icon">
   
</head>

<style type="text/css">
body{background-color: black;
	 font-family: 'Quattrocento Sans', sans-serif; 
	 font-weight: 100;}
	 
#container{position: relative;
			margin-left: auto;
			margin-right:auto;
			display: block;
			width:800px;
			top:70px;}

p{color:#848484;
  letter-spacing: 1.5px;
  font-size: 15px;}

#logo {
	position: relative;
	margin-left: auto;
	margin-right:auto;
	margin-bottom:27px;
	display: block;
	}

h2{color:white;
   font-family: 'Quattrocento Sans', sans-serif; 
   font-weight: 100;
   font-size: 20px;
   position: relative;
   top:10px;
   left:28px;}

#buttons{position: relative;
		 left:240px;
		width:310px;
		text-align:center;}
	
button{width:100px;
	   height:30px;}
ol { padding:0; margin:0;}
#deleteSong {
	margin:10px 0 0;
	padding:10px 0 0;
	border-top:1px solid #CCC;
}
#deleteSong select {
	height: 25px; margin: 5px; width: 300px;
}
</style>


<body>



<div id="container">
<img src="http://www.audiblecoffee.com/img/AC_LOGO-Rasterized.png" id="logo" />

<div id="buttons">
<?php if(isset($message)) {
echo '<div style="font-weight:bold;color:green;text-align:center;">'.$message.'</div><br/>';
}
if(isset($error)) {
echo '<div style="font-weight:bold;color:red;text-align:center;">'.$error.'</div><br/>';
}?>
<a href="addsong.php"><button>Add Song</button></a>
<form id="deleteSong" name="deleteSong" method="post" action="manage.php">
<ol>
<li><select name="song_id" id="song_id">
			<?php 
			foreach(getAllTracks() as $value)
				{
				echo "<option value=\"{$value['ID']}\">{$value['Title']} - {$value['Artist']}</option>";
				}
    		echo '</select>';
    		?>
    		<input type="submit" name="deletesong" id="deletesong" value="Delete Song">
</li>
</ol>
</form>

</div>

</div>	
</body>

