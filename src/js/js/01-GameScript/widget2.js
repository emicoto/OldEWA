// Make it so that paths can work properly when launched from Twine.
setup.ImagePath = "image/";

/* HoverTxt - Start */
var HTIntervalID = 0;
$(document).on(":passagerender", function (ev) {
	UpdateHoverTxt(ev.content);
});
$(window).on("resize scroll", function (ev) {
	clearInterval(HTIntervalID);
	HTIntervalID = setInterval(UpdateHoverTxt, 300);
});
$("#ui-bar-toggle").on("click", function (ev) {
	clearInterval(HTIntervalID);
	HTIntervalID = setInterval(UpdateHoverTxt, 300);
});
/* Waits for passage to be fully rendered before doing anything. */
function UpdateHoverTxt(Container) {
	if (typeof Container === "undefined") {
		Container = document;
	}
	if (Engine.isIdle()) {
		clearInterval(HTIntervalID);
		var i = 1, sum, positionInfo, element = Container.getElementById("hoverTxt" + i);
		while (element !== null) {
			positionInfo = element.getBoundingClientRect();  /* Refresh rect */
			element.style.left = ((Math.round(positionInfo.width / 2) - 11) * -1) + "px";  // Center hoverTxt horizontally over icon.
			element.style.top = (-1 * parseInt(positionInfo.height) - 3) + "px";  // Position bottom of hoverTxt just above the icon.
			positionInfo = element.getBoundingClientRect();  /* Refresh rect */
			sum = Math.round(positionInfo.top + positionInfo.height + 5);
			if (sum > window.innerHeight) {  /* Make sure the text isn't outside the bottom of the screen. */
				element.style.top = (parseInt(element.style.top) + window.innerHeight - sum) + "px";
				positionInfo = element.getBoundingClientRect();  /* Refresh rect */
			}
			if (positionInfo.top < 5) {  /* Make sure the text isn't outside the top of the screen. */
				element.style.top = (parseInt(element.style.top) - positionInfo.top + 5) + "px";
			}
			sum = Math.round(positionInfo.left + positionInfo.width + 26);
			if (sum > window.innerWidth) {  /* Make sure the text isn't outside the right of the screen. */
				element.style.left = (parseInt(element.style.left) + window.innerWidth - sum) + "px";
				positionInfo = element.getBoundingClientRect();  /* Refresh rect */
			}
			if (positionInfo.left + window.pageXOffset < 10) {  /* Make sure the text isn't outside the left of the screen. */
				element.style.left = (parseInt(element.style.left) - positionInfo.left - window.pageXOffset + 10) + "px";
			}
			element = document.getElementById("hoverTxt" + (++i));
		}
	} else {
		clearInterval(HTIntervalID);
		HTIntervalID = setInterval(UpdateHoverTxt, 300);
	}
}
/* HoverTxt - End */

