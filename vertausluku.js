const test = require("node:test");
const assert = require("node:assert/strict");

function checkPassword(password) {
  return (
    password.length >= 10 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /\d/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  );
}

function jarjestaEhdokkaat(lista, randomFn = Math.random) {
  const tulos = [...lista].sort((a, b) => b.aanet - a.aanet).map((e) => ({ ...e }));

  for (let i = 0; i < tulos.length - 1; i++) {
    if (tulos[i].aanet === tulos[i + 1].aanet) {
      tulos[i].arvottu = true;
      tulos[i + 1].arvottu = true;
      if (randomFn() < 0.5) [tulos[i], tulos[i + 1]] = [tulos[i + 1], tulos[i]];
    }
  }

  return tulos;
}

test("salasana hyväksytään kun kaikki ehdot täyttyvät", () => {
  assert.equal(checkPassword("Salasana1!"), true);
});

test("salasana hylätään jos jokin ehto puuttuu", () => {
  assert.equal(checkPassword("Sana1!Aa"), false);
  assert.equal(checkPassword("pelkkapieni1!"), false);
  assert.equal(checkPassword("PELKKAISO1!"), false);
  assert.equal(checkPassword("EiNumeroita!"), false);
  assert.equal(checkPassword("EiErikoista1"), false);
});

test("enemmän ääniä saanut tulee ensin", () => {
  const tulos = jarjestaEhdokkaat([
    { nimi: "A", aanet: 5 },
    { nimi: "B", aanet: 2 },
    { nimi: "C", aanet: 1 },
  ]);

  assert.equal(tulos[0].nimi, "A");
  assert.equal(tulos.every((e) => !e.arvottu), true);
});

test("tasatulos arvotaan ja merkitään arvotuksi", () => {
  const eka = jarjestaEhdokkaat(
    [
      { numero: 103, nimi: "Sari Virtanen", aanet: 2 },
      { numero: 104, nimi: "Jukka Jokinen", aanet: 2 },
    ],
    () => 0
  );

  const toka = jarjestaEhdokkaat(
    [
      { numero: 103, nimi: "Sari Virtanen", aanet: 2 },
      { numero: 104, nimi: "Jukka Jokinen", aanet: 2 },
    ],
    () => 0.9
  );

  assert.equal(eka[0].arvottu, true);
  assert.equal(eka[1].arvottu, true);
  assert.notEqual(eka[0].nimi, toka[0].nimi);
});
