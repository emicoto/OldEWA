A.lewdup = {
    乳环:{
        name:"乳环", png: "sp/nipring",
        hasDif:{breast: true, pregnant:false}, hasImg:false, functional: true,
        cost: 20, energy: 0,
        category:"特殊", layer:"nipple",
        shop: "adults",
        text:"一对设计简单的乳环。毕竟是便宜货，戴久了可能会有不适。",

        effect(min){
            Source.pc.快B += 0.5*min;
            Source.pc.疼痛 += 2*min;
            return [V.FEquip.nipple,Source.pc.快B,Source.pc.疼痛]
        },
    },
    乳环项链:{
        name:"乳环项链", png:"sp/nipnecklace",
        hasDif:{breast:true, pregnant:false}, hasImg:false, functional: true,
        cost: 50, energy: 0,
        category:"特殊", layer:"nipple",
        shop:"adults",
        text:"色气的乳环项链。毕竟是便宜货，戴久了可能会有不适。",

        effect(min){
            Source.pc.快B += 0.5*min;
            Source.pc.疼痛 += 2*min;
            return [V.FEquip.nipple,Source.快B,Source.pc.疼痛]
        },
    },
    乳头跳蛋:{},
}

/*  贞操笼、贞操带、贞操内裤算内裤范围内!带震动棒版本的穿上时联动这里的function? */
A.lewdbt = {
    V震动棒:{},
    A震动棒:{},
    双震动棒:{},
    V跳蛋:{},
    A跳蛋:{},
}