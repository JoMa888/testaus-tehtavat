
function laskeVertausluvut(ehdokkaat) {
  if (!Array.isArray(ehdokkaat) || ehdokkaat.length === 0) {
    return [];
  }

  const jarjestetyt = [...ehdokkaat].sort((a, b) => b.aanet - a.aanet);

  const aanetYhteensa = jarjestetyt.reduce((sum, e) => sum + e.aanet, 0);

  return jarjestetyt.map((ehdokas, index) => ({
    ...ehdokas,
    vertausluku: aanetYhteensa / (index + 1)
  }));
}

export default laskeVertausluvut;
export { laskeVertausluvut };