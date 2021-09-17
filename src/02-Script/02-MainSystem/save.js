

window.getSaveDetails = function (saveSlot){
	if("EWA.SaveDetails" in localStorage){
		let saves = JSON.parse(localStorage.getItem("EWA.SaveDetails"))
		if(saves) {T.saves = saves ;return saves;}
		else {T.saves = returnSaveDetails(); return returnSaveDetails()}
	}
}

window.deleteAllSaveDetails = function (saveSlot){
	var saveDetails = {autosave:[null,null,null,null],slots:[null,null,null,null]}
	localStorage.setItem("EWA.SaveDetails" ,JSON.stringify(saveDetails));
}

window.importSave = function (saveFile) {
	if (!window.FileReader) return; // Browser is not compatible

	var reader = new FileReader();

	reader.onloadend = function () {
		DeserializeGame(this.result);
	}

	reader.readAsText(saveFile[0]);
}

window.SerializeGame = function () { return Save.serialize(); }; 
window.DeserializeGame = function (myGameState) { return Save.deserialize(myGameState) };

window.getSaveData = function () {
	var input = document.getElementById("saveDataInput");
	input.value = Save.serialize();
}

window.loadSaveData = function () {
	var input = document.getElementById("saveDataInput");
	var result = Save.deserialize(input.value);
	if (result === null) {
		input.value = "Invalid Save."
	}
}

window.clearTextBox = function (id) {
	document.getElementById(id).value = "";
}

window.topTextArea = function (id) {
	var textArea = document.getElementById(id);
	textArea.scroll(0, 0);
}

window.bottomTextArea = function (id) {
	var textArea = document.getElementById(id);
	textArea.scroll(0, textArea.scrollHeight);
}

window.copySavedata = function (id) {
	var saveData = document.getElementById(id);
	saveData.focus();
	saveData.select();

	try {
		var successful = document.execCommand('copy');
	} catch (err) {
		var copyTextArea = document.getElementById("CopyTextArea");
		copyTextArea.value = "Copying Error";
		console.log('Unable to copy: ', err);
	}
}

window.importSettings = function (data, type) {
	switch(type){
		case "text":
			V.importString = document.getElementById("settingsDataInput").value
			new Wikifier(null, '<<displaySettings "importConfirmDetails">>');
			break;
		case "file":
			var reader = new FileReader();
			reader.addEventListener('load', function (e) {
				V.importString = e.target.result;
				new Wikifier(null, '<<displaySettings "importConfirmDetails">>');
			});
			reader.readAsBinaryString(data[0]);
			break;
		case "function":
			importSettingsData(data);
			break;
	}
}

var importSettingsData = function (data) {
	var S = null;
	var result = data;
	if (result != null && result != undefined) {
		//console.log("json",JSON.parse(result));
		S = JSON.parse(result);
	}
}

window.loadExternalExportFile = function () {
	importScripts("ewaSettingsExport.json")
		.then(function () {
			var textArea = document.getElementById("settingsDataInput");
			textArea.value = JSON.stringify(ewaSettingsExport);
		})
		.catch(function (err) {
			//console.log(err);
			var button = document.getElementById("LoadExternalExportFile");
			button.value = "Error Loading";
		});
}


window.isJsonString = function(s) {
	try {
		JSON.parse(s);
	} catch (e) {
		return false;
	}
	return true;
}

window.updateExported = function(){
	if(V.SaveDetails != undefined){
		V.SaveDetails.days = clone(V.days)
		V.SaveDetails.exported ++
	}
}

/*
if(V.days > V.SaveDetails.days + V.SaveDetails.frequency){
	//你已经有段时间没导出存档了，为了避免以意外发生，建议及时导出存档。
}
*/