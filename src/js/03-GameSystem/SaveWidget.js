
window.initSaveData = function(forceRun){
    
    if('ewaSaveDetails' in localStorage===false || forceRun === true){
        let saveDetails = {autosave:[null,null,null,null],slots:[null,null,null,null,null,null,null,null,null,null]}

        localStorage.setItem("ewaSaveDetails" ,JSON.stringify(saveDetails))
    }
    else if('ewaSaveDetails' in localStorage===true){
        let save = JSON.parse(localStorage.getItem("ewaSaveDetails"))

        if(save.autosave == null || save.autosave.length < 4){
            let newsaves = {autosave:[null,null,null,null],slots:[null,null,null,null,null,null,null,null,null,null]}

            localStorage.setItem("ewaSaveDetails" ,JSON.stringify(newsaves))
        }
    }
}

window.saveOK = function(){
    if(V.passage =="Start" || V.passage =="Event" || V.tags.includes("nosave")){
        cf.allowsave = false
        return false
    }
    else{
        cf.allowsave = true
        return true
    }
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

/* 初期化or继承旧档案 */
window.prepareSaveDetails = function (forceRun){
	if("ewaSaveDetails" in localStorage === false || forceRun === true){
		var saveDetails = {autosave:[null,null,null,null],slots:[null,null,null,null,null,null,null,null,null,null]}
		var SCubeSave = Save.get();

		for(let i=0; i<3;i++){
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

		for(let i = 3; i < SCubeSave.slots.length; i++){
			if(SCubeSave.slots[i] !== null){
				saveDetails.slots[i-3]={
					title: SCubeSave.slots[i].title,
					date: SCubeSave.slots[i].date,
					metadata: SCubeSave.slots[i],metadata
				};
			}
			else{
				saveDetails.slots[i] = null;
			}
		}
		
		localStorage.setItem("ewaSaveDetails" ,JSON.stringify(saveDetails));
	}
	return saveDetails;
}

/* 自动保存，只会在 daychange和主线开启时执行 */
window.AutoSave = function(metadata){
    var saveDetails = JSON.parse(localStorage.getItem("ewaSaveDetails"))
    var metadata = setSaveMetaData()
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


window.setSaveDetail = function (type, slot, metadata, story ){
	var saveDetails = JSON.parse(localStorage.getItem("ewaSaveDetails"));
	if(type === "autosave"){
		saveDetails.autosave[slot] = {
			title: SugarCube.Story.get(V.passage).title,
			date:Date.now(),
			metadata:metadata
		};
	}else{
		var slot = parseInt(saveSlot);
		saveDetails.slots[slot-3] = {
			title: SugarCube.Story.get(V.passage).title,
			date:Date.now(),
			metadata:metadata
		};
	}
	localStorage.setItem("ewaSaveDetails" ,JSON.stringify(saveDetails));
}