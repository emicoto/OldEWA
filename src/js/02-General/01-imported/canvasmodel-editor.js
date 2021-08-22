function copyToClipboard(textarea, data) {
	textarea.value = data;
	textarea.setAttribute("style", "");
	textarea.select();
	document.execCommand("copy");
	alert("Copied to clipboard!");
	textarea.setAttribute("style", "display:none");
}