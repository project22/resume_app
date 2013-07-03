		<div id="fb-root"></div>
		<script>
		  window.fbAsyncInit = function() {
		    // init the FB JS SDK
		    FB.init({
		      appId      : '535369866524754',                        // App ID from the app dashboard
		      //channelUrl : '//WWW.YOUR_DOMAIN.COM/channel.html', // Channel file for x-domain comms
		      status     : true,                                 // Check Facebook Login status
		      xfbml      : true                                  // Look for social plugins on the page
		    });

		    // Additional initialization code such as adding Event Listeners goes here
		    FB.login(function(response) {
			   if (response.authResponse) {
			     console.log('Welcome!  Fetching your information.... ');
			     FB.api('/me', function(response) {
			       console.log('Good to see you, ' + response.name + '.');
			       console.log(response); // I wrote this.
			       $("#name").val(response.name);  // this is part of the FB.login function
			       // this places the value "name" from facebook into my id of "name"
			       // FYI, you can access public JSON for any user here
			       //  http://graph.facebook.com/588184619  (that's JP Berti ID)


			     });
			   } else {
			     console.log('User cancelled login or did not fully authorize.');
			   }
			 }, {
			     		scope: 'email,user_likes'  // asked for my stuff here.
			     	});
		    // End FB login code

		  };

		  // Load the SDK asynchronously
		  (function(d, s, id){
		     var js, fjs = d.getElementsByTagName(s)[0];
		     if (d.getElementById(id)) {return;}
		     js = d.createElement(s); js.id = id;
		     js.src = "//connect.facebook.net/en_US/all.js";
		     fjs.parentNode.insertBefore(js, fjs);
		   }(document, 'script', 'facebook-jssdk'));


		</script>