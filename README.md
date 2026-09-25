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

**31 draw calls** e ~3.100 triangulos no apartamento inteiro, 13 texturas
procedurais, 7 programas de shader. A pagina tem ~55 KB (fora o Three.js, que
vem da CDN e fica em cache). No celular o pixel ratio e limitado a 1,25 com
antialias desligado.

Tres decisoes seguram esse numero:

- **Fusao por material.** Nada na cena se mexe depois de montada, entao no fim
  da construcao (`fundirPorMaterial`) todas as malhas que dividem o mesmo
  material viram uma malha so. Sao ~250 objetos que viram 30. O UV de cada
  peca ja foi assado na geometria pelo `scaleUV`, e cada teto mantem seu
  proprio 0..1, entao a sanca continua desenhando certo em cada comodo.
- **Fora do apartamento quase nao ha geometria.** O ceu e um gradiente posto
  direto em `scene.background` (um quad de tela, zero malhas) e sobraram
  apenas dois planos, mar e chao, com `MeshBasicMaterial` — nao entram em
  conta de iluminacao. A versao anterior tinha domo de ceu, faixa de areia,
  46 quadras e 4 torres: nada disso aparecia por mais de dois segundos e
  tudo custava a cada quadro.
- **Iluminacao sem sombra calculada.** O aspecto de render vem do
  `MeshStandardMaterial` com mapa de ambiente gerado de um ceu procedural
  (IBL) mais tres luzes. As sombras sob os moveis sao manchas de contato (um
  plano com gradiente) e a sanca de LED e um mapa emissivo no teto.

## Colisao

Raio do jogador 0,24 m. As paredes entram como segmentos e os moveis como
caixas. A ponta de cada segmento e tratada como calota de raio `R + WALL/2`,
o que fazia o canto do vao estufar para dentro da porta e prender quem
passava fora do eixo — por isso cada trecho cheio de parede e recuado meia
espessura em toda ponta que encosta num vao. As portas internas tem 0,92 m.

Ha um teste de caminhada automatica no historico das sessoes: ele percorre
todos os ambientes em linha reta entre pontos e acusa onde trava. Foi ele
que revelou que a mesa de jantar fechava a passagem entre cozinha e estar e
que o armario da suite ficava em frente a propria porta.

Para publicar versao nova dos arquivos em cache, troque `VERSION` no `sw.js`.
