if (document.location.href.toLowerCase().includes("/temp/") || document.location.href.toLowerCase().includes("/private/") || hasOwnProperty.call(window, "storyFormat")) {
	// Change this to the path where this HTML file is
	// located if you want to run this from inside Twine.
	setup.Path = "H:/_ElysionWorldAdventure/dist";  // Running inside Twine application
} else {
	setup.Path = "";  // Running in a browser
}
setup.ImagePath = setup.Path + "image/";
setup.SoundPath = setup.Path + "sound/";

/* Load jQuery UI - Start */
setup.JSLoaded = false;
importStyles(setup.Path + "CSS/jquery-ui.css");
importScripts(setup.Path + "CSS/jquery-ui.js")
	.then(function() {
		setup.JSLoaded = true;
	}).catch(function(error) {
		alert(error);
	}
);
/* Load jQuery UI - End */

const select=(...args)=>(con)=>args.includes(con)