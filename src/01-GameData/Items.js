D.Items = {
    foods:{}, medicine:{}, tool:{}, collection:{}, homekea:{},
    weapon:{}, accesory:{}, material:{}, adults:{}, other:{},
    important:{}, 
}

D.Items.foods = {
    汉堡包:{
        name:"汉堡包", type:"食物", category:"foods",
        thumb:null, price:6, fresh:10,
        shop:"快餐",
        name_en:"Hamburger",
        text:"只要是快餐店就一定会有卖的汉堡包。毕竟是最便宜的汉堡，份量不怎么的，味道也很一般。",
        text_en:"The burger that definitely will be sold in all kind of fast food restaurant. Because it's the cheapest burger, so you can't expect its volumn and taste.",
        effect(){
            if(this.fresh == 0);

            PC.base.饮食[0] += 200;
            return PC.base.饮食;
        },
    },
}

D.Items.important = {
    魔力方块:{
        name:"魔力方块", type:"重要", category:"important",
        thumb:null, effect:"剧情", value:0, price:0, num:0,
        shop:null,
        name_en:"M-Cube",
        text:"不知道有什么用的含有魔力的方块。往方块注入魔力的话，似乎能测试出自己的魔力类型。",
        text_en:"A cube can contain mana but not way to use it. You may test your own mana type if you put mana into the cube. ",
    },
}

D.Items.other = {
    通用物品:{
        name:"通用物品", type:"其他", category:"other",
        thumb:null, effect:"无", value:0, price:1,num:0, 
        shop:null,
        name_en:"Common Material",
        text:"一个万能的通用物品。虽然万能，却又什么都做不到。当玩家尝试获取某个不存在的物品是才会产生的物质。只能用来合成。",
        text_en:"A common material for everything. Although it's universal but it can't do anything. It only will happen When player try to get an item doesn't exist.",
    },
}