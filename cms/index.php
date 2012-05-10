<?php 
include("../includes/init.php");
if(!empty($_POST['username'])) {
	if(!adminLogin($_POST['username'],$_POST['password'])) {
		$message = "Invalid Username or Password.";
	}
}
if(checkAdminLogin()) {
	header("Location: manage.php");
	die();
}?>
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
   
#adminlogin{left: 290px;
			display: block;
			position: relative;}
   
	

</style>


<body>



<div id="container">
<a href="http://www.audiblecoffee.com"><img src="../img/AC_LOGO-Rasterized.png" id="logo" /></a>

<form id="adminlogin" name="adminlogin" method="post" action="index.php">
<ol>
<?php if(isset($message)) echo '<li style="font-weight:bold;color:red;">'.$message.'</li>';?>
<li><input type="text" name="username" id="username" value="Username"></li>
<li><input type="password" name="password" id="password" value="Password"></li>
<li class="login"><input type="submit" name="login" id="login" value="Login"></li>
</ol>
</form>


</div>	
</body>

