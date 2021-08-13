
if (document.location.href.toLowerCase().includes("/temp/") || document.location.href.toLowerCase().includes("/private/") || hasOwnProperty.call(window, "storyFormat")) {
	// Change this to the path where this HTML file is
	// located if you want to run this from inside Twine.
	setup.Path = "H:/_ElysionWorldAdventure/dist/";  // Running inside Twine application
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

function inrange(num1, num2) {
	const arr = [];
	for (let index = 0; num1 <= num2; index++, num1++) {
	  arr[index] = num1;
	}
	 return num => arr.includes(num)
  }

class SelectCase {
	cases = [];
	default = "";
	add(num1, num2, string) {
	  this.cases.push({ num1, num2, string });
	}
	has(num) {
	  for (const element of this.cases) {
		let { num1, num2, string } = element;
		if (num1 <= num && num <= num2) {
		  return string;
		}
	  }
	  return this.default;
	}
  }

window.range = function(num,min,max){
	if (num >= min && num <= max){return true}
	else{return false}
}


window.ImgExist = function(imgurl) {
	var imgobj = new Image()
	imgobj.src = imgurl;
	if (imgobj.fileSize > 0 || (imgobj.width > 0 && imgobj.height > 0)) {  
		return true;
   } else {  
		return false;
	} 
}