// Atributos `sizes` de las imagenes de un post del blog. Fuente unica para el layout
// (BlogPost.svelte, portada) y los plugins rehype (scripts/rehype-blog-images.mjs y
// scripts/rehype-image-gallery.mjs, cuerpo). Es JS plano porque los plugins corren en
// svelte.config.js, fuera de Vite.
//
// Valores MEDIDOS, no estimados: ancho renderizado real en 360 a 1920px (2026-09-23). Si
// cambia el layout del post (padding, sidebar, ancho maximo), estos numeros quedan viejos y
// tests/blog-image-sizes.spec.ts falla. Remedir y actualizar aca, nunca ampliar la tolerancia.
//
// Columna de texto (.prose), que es tambien el ancho de la portada:
//   < 768px     100vw - 40px   (padding lateral)
//   768-1023    100vw - 128px  (padding mayor)
//   1024-1279   100vw - 658px  (aparece el sidebar)
//   >= 1280     622px          (ancho maximo)
export const PROSE_SIZES =
	'(min-width: 1280px) 622px, (min-width: 1024px) calc(100vw - 658px), (min-width: 768px) calc(100vw - 128px), calc(100vw - 40px)';

// Item de galeria (.img-gallery > figure): min(82% de la columna, 440px).
export const GALLERY_SIZES =
	'(min-width: 1197px) 440px, (min-width: 1024px) calc(82vw - 540px), (min-width: 577px) 440px, calc(82vw - 33px)';