/* hovertip v2.0 - Start */
window.UpdateHoverTipTxt = function (container) {
	if (Engine.isIdle()) {
		clearInterval(HTTIntervalID);
		if (container === undefined) {
			container = $(document);
		} else {
			container = $(container);
		}
		var i, id, top, left, parent, elementList, element, hoverPos, boxPos, zindex;
		elementList = container.find('span[id^="hoverTipTxt"]');
		for (i = 0; i < elementList.length; i++) {
			element = $(elementList[i]);
			id = elementList[i].id.substring(11);
			/* Find parent hoverTip item on the page. */
			parent = $(container).find("#hoverTip" + (id));
			/* Position bottom of hoverTipTxt just above the parent. */
			top = Math.round(-element.outerHeight() - 6);
			/* Center hoverTipTxt horizontally over parent. */
			left = Math.round((parent.outerWidth() - element.outerWidth()) / 2);
			/* See if the hoverTip is contained by something with a higher z-index. */
			zindex = element.css("z-index");
			if (zindex === "auto") {
				zindex = 0;
			} else {
				zindex = parseInt(zindex, 10);
			}
			while (parent.parent()[0] !== document) {
				if ((parent.parent().css("z-index") !== "auto") && (parseInt(parent.parent().css("z-index"), 10) > zindex)) {
					/* Get container rect. */
					boxPos = parent[0].getBoundingClientRect();
					break;
				}
				parent = parent.parent();
			}
			/* Update position. */
			element.css({ top: top, left: left });
			hoverPos = element[0].getBoundingClientRect();
			/* Make sure the text isn't outside the bottom of the screen. */
			if (hoverPos.top > window.innerHeight - hoverPos.height - 10) {
				top -= hoverPos.top - (window.innerHeight - hoverPos.height - 10);
			}
			/* Make sure the text isn't outside the top of the screen. */
			if (hoverPos.top < 4) {
				top -= hoverPos.top - 4;
			}
			/* Make sure the text isn't outside the right of the screen. */
			if (hoverPos.left > window.innerWidth - hoverPos.width - 26) {
				left -= hoverPos.left - (window.innerWidth - hoverPos.width - 26);
			}
			/* Make sure the text isn't outside the left of the screen. */
			if (hoverPos.left < 4) {
				left -= hoverPos.left - 4;
			}
			/* Update position. */
			element.css({ top: Math.round(top), left: Math.round(left) });
			hoverPos = element[0].getBoundingClientRect();
			if (boxPos) {  /* Fit within dialog boxes and the like. */
				/* Make sure the text isn't outside the bottom of the box. */
				if (hoverPos.top > boxPos.bottom - hoverPos.height - 10) {
					top -= hoverPos.top - (boxPos.bottom - hoverPos.height - 10);
				}
				/* Make sure the text isn't outside the top of the box. */
				if (hoverPos.top < boxPos.top + 4) {
					top -= hoverPos.top - (boxPos.top + 4);
				}
				/* Make sure the text isn't outside the right of the box. */
				if (hoverPos.left > boxPos.right - hoverPos.width - 26) {
					left -= hoverPos.left - (boxPos.right - hoverPos.width - 26);
				}
				/* Make sure the text isn't outside the left of the box. */
				if (hoverPos.left < boxPos.left + 4) {
					left -= hoverPos.left - boxPos.left - 4;
				}
				/* Update position. */
				element.css({ top: Math.round(top), left: Math.round(left) });
			}
		}
	} else {
		clearInterval(HTTIntervalID);
		HTTIntervalID = setInterval(UpdateHoverTipTxt, 300);
	}
};
/*  Waits for passage to be fully rendered before doing anything.  */
var HTTIntervalID = 0;
$(document).on(":passageend", function (ev) {
	UpdateHoverTipTxt();
});
$(window).on("resize scroll", function (ev) {
	clearInterval(HTTIntervalID);
	HTTIntervalID = setInterval(UpdateHoverTipTxt, 300);
});
$("#ui-bar-toggle").on("click", function (ev) {
	clearInterval(HTTIntervalID);
	HTTIntervalID = setInterval(UpdateHoverTipTxt, 300);
});
/* <<hovertip>> macro */
Macro.add("hovertip", {
	tags	 : null,
	handler  : function () {
		if (this.args.length > 0) {
			var mw = "";
			if ((this.args.length > 1) && (!isNaN(parseInt(this.args[1], 10)))) {
				mw = ' style="max-width: ' + parseInt(this.args[1], 10) + 'px;"';
			}
			if (State.temporary.HoverTipCount == undefined) {
				State.temporary.HoverTipCount = 1;
			} else {
				State.temporary.HoverTipCount++;
			}
			while ($("#hoverTip" + State.temporary.HoverTipCount).length) {
				/* Found an existing hoverTip. */
				State.temporary.HoverTipCount++;
			}
			var output = '<span id="hoverTip' + State.temporary.HoverTipCount +
					'" class="hoverTipTxt hoverTip" tabindex="0" ' +
					'onmouseenter="UpdateHoverTipTxt();">' +
					this.payload[0].contents + '<span id="hoverTipTxt' +
					State.temporary.HoverTipCount + '" class="hoverBox hoverTail"' +
					mw + '>' + this.args[0] + '</span></span>';
			$(this.output).wiki(output);
		} else {
			$(this.output).wiki(this.payload[0].contents);
		}
	}
});
/* hovertip v2.0 - End */

window.ImgExist = function(imgurl) {
	var imgobj = new Image()
	imgobj.src = imgurl;
	if (imgobj.fileSize > 0 || (imgobj.width > 0 && imgobj.height > 0)) {  
		return true;
   } else {  
		return false;
	} 
}