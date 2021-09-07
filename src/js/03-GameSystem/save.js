

window.getSaveDetails = function (saveSlot){
	if("ewaSaveDetails" in localStorage){
		let saves = JSON.parse(localStorage.getItem("ewaSaveDetails"))
		if(saves) {T.saves = saves ;return saves;}
		else {T.saves = returnSaveDetails(); return returnSaveDetails()}
	}
}

window.deleteSaveDetails = function (type,slot){
	var saveDetails = JSON.parse(localStorage.getItem("ewaSaveDetails"));
	if(type === "autosave"){
		saveDetails.autosave[slot] = null;
	}else{
		saveDetails.slots[slot-1] = null;
	}
	localStorage.setItem("ewaSaveDetails" ,JSON.stringify(saveDetails));
}

window.deleteAllSaveDetails = function (saveSlot){
	var saveDetails = {autosave:[null,null,null,null],slots:[null,null,null,null,null,null,null,null,null,null]};
	localStorage.setItem("ewaSaveDetails" ,JSON.stringify(saveDetails));
}

window.returnSaveDetails = function () {
	return Save.get();
}

window.resetSaveMenu = function () {
	new Wikifier(null, '<<resetSaveMenu>>');
}

window.loadSave = function (type, saveSlot , confirm) {
	if (V.conf.checkLoad === true && confirm === undefined) {
		new Wikifier(null, '<<loadConfirm ' + saveSlot + '>>');
	} else {
		Save.slots.load(saveSlot);
	}
}

window.save = function (saveSlot, confirm, saveId, data) {
	if (saveId == null) {
		new Wikifier(null, '<<saveConfirm ' + saveSlot + '>>');
	} else if ((V.conf.checkSave === true && confirm != true) || (V.saveId != saveId && saveId != null)) {
		new Wikifier(null, '<<saveConfirm ' + saveSlot + '>>');
	} else {
		if (saveSlot != undefined) {
			Save.slots.save(saveSlot, null, data);
			setSaveDetail("normal", saveSlot,  data)
			V.UI.currentOverlay = null;
			overlayShowHide("customOverlay");
		}
	}
}

window.deleteSave = function (saveSlot, confirm) {
	if (saveSlot === "all") {
		if (confirm === undefined) {
			new Wikifier(null, '<<clearSaveMenu>>');
			return;
		} else if (confirm === true) {
			Save.clear();
			deleteAllSaveDetails();
		}
	} else if (saveSlot === "auto") {
		if (V.conf.checkDel === true && confirm === undefined) {
			new Wikifier(null, '<<deleteConfirm ' + saveSlot + '>>');
			return;
		} else {
			Save.autosave.delete();
			deleteSaveDetails("autosave");
		}
	} else {
		if (V.conf.checkDel === true && confirm === undefined) {
			new Wikifier(null, '<<deleteConfirm ' + saveSlot + '>>');
			return;
		} else {
			Save.slots.delete(saveSlot);
			deleteSaveDetails(saveSlot)
		}
	}
	new Wikifier(null, '<<resetSaveMenu>>');
}

window.importSave = function (saveFile) {
	if (!window.FileReader) return; // Browser is not compatible

	var reader = new FileReader();

	reader.onloadend = function () {
		DeserializeGame(this.result);
	}

	reader.readAsText(saveFile[0]);
}

window.SerializeGame = function () { return Save.serialize(); }; window.DeserializeGame = function (myGameState) { return Save.deserialize(myGameState) };

window.getSaveData = function () {
	var input = document.getElementById("saveDataInput");
	updateExportDay();
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

window.updateExportDay = function(){
	if(V.saveDetails != undefined && SugarCube.State.history[0].variables.saveDetails != undefined){
		V.saveDetails.exported.days = clone(V.days);
		SugarCube.State.history[0].variables.saveDetails.exported.days = clone(SugarCube.State.history[0].variables.days);
		V.saveDetails.exported.count++;
		SugarCube.State.history[0].variables.saveDetails.exported.count++;
		V.saveDetails.exported.dayCount++;
		SugarCube.State.history[0].variables.saveDetails.exported.dayCount++;
		var sessionJson = sessionStorage.getItem(SugarCube.Story.domId + ".state");
		if(sessionJson != undefined){
			var session = JSON.parse(sessionJson);
			session.delta[0].variables.saveDetails.exported.days = clone(V.days);
			session.delta[0].variables.saveDetails.exported.dayCount++;
			session.delta[0].variables.saveDetails.exported.count++;
			sessionStorage.setItem(SugarCube.Story.domId + ".state", JSON.stringify(session));
		}
	}
}

window.updateSavesCount = function(){
	if(V.saveDetails != undefined && SugarCube.State.history[0].variables.saveDetails != undefined){
		V.saveDetails.slot.count++;
		SugarCube.State.history[0].variables.saveDetails.slot.count++;
		V.saveDetails.slot.dayCount++;
		SugarCube.State.history[0].variables.saveDetails.slot.dayCount++;
		var sessionJson = sessionStorage.getItem(SugarCube.Story.domId + ".state");
		if(sessionJson != undefined){
			var session = JSON.parse(sessionJson);
			session.delta[0].variables.saveDetails.slot.dayCount++;
			session.delta[0].variables.saveDetails.slot.count++;
			sessionStorage.setItem(SugarCube.Story.domId + ".state", JSON.stringify(session));
		}
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

window.validateValue = function (keys, value) {
	//console.log("validateValue",keys,value);
	var keyArray = Object.keys(keys);
	var valid = false;
	if (keyArray.length === 0) {
		valid = true;
	}
	if (keyArray.includes("min")) {
		if (keys.min <= value && keys.max >= value) {
			valid = true;
		}
	}
	if (keyArray.includes("decimals") && value != undefined) {
		if (value.toFixed(keys.decimals) != value) {
			valid = false;
		}
	}
	if (keyArray.includes("bool")) {
		if (value === true || value === false) {
			valid = true;
		}
	}
	if (keyArray.includes("boolLetter")) {
		if (value === "t" || value === "f") {
			valid = true;
		}
	}
	if (keyArray.includes("strings") && value != undefined) {
		if (keys.strings.includes(value)) {
			valid = true;
		}
	}
	return valid;
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

// !!Hack warning!! Don't use it maybe?
window.updateMoment = function () {
	// change last (and only) moment in local history
	State.history[State.history.length - 1].variables = JSON.parse(JSON.stringify(V));
	// prepare the moment object with modified history
	let moment = SugarCube.State.marshalForSave();
	// replace moment.history with moment.delta, because that's what SugarCube expects to find
	// this is a bad thing to do probably btw, because while history and delta appear to look very similar,
	// they're not always the same thing, SugarCube actually decodes delta into history (see: https://github.com/tmedwards/sugarcube-2/blob/36a8e1600160817c44866205bc4d2b7730b2e70c/src/state.js#L527)
	// but for my purpose it works (i think?)
	delete Object.assign(moment, {delta: moment.history}).history;
	// replace saved moment in session with the new one
	let gameName = SugarCube.Story.domId;
	sessionStorage[gameName + ".state"] = JSON.stringify(moment);
	// it appears that this line is not necessary for it to work
	//SugarCube.session._engine[gameName + ".state"] = JSON.stringify(moment);

	// Voilà! F5 will reload the current state now without going to another passage!
}

window.isJsonString = function(s) {
	try {
		JSON.parse(s);
	} catch (e) {
		return false;
	}
	return true;
}
