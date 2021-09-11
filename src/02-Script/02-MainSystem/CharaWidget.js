function setChara(args){
    if(args=="pc" || args=="player"){
        V.CChara = {
            name: PC.info.name,
            gender: PC.info.gender,
            genital: PC.genital,
            genitype: PC.info.race+"阴茎",
            base : PC.base,
            source: PC.source,
            key : "PC"
        }
    }else if (args=="pet"){
        V.CChara = {
            name: pet.name,
            gender: pet.gender,
            genital: pet.genital,
            genitype: pet.genitype,
            base: pet.base,
            source: pet.source,
            key : "pet",
        }
    }else{
        V.CChara = {
            name: NPC[args].name,
            gender: NPC[args].gender,
            genital: NPC[args].genital,
            genitype: NPC[args].genitype,
            base: NPC[args].base,
            source: NPC[args].source,
            key : "NPC."+args,
        }
    }
}
F.setChara = setChara
DefineMacroS("setchara",setChara)