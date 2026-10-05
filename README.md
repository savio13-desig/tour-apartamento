# Maquete 3D — apartamento 77 m²

Maquete 3D navegavel **e editavel**, ambiente unico e sem cortes: terraco
gourmet, cozinha, area de servico, sala (estar e jantar), circulacao,
dormitorio, suite e os dois banheiros, ligados por portas reais. Pagina
estatica (Three.js via CDN), instalavel como app (PWA) e funcionando offline
depois da primeira visita.

## Dois modos

- **Passear** — primeira pessoa, pelas portas. WASD/setas e mouse no
  computador; joystick e arraste de tela no celular.
- **Maquete** — vista de cima com as paredes cortadas na altura do peito.
  Um dedo gira, dois dedos movem e dao zoom (no computador: arrastar gira,
  botao direito move, roda da zoom). A transicao entre os modos e animada.

## Mudar o ambiente

Na vista de maquete:

- **Mover** — toque num movel e arraste. A posicao so e aceita se o movel
  continuar dentro dos comodos, fora das paredes e sem atravessar a marcenaria
  fixa ou outro movel; se nao der, ele desliza pelo eixo livre e o contorno
  fica vermelho.
- **Girar** (quartos de volta), **remover** e **adicionar** pecas do catalogo
  (poltrona, mesa de centro, puff, planta, estante, luminaria). O que sai pode
  voltar pela aba *Moveis*.
- **Passear aqui** — toque num ponto do chao para entrar no passeio ali.

No painel **Personalizar**:

- **Estilos** — cinco combinacoes prontas (Original, Moderno claro,
  Aconchegante, Urbano escuro, Natural).
- **Acabamentos** — piso, paredes, marcenaria (e painel ripado), bancadas, cor
  de destaque, tecidos e tapete, cada um com suas opcoes.
- **Luz** — dia, fim de tarde e noite (muda ceu, reflexo e sancas).
- **Compartilhar / WhatsApp** — a versao montada vira um link (`#m=...`) com
  acabamentos e posicao dos moveis; quem abre ve a mesma configuracao.
  O estado tambem fica salvo no aparelho. **Restaurar original** volta tudo.

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
apartamento pronto e dos renders da incorporadora. O estilo *Original* e
exatamente esse visual.

O tour por rolagem (fotos do video) foi aposentado — continua recuperavel no
historico do Git, commit `821722e`.

## Estrutura

```
index.html              maquete 3D (CSS/JS embutidos, ~110 KB)
manifest.webmanifest    PWA: nome, icones
sw.js                   service worker (cache do shell + CDN)
icons/                  icones do app
```

## Ajustes — bloco `PLAN` no `<script>` do index.html

- `ROOMS` — cada comodo e um retangulo em metros (`x0,z0,x1,z1`).
- `WALLS` — paredes como segmentos, com os vaos (portas, janelas, passagens).
- `BOUNDS` — envelope do apartamento.
- `buildFixtures()` — o que e `mover(...)` e movel editavel; o resto e
  marcenaria fixa. Cada `mover` mede a propria caixa e guarda os colisores.
- `CATALOGO` — pecas que o usuario pode acrescentar.
- `OPC`, `LUZ`, `ESTILOS` — opcoes de acabamento, periodos do dia e estilos.
- `WHATSAPP` / `WA_TEXT` — contato do anunciante.

Eixos: **X cresce para leste, Z cresce para o sul**; o mar fica a oeste
(X negativo), na frente do terraco.

## Desempenho

**38 draw calls** e ~3.200 triangulos no passeio (29 draw calls na maquete),
12 texturas, ~110 KB de pagina (fora o Three.js, que vem da CDN e fica em
cache). No celular o antialias fica desligado e o pixel ratio parte de 1,25.

Decisoes que seguram esse numero:

- **Fusao por material.** Pisos, paredes e marcenaria fixa sao fundidos por
  material no fim da construcao (`fundirEntradas`): ~250 objetos viram ~30
  malhas. O UV de cada peca ja foi assado na geometria pelo `scaleUV`, e
  cada teto mantem seu proprio 0..1, entao a sanca continua certa.
- **Moveis editaveis em camada propria.** Cada movel guarda as pecas
  relativas ao proprio centro. A camada fundida dos moveis e refeita so quando
  algo muda (selecionar, soltar, girar, adicionar, remover) e custa ~0,6 ms.
  Durante o arraste, so o movel selecionado e desenhado "vivo", sem refazer
  nada por quadro.
- **Acabamento sem malha nova.** Cada categoria troca propriedades de UM
  material compartilhado (mapa, cor, rugosidade); como a geometria ja esta
  fundida por material, trocar o piso nao custa nada. As texturas alternativas
  nascem sob demanda, 256 px.
- **Paredes em duas versoes.** Cada trecho nasce inteiro (passeio) e cortado
  (maquete), em grupos que se alternam por visibilidade.
- **Render sob demanda.** O quadro so e desenhado quando algo mudou (camera,
  movel, acabamento, animacao). Parado, a GPU descansa: menos bateria e menos
  aquecimento.
- **Resolucao adaptativa.** Se a media dos quadros passa de ~22 ms o pixel
  ratio desce (minimo 0,70 no celular); com folga, sobe de volta devagar.
- **Sem `backdrop-filter` no celular.** Desfoque de CSS sobre um canvas WebGL
  em movimento e caro; so telas de mouse recebem o efeito.
- **Fora do apartamento quase nao ha geometria.** O ceu e um gradiente em
  `scene.background` e sobraram dois planos (mar e chao) com
  `MeshBasicMaterial`. Na maquete eles somem.
- **Iluminacao sem sombra calculada.** O aspecto de render vem do
  `MeshStandardMaterial` com mapa de ambiente de um ceu procedural (IBL) mais
  tres luzes. As sombras sob os moveis sao manchas de contato e a sanca de LED
  e um mapa emissivo no teto.

## Colisao

Raio do jogador 0,24 m. As paredes entram como segmentos e os moveis como
caixas (recalculadas quando um movel muda de lugar ou gira). A ponta de cada
segmento e tratada como calota de raio `R + WALL/2`, o que fazia o canto do
vao estufar para dentro da porta e prender quem passava fora do eixo — por
isso cada trecho cheio de parede e recuado meia espessura em toda ponta que
encosta num vao. As portas internas tem 0,92 m.

Para mover moveis, a validacao usa os mesmos colisores mais pontos amostrados
ao longo das paredes (a cada 10 cm). Todos os moveis de fabrica comecam em
posicao valida; um link adulterado ou antigo nao quebra nada — o que nao cabe
volta ao lugar de origem ou some.

Ha um teste de caminhada automatica no historico das sessoes: ele percorre
todos os ambientes em linha reta entre pontos e acusa onde trava. Foi ele
que revelou que a mesa de jantar fechava a passagem entre cozinha e estar e
que o armario da suite ficava em frente a propria porta.

Para publicar versao nova dos arquivos em cache, troque `VERSION` no `sw.js`.
