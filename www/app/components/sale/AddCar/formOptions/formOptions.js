import carField from '../carField/carField'

export const carOptions = [];
for(var prop in carField){
  var brand = [];
  for(var i = 0; i < carField[prop].length; i ++){
    brand.push(
      {
        value: carField[prop][i].name,
        label: carField[prop][i].name,
        children: carField[prop][i].series.map(item => {
          return {
            value: item,
            label: item
          }
        })
      }
    )
  }
  carOptions.push({
    value: prop,
    label: prop,
    children: brand
  })
}
export const fuelOptions = [
  {
    value: "汽油",
    label: "汽油"
  },
  {
    value: "燃气",
    label: "燃气"
  },
  {
    value: "油电混合",
    label: "油电混合"
  },
  {
    value: "人力",
    label: "人力"
  }
]
export const exhaustOptions = [
  {
    value: "国一",
    label: "国一"
  },
  {
    value: "国二",
    label: "国二"
  },
  {
    value: "国三",
    label: "国三"
  },
  {
    value: "国四",
    label: "国四"
  },
  {
    value: "国五",
    label: "国五"
  }
]
export const gearboxOptions = [
  {
    value: "自动",
    label: "自动"
  },
  {
    value: "手动",
    label: "手动"
  },
  {
    value: "手自动",
    label: "手自动"
  }
]
