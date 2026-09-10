# Tour navegável — apartamento frente-mar

Página estática (Three.js + WebGL). Estilo Street View: **arraste para olhar em
volta com profundidade** e **toque nas laterais / use as setas / o índice para
caminhar** entre os ambientes.

Feita a partir de um vídeo de visita (um passe de câmera). A profundidade de
cada parada foi estimada com **Depth Anything V2** rodando localmente; a
visualização usa Three.js carregado da CDN (cdnjs).

## Estrutura

```
index.html      página + viewer (CSS/JS embutidos)
nodes/          n01..n11.webp  — foto de cada ambiente (textura)
depth/          n01..n11.png   — mapa de profundidade de cada ambiente
seq/            f_0001..f_0244.webp — frames do vídeo (a "caminhada" entre paradas)
poster.webp     imagem de carregamento / preview de link
```

## Ajustes (bloco `CONFIG` no `<script>` do index.html)

- `WHATSAPP` — número do anunciante, só dígitos (DDI+DDD+número).
- `WA_TEXT` — mensagem que já abre na conversa.
- `NODES` — nome, descrição e `seq` (frame de referência) de cada ambiente.
  **Confira os nomes contra a planta real.**

## Publicação

Toda a pasta vai para o GitHub Pages. Ao dar `git push`, o Pages republica na
mesma URL em ~1 min.

> Este projeto **substituiu** o tour anterior (apartamento de 2 quartos) no mesmo
> repositório, conforme combinado.
