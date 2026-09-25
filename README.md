# Maquete 3D — apartamento 77 m²

Maquete 3D navegavel, ambiente unico e sem cortes: terraco gourmet, cozinha,
area de servico, sala (estar e jantar), circulacao, dormitorio, suite e os dois
banheiros, ligados por portas reais. Pagina estatica (Three.js via CDN),
instalavel como app (PWA) e funcionando offline depois da primeira visita.

## De onde vem a geometria

A planta foi levantada da **planta oficial do empreendimento** (Final 6 — 77 m²,
2 dormitorios sendo 1 suite, 2 vagas). A imagem da planta foi medida pixel a
pixel e a escala calibrada pelas metragens impressas:

| Ambiente          | Planta   | Maquete |
|-------------------|----------|---------|
| Terraco gourmet   | 14,16 m² | 13,9 m² |
| Sala              | 14,90 m² | 14,5 m² |
| Suite             | 10,40 m² | 10,1 m² |
| Dormitorio        |  9,80 m² |  9,5 m² |
| Cozinha           |  9,18 m² |  8,5 m² |
| Banhos (cada)     |  3,00 m² |  3,3 m² |
| Area de servico   |  2,80 m² |  2,3 m² |

Escala aferida: **2,23 cm por pixel** da planta. Os acabamentos (porcelanato
bege, marcenaria de madeira clara com detalhes em verde, bancadas em granito
preto, painel ripado, churrasqueira em tijolinho) saem das fotos do
apartamento pronto e dos renders da incorporadora.

O tour por rolagem (fotos do video) foi aposentado — continua recuperavel no
historico do Git, commit `821722e`.

## Estrutura

```
index.html              maquete 3D (CSS/JS embutidos, ~50 KB)
manifest.webmanifest    PWA: nome, icones
sw.js                   service worker (cache do shell + CDN)
icons/                  icones do app
```

## Ajustes — bloco `PLAN` no `<script>` do index.html

- `ROOMS` — cada comodo e um retangulo em metros (`x0,z0,x1,z1`).
- `WALLS` — paredes como segmentos, com os vaos (portas, janelas, passagens).
- `BOUNDS` — envelope do apartamento.
- `WHATSAPP` / `WA_TEXT` — contato do anunciante.

Eixos: **X cresce para leste, Z cresce para o sul**; o mar fica a oeste
(X negativo), na frente do terraco.

## Desempenho

3 luzes + mapa de ambiente (IBL), 11 texturas procedurais, ~2.800 triangulos,
~110 draw calls no pior angulo, 6 programas de shader. No celular o pixel ratio
e limitado a 1,4 com antialias desligado. A pagina inteira tem ~55 KB (fora o
Three.js, que vem da CDN e fica em cache).

O aspecto de render vem do `MeshStandardMaterial` com mapa de ambiente gerado
de um ceu procedural — nao ha nenhuma luz extra, nem sombra calculada. As
sombras sob os moveis sao manchas de contato (um plano com gradiente) e a
sanca de LED e um mapa emissivo no teto: custo proximo de zero.

Para publicar versao nova dos arquivos em cache, troque `VERSION` no `sw.js`.
