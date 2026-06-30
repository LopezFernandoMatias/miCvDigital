import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        modelos: resolve(__dirname, 'modelos.html'),
        porfolio1: resolve(__dirname, 'porfolios/porfolio1/index.html'),
        porfolio2: resolve(__dirname, 'porfolios/porfolio2/index.html'),
        porfolio3: resolve(__dirname, 'porfolios/porfolio3/index.html'),
        porfolio4: resolve(__dirname, 'porfolios/porfolio4/index.html'),
        porfolio5: resolve(__dirname, 'porfolios/porfolio5/index.html'),
        porfolio6: resolve(__dirname, 'porfolios/porfolio6/index.html'),
        porfolio7: resolve(__dirname, 'porfolios/porfolio7/index.html'),
        porfolio8: resolve(__dirname, 'porfolios/porfolio8/index.html'),
        porfolio9: resolve(__dirname, 'porfolios/porfolio9/index.html'),
        porfolio10: resolve(__dirname, 'porfolios/porfolio10/index.html'),
        porfolio11: resolve(__dirname, 'porfolios/porfolio11/index.html'),
        porfolio12: resolve(__dirname, 'porfolios/porfolio12/index.html'),
        porfolio13: resolve(__dirname, 'porfolios/porfolio13/index.html'),
        porfolio14: resolve(__dirname, 'porfolios/porfolio14/index.html'),
        porfolio15: resolve(__dirname, 'porfolios/porfolio15/index.html'),
        porfolio16: resolve(__dirname, 'porfolios/porfolio16/index.html'),
        porfolio17: resolve(__dirname, 'porfolios/porfolio17/index.html'),
        porfolio18: resolve(__dirname, 'porfolios/porfolio18/index.html'),
        porfolio19: resolve(__dirname, 'porfolios/porfolio19/index.html'),
        porfolio20: resolve(__dirname, 'porfolios/porfolio20/index.html'),
        porfolio21: resolve(__dirname, 'porfolios/porfolio21/index.html'),
        porfolio22: resolve(__dirname, 'porfolios/porfolio22/index.html'),
        porfolio23: resolve(__dirname, 'porfolios/porfolio23/index.html'),
        porfolio24: resolve(__dirname, 'porfolios/porfolio24/index.html'),
      },
    },
  },
});