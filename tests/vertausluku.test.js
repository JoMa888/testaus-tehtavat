import laskeVertausluvut from "../vertausluku.js";
import ehdokasRekisteri from "../ehdokasRekisteri.js";

import { describe, it, mock, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";

describe("laskeVertausluvut", () => {

  beforeEach(() => {
    mock.method(ehdokasRekisteri, "haeLista", () => {
      return [
        { numero: 101, nimi: "Maija Meikäläinen", aanet: 1 },
        { numero: 102, nimi: "Kalle Korhonen", aanet: 4 },
        { numero: 103, nimi: "Sari Virtanen", aanet: 2 },
        { numero: 104, nimi: "Jukka Jokinen", aanet: 5 }
      ];
    });
  });

  afterEach(() => {
    mock.reset();
  });

  it("listan eniten ääniä saaneen ehdokkaan vertausluku on listan äänten summa", () => {
    const tulos = laskeVertausluvut(ehdokasRekisteri.haeLista(1));
    assert.equal(tulos[0].vertausluku, 12);
  });

  it("listan toiseksi eniten ääniä saaneen ehdokkaan vertausluku on puolet listan äänien summasta", () => {
    const tulos = laskeVertausluvut(ehdokasRekisteri.haeLista(1));
    assert.equal(tulos[1].vertausluku, 6);
  });
});
