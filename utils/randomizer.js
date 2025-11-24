const { typeofeng,markauto,letters,arrauto} = require("../data/data.js")
const fs=require("fs");
const path=require("path")
let count=0;
const randomint=(min,max)=>{
    return min + Math.floor(Math.random() * (max - min + 1));
};
const randomfloat=(min,max)=>{
    return (min +(Math.random()*(max - min + 0.1))).toFixed(2);
}
const randomColor = () => {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0');
};
const randnomer=()=>{
let nomer="";
nomer+=randomint(0,9);
nomer+=randomint(0,9);
nomer+=randomint(0,9);
nomer+=randomint(0,9);
nomer+="-";
nomer+=letters[randomint(0,25)];
nomer+=letters[randomint(0,25)];
nomer+=randomint(0,9);
return nomer;
}
const addnewauto=()=>{
    for (let i = 0;  i < 3 ; i++) {
      if (arrauto.length==3) {
        break;
      }
      let obj={
      Marka:markauto[randomint(0,5)],
      Nomer:randnomer(),
      kraska:randomColor(),
      datavipuska:randomint(1990,2025),
      typeeng:typeofeng[randomint(0,3)],
      costnarush:randomint(40,1000),
      photo:""
    }
  arrauto.push(obj)
     fs.writeFileSync(path.join(__dirname,"../data","json","auto.json"),JSON.stringify(arrauto,null,2),"utf-8")
    }
}
const randfirstobj=()=>{
  if(arrauto.length<3){
addnewauto();
  }  
for (let i = 0; i <= 2; i++) {
arrauto[i].Marka=markauto[randomint(0,5)];
arrauto[i].Nomer=randnomer();
arrauto[i].kraska=randomColor();
arrauto[i].datavipuska=randomint(1990,2025);
arrauto[i].typeeng=typeofeng[randomint(0,3)];
arrauto[i].narusheniya=randomint(3,15);
arrauto[i].costnarush=randomint(40,1000);
}
fs.writeFileSync(path.join(__dirname,"../data","json","auto.json"),JSON.stringify(arrauto,null,2),"utf-8")
}
module.exports={randomint,randomfloat,randfirstobj};