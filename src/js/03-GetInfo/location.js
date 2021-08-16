window.imglocation = function(){
    var location = V.local.place
    switch (location) {
      case "单身公寓":
        return "singleapartment"
      case "怡安小区":
        return "neiborhood"
      default:
        return "dummy"
    }
  
}