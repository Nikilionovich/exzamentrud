
allcars.addEventListener("click", () => {
  getreqserver(`/car-violations/All`);
})
createauto.addEventListener("click", () => {
  postreqserv(`/adminpage/createauto`);
})
raisenarushbtn.addEventListener("click", () => {
  patchreqserv(`/adminpage/dump/raisenarush`);
})
delauto.addEventListener("click", () => {
  delreqserv(`/adminpage/delauto`);
})
changeOFauto.addEventListener("click", () => {
  putreqserv(`/adminpage/dump/changesometh`);
})
downloadbtn.addEventListener("click",()=>{
  const a=document.createElement("a");
  a.href="/adminpage/dump/download";
  a.download="auto.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});
downloadbtnsearch.addEventListener("click",()=>{
  const a=document.createElement("a");
  a.href="/adminpage/dump/downloadsearch";
  a.download="filteredauto.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
})
searchauto.addEventListener("click", () => {
  let reqpath = new URLSearchParams()
  let obj = {
    Marka: searchmark.value,
    Nomer: searchnomer.value,
    kraska: searchkraska.value,
    datavipuska: searchyearvipusk.value,
    typeeng: searchtypeeng.value,
    narusheniya: searchnarush.value
  }
  for (const el in obj) {
    if (obj[el] != "") {
      reqpath.set(el, obj[el]);
    }
  }
  getreqserver(`/car-violations/filt?${reqpath.toString()}`);
})
const getreqserver = async (reqpath) => {
  const res = await fetch(reqpath);
  const data = await res.json();
  await crenderSortedAr(data);
}
const postreqserv = async (reqpath) => {
  const res = await fetch(reqpath, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      Marka: createmark.value,
      Nomer: createnomer.value,
      kraska: createkraska.value,
      datavipuska: createyearvipusk.value,
      typeeng: createtypeeng.value,
      narusheniya: createnarush.value,
      costnarush: createcostnarush.value
    })
  });
  if (res.ok) {
    const data = await res.json();
    await crenderSortedAr(data);
  }
}
const patchreqserv = async (reqpath) => {
  const res = await fetch(reqpath, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      Marka: raisemark.value,
      Nomer: raisenomer.value,
      narusheniya: raisenarush.value,
      costnarush: raisecostnarush.value
    })
  });
  if (res.ok) {
    const data = await res.json();
    await crenderSortedAr(data);
  }
}
const putreqserimg = async (reqpath, marka1, nomer1, photo1) => {
  console.log(marka1, nomer1, "////////", photo1)
  const res = await fetch(reqpath, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      Marka: marka1,
      Nomer: nomer1,
      photo: photo1
    })
  });
  if (res.ok) {
    getreqserver(`/car-violations/All`);
  }
}
const putreqserv = async (reqpath) => {
  const res = await fetch(reqpath, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      Marka: changemark.value,
      Marka1: change1mark.value,
      Nomer: changenomer.value,
      Nomer1: change1nomer.value,
      kraska: changekraska.value,
      datavipuska: changeyearvipusk.value,
      typeeng: changetypeeng.value,
      narusheniya: changenarush.value,
      costnarush: changecostnarush.value
    })
  });
  if (res.ok) {
    alert("Изменено");
  }
}
const delreqserv = async (reqpath) => {
  const res = await fetch(reqpath, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      Marka: delmark.value,
      Nomer: delnomer.value,
    })
  });
  if (res.ok) {
    alert("Удалено");
    getreqserver(`/car-violations/All`);
  }
  else {
    alert("Нету такого:(");
  }
}
const deloneclickreqserv = async (reqpath, marka1, nomer1) => {
  const res = await fetch(reqpath, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      Marka: marka1,
      Nomer: nomer1,
    })
  });
  if (res.ok) {
    alert("Удалено");
    getreqserver(`/car-violations/All`);
  }
  else {
    alert("Нету такого:(");
  }
}

async function crenderSortedAr(data) {
  const list = document.querySelector("#output-box");
  list.textContent = "";
  for (const el of data) {
    render(el)
  }
}
const render = (data) => {
  const list = document.querySelector("#output-box");
  const temp = document.querySelector("#templatemess");
  const item = temp.content.cloneNode(true);
  item.querySelector("#marka").textContent = data.Marka;
  item.querySelector("#nomer").textContent = data.Nomer;
  item.querySelector("#kraska").textContent = data.kraska;
  item.querySelector('#stylekraska').style = `background-color:${data.kraska}`;
  item.querySelector("#yearofvipusk").textContent = data.datavipuska;
  item.querySelector("#typeeng").textContent = data.typeeng;
  item.querySelector("#narush").textContent = data.narusheniya;
  item.querySelector("#costnarush").textContent = data.costnarush;
  item.querySelector("#photoauto").src = data.photo;
  item.querySelector("#insertphoto").addEventListener("click", (event) => {
    const divmoy = event.target.closest(".photo");
    putreqserimg(`/adminpage/dump/changephoto`,
      data.Marka,
      data.Nomer,
      divmoy.querySelector("#plainserturl").value);
  })
  item.querySelector("#btndeloneclick").addEventListener("click", (event) => {
    deloneclickreqserv(`/adminpage/delauto`,
      data.Marka,
      data.Nomer);
  })
  list.append(item);
}
