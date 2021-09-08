
window.initSaveData = function(forceRun){
    
    if('ewaSaveDetails' in localStorage===false || forceRun === true){
        let saveDetails = {autosave:[null,null,null,null],slots:[null,null,null,null,null,null,null,null,null,null,null,null]}

        localStorage.setItem("ewaSaveDetails" ,JSON.stringify(saveDetails))
    }
    else if('ewaSaveDetails' in localStorage===true){
        let save = JSON.parse(localStorage.getItem("ewaSaveDetails"))

        if(!save.autosave || save?.autosave?.length < 4 || save?.slots?.length < 12){
            let newsaves = prepareSaveDetails()

            localStorage.setItem("ewaSaveDetails" ,JSON.stringify(newsaves))
        }
    }
}

window.saveOK = function(slot){
    if(V.passage =="Start" || V.passage =="Event" || V.tags.includes("nosave")){
        cf.allowsave = false
        return false
    }
    else if( slot >= 0 && conf.saves[slot].locked === true){
        return false
    }
    else{
        cf.allowsave = true
        return true
    }
}

window.returnSaveDetails = function () {
	return Save.get();
}

window.resetSaveMenu = function () {
	new Wikifier(null, '<<resetSaveMenu>>');
}

window.SaveUnlock = function(slot) {
    conf.saves[slot].locked = !conf.saves[slot].locked
    resetSaveMenu()
}

window.setSaveMetaData = function(){
    let data = {
        playedtime : clone(V.gametime),
        gamedate : clone(V.day),
        location : (V.local?.tag?.includes("家") ? `${PC.info.name}家` : V.location),
        saveId: V.saveId,
        pctitle: PC.info.title,
        saveName: PC.info.name,
    }
    return data
}
F.setSaveMetaData = setSaveMetaData

/* 初期化or继承旧档案 */
window.prepareSaveDetails = function (forceRun){
	if("ewaSaveDetails" in localStorage === false || forceRun === true){
		var saveDetails = {autosave:[],slots:[]}
		var SCubeSave = Save.get();

		for(let i=0; i<4;i++){
			if(SCubeSave.slots[i]!==null){
				saveDetails.autosave[i] = {
					title: SCubeSave.slots[i].title,
					date:  SCubeSave.slots[i].date,
					metadata:SCubeSave.slots[i].metadata
				}
			}else{
				saveDetails.autosave[i] = null
			}
		}

		for(let i = 4; i < SCubeSave.slots.length; i++){
			if(SCubeSave.slots[i] !== null){
				saveDetails.slots[i-4]={
					title: SCubeSave.slots[i].title,
					date: SCubeSave.slots[i].date,
					metadata: SCubeSave.slots[i],metadata
				};
			}
			else{
				saveDetails.slots[i-4] = null;
			}
		}
		
		localStorage.setItem("ewaSaveDetails" ,JSON.stringify(saveDetails));
	}
	return saveDetails;
}

/* 自动保存，只会在 daychange和主线开启时执行 */
window.AutoSave = function(metadata){
    var saveDetails = JSON.parse(localStorage.getItem("ewaSaveDetails"))
    if(!metadata){
      var metadata = setSaveMetaData()  
    }
    /* sugarcube的正常存档 slot 0~2 为自动存档位。 3~12才是常规存档*/

    for(var i=0; i < 4; i++){

        if(Save.slots.has(i)==false){
            Save.slots.save(i, SugarCube.Story.get(V.passage).title, metadata);
            saveDetails.autosave[i] = {
                title: SugarCube.Story.get(V.passage).title,
                date: Date.now(),
                metadata: metadata,
            };
            localStorage.setItem('ewaSaveDetails', JSON.stringify(saveDetails));
            return saveDetails.autosave[i]
        }
    }

    if(i==3){

        let saves = JSON.parse(localStorage.getItem('EWA.saves'))
        swap(saves.slots,3,0)
        swap(saves.slots,0,1)
        swap(saves.slots,1,2)

        localStorage.setItem('EWA.saves',JSON.stringify(saves))
        Save.slots.save(0,SugarCube.Story.get(V.passage).title, metadata)

        swap(saveDetails.autosave,3,0)
        swap(saveDetails.autosave,0,1)
        swap(saveDetails.autosave,1,2)

        saveDetails.autosave[0] = {
            title: SugarCube.Story.get(V.passage).title,
            date: Date.now(),
            metadata: metadata,
        };

        localStorage.setItem('ewaSaveDetails', JSON.stringify(saveDetails));
        return Save.slots.get(0), saveDetails.autosave[0]
    }
    
}
F.AutoSave = window.AutoSave

window.setSaveDetail = function (type, slot, metadata, story ){
	var saveDetails = JSON.parse(localStorage.getItem("ewaSaveDetails"));
	if(type === "autosave"){
		saveDetails.autosave[slot] = {
			title: SugarCube.Story.get(V.passage).title,
			date:Date.now(),
			metadata:metadata
		};
	}else{
		var slot = parseInt(slot);
		saveDetails.slots[slot-4] = {
			title: SugarCube.Story.get(V.passage).title,
			date:Date.now(),
			metadata:metadata
		};
	}
	localStorage.setItem("ewaSaveDetails" ,JSON.stringify(saveDetails));
}
F.setSaveDetail = window.setSaveDetail

window.SaveGame = function(slot, uid, metadata, check) {
    if(!metadata){
        var metadata = setSaveMetaData()
    }

    let fslot = slot - 4

        /* 覆盖时的确认检测，以及不是同一个角色的档案时的确认检测 */
    if((V.conf.checkSave === true && check === true) || (V.saveId != uid && uid != null)) {
        new Wikifier(null, '<<saveConfirm '+fslot+'>>') /* 确认时要读取一下 伪存档，把 伪slot id扔回去*/
    }
    else{
        if(slot > 0){
            Save.slots.save(slot,null,metadata);
            setSaveDetail("normal",slot, metadata)
            resetSaveMenu()
        }
    }

}
F.SaveGame = window.SaveGame

window.LoadGame = function(type, slot, check) {

    // 设置了每次读档都提示是否要确认时
    if( (V.conf.checkLoad===true && !check) || check === true){
        new Wikifier(null, `<<loadConfirm '${type}' ${slot}>>`);
    }
    else{
        Save.slots.load(slot)
    }
}

window.deleteSave = function(type,slot, check){

    /* 设置了删档需要确认时 */
    if(V.conf.checkDel === true && !check || check === true){
        new Wikifier(null,`<<deleteConfirm '${type}' ${slot}>>`);
        return;

    }
    else if(type =="auto"){
        Save.slots.delete(slot)
        deleteSaveDetails("auto", slot)

    }else{
        let tslot = slot +4
        Save.slots.delete(tslot)
        deleteSaveDetails("normal",slot)
    }
    resetSaveMenu()
}

window.deleteSaveDetails = function (type,slot){
	var saveDetails = JSON.parse(localStorage.getItem("ewaSaveDetails"));
	if(type === "autosave"){
		saveDetails.autosave[slot] = null;
	}else{
		saveDetails.slots[slot] = null;
	}
	localStorage.setItem("ewaSaveDetails" ,JSON.stringify(saveDetails));
}