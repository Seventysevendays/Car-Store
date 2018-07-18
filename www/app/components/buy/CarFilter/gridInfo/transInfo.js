export const transInfo = (title) =>{
  switch (title) {
    case "avatar":
      title = null;
      break;
    case "buydate":
      title = "购买日期："
      break;
    case "color":
      title = "颜色："
      break;
    case "id":
      title = "编号："
      break;
    case "brand":
      title = "车系："
      break;
    case "km":
      title = "里程："
      break;
    case "price":
      title = "售价："
      break;
    case "engine":
      title = "发动机："
      break;
    case "exhaust":
      title = "排放："
      break;
    case "fuel":
      title = "燃料："
      break;
    case "gearbox":
      title = "变速箱："
      break;
    case "type":
      title = "车型："
      break;
    case "seat":
      title = "座位数："
      break;
    case "license":
      title = "是否上牌："
      break;
    case "ownerID":
      title = "车主ID："
      break;
    default:
      break;
  }
  return title;
}
