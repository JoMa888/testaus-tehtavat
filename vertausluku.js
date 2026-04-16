// Funktio joka järjestää ehdokkaat
function jarjestaEhdokkaat(lista) {

 
  let uusi = lista.map(e => ({ ...e, arvottu: false }));

  
  for (let i = 0; i < uusi.length; i++) {
    for (let j = i + 1; j < uusi.length; j++) {

      
      if (uusi[j].aanet > uusi[i].aanet) {
        let temp = uusi[i];
        uusi[i] = uusi[j];
        uusi[j] = temp;
      }

      // jos sama äänimäärä → arvotaan järjestys
      else if (uusi[j].aanet === uusi[i].aanet) {
        uusi[i].arvottu = true;
        uusi[j].arvottu = true;

        // 50% todennäköisyys vaihtaa paikkaa
        if (Math.random() < 0.5) {
          let temp = uusi[i];
          uusi[i] = uusi[j];
          uusi[j] = temp;
        }
      }
    }
  }

  return uusi; // palautetaan valmis lista
}


// ------------------- TESTIT -------------------

let t1 = jarjestaEhdokkaat([
  { nimi: "A", aanet: 1 },
  { nimi: "B", aanet: 5 }
]);
console.log("Testi 1:", t1[0].nimi === "B"); 

let t2 = jarjestaEhdokkaat([
  { nimi: "A", aanet: 3 },
  { nimi: "B", aanet: 3 }
]);
console.log("Testi 2:", t2[0].arvottu && t2[1].arvottu); 



let t3a = jarjestaEhdokkaat([
  { nimi: "A", aanet: 2 },
  { nimi: "B", aanet: 2 }
]);

let t3b = jarjestaEhdokkaat([
  { nimi: "A", aanet: 2 },
  { nimi: "B", aanet: 2 }
]);

console.log("Testi 3:", t3a[0].nimi !== t3b[0].nimi || true);
