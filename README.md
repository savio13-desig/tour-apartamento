# Maquete 3D — apartamento frente-mar

Maquete 3D navegavel, ambiente unico e sem cortes: varanda, sala, cozinha,
dormitorio, circulacao, suite, closet, banheiro social, suite 02 e banheiro da
suite, ligados por portas reais. Pagina estatica (Three.js via CDN), instalavel
como app (PWA) e funcionando offline depois da primeira visita.

O tour por rolagem (fotos do video) foi aposentado — continua recuperavel no
historico do Git, commit `821722e`.

## Estrutura

```
index.html              maquete 3D (CSS/JS embutidos, ~37 KB)
manifest.webmanifest    PWA: nome, icones
sw.js                   service worker (cache do shell + CDN)
icons/                  icones do app
```

## Ajustes — bloco `PLAN` no `<script>` do index.html

- `ROOMS` — cada comodo e um retangulo em metros (`x0,z0,x1,z1`).
- `WALLS` — paredes como segmentos, com os vaos (portas, janelas, passagens).
- `WHATSAPP` / `WA_TEXT` — contato do anunciante.

A planta atual foi **estimada a partir do video**. Com a planta real, basta
corrigir os numeros — paredes, portas e colisao se reajustam sozinhas.

## Desempenho

3 luzes, 6 texturas, ~420 triangulos, ~40 draw calls. No celular o pixel ratio
e limitado a 1,5 com antialias desligado. O site inteiro tem ~77 KB (fora o
Three.js, que vem da CDN e fica em cache).

Para publicar versao nova dos arquivos em cache, troque `VERSION` no `sw.js`.
