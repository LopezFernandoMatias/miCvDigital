import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  // Solo si publio en GitHub Pages.
  // Si usas Netlify, Vercel o un hosting propio, elimina esta línea.
  //base: "/paginaCVDigitales/",

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),

        modelos: resolve(__dirname, "modelos.html"),

        porfolio1: resolve(__dirname, "porfolios/porfolio1/index.html"),
        porfolio2: resolve(__dirname, "porfolios/porfolio2/index.html"),
        porfolio2Confirmar: resolve(__dirname, "porfolios/porfolio2/confirmar/index.html"),
        porfolio3: resolve(__dirname, "porfolios/porfolio3/index.html"),
        porfolio3Confirmar: resolve(__dirname, "porfolios/porfolio3/confirmar/index.html"),
        porfolio4: resolve(__dirname, "porfolios/porfolio4/index.html"),
        porfolio4Confirmar: resolve(__dirname, "porfolios/porfolio4/confirmar/index.html"),
        porfolio5: resolve(__dirname, "porfolios/porfolio5/index.html"),
        porfolio5Confirmar: resolve(__dirname, "porfolios/porfolio5/confirmar/index.html"),
        porfolio6: resolve(__dirname, "porfolios/porfolio6/index.html"),
        porfolio6Confirmar: resolve(__dirname, "porfolios/porfolio6/confirmar/index.html"),
        porfolio7: resolve(__dirname, "porfolios/porfolio7/index.html"),
        porfolio7Confirmar: resolve(__dirname, "porfolios/porfolio7/confirmar/index.html"),
        porfolio8: resolve(__dirname, "porfolios/porfolio8/index.html"),
        porfolio8Confirmar: resolve(__dirname, "porfolios/porfolio8/confirmar/index.html"),
        porfolio9: resolve(__dirname, "porfolios/porfolio9/index.html"),
        porfolio9Confirmar: resolve(__dirname, "porfolios/porfolio9/confirmar/index.html"),
        porfolio10: resolve(__dirname, "porfolios/porfolio10/index.html"),
        porfolio10Confirmar: resolve(__dirname, "porfolios/porfolio10/confirmar/index.html"),
        porfolio11: resolve(__dirname, "porfolios/porfolio11/index.html"),
        porfolio11Confirmar: resolve(__dirname, "porfolios/porfolio11/confirmar/index.html"),
        porfolio12: resolve(__dirname, "porfolios/porfolio12/index.html"),
        porfolio12Confirmar: resolve(__dirname, "porfolios/porfolio12/confirmar/index.html"),
        porfolio13: resolve(__dirname, "porfolios/porfolio13/index.html"),
        porfolio13Confirmar: resolve(__dirname, "porfolios/porfolio13/confirmar/index.html"),
        porfolio14: resolve(__dirname, "porfolios/porfolio14/index.html"),
        porfolio14Confirmar: resolve(__dirname, "porfolios/porfolio14/confirmar/index.html"),
        porfolio15: resolve(__dirname, "porfolios/porfolio15/index.html"),
        porfolio15Confirmar: resolve(__dirname, "porfolios/porfolio15/confirmar/index.html"),
        porfolio16: resolve(__dirname, "porfolios/porfolio16/index.html"),
        porfolio16Confirmar: resolve(__dirname, "porfolios/porfolio16/confirmar/index.html"),
        porfolio17: resolve(__dirname, "porfolios/porfolio17/index.html"),
        porfolio17Confirmar: resolve(__dirname, "porfolios/porfolio17/confirmar/index.html"),
        porfolio18: resolve(__dirname, "porfolios/porfolio18/index.html"),
        porfolio18Confirmar: resolve(__dirname, "porfolios/porfolio18/confirmar/index.html"),
        porfolio19: resolve(__dirname, "porfolios/porfolio19/index.html"),
        porfolio19Confirmar: resolve(__dirname, "porfolios/porfolio19/confirmar/index.html"),
        porfolio20: resolve(__dirname, "porfolios/porfolio20/index.html"),
        porfolio20Confirmar: resolve(__dirname, "porfolios/porfolio20/confirmar/index.html"),
        porfolio21: resolve(__dirname, "porfolios/porfolio21/index.html"),
        porfolio21Confirmar: resolve(__dirname, "porfolios/porfolio21/confirmar/index.html"),
        porfolio22: resolve(__dirname, "porfolios/porfolio22/index.html"),
        porfolio22Confirmar: resolve(__dirname, "porfolios/porfolio22/confirmar/index.html"),
        porfolio23: resolve(__dirname, "porfolios/porfolio23/index.html"),
        porfolio23Confirmar: resolve(__dirname, "porfolios/porfolio23/confirmar/index.html"),
       /*rfolio24: resolve(__dirname, "porfolios/porfolio24/index.html"),
        porfolio24Confirmar: resolve(__dirname, "porfolios/porfolio24/confirmar/index.html"),*/
      },
    },
  },
});
/* eslint-disable no-undef */ /*
import { defineConfig } from "vite";
import { resolve } from "path";

const input = {
  main: resolve(__dirname, "index.html"),
  modelos: resolve(__dirname, "modelos.html"),
};

// Genera automáticamente porfolio1 ... porfolio24
for (let i = 1; i <= 24; i++) {
  input[`porfolio${i}`] = resolve(
    __dirname,
    `porfolios/porfolio${i}/index.html`,
  );
}

export default defineConfig({
  build: {
    rollupOptions: {
      input,
    },
  },
});
*/
