# Tour do apartamento — frente-mar

Página estática. A rolagem controla o "caminhar" pelo imóvel: os quadros em
`frames/` foram extraídos de um vídeo de visita (`VID_20260903`).

## Estrutura
```
index.html   página + viewer (CSS/JS embutidos)
frames/      f_0001..f_0244.webp — quadros do percurso
poster.webp  imagem de carregamento / preview de link
```

## Ajustes — bloco CONFIG no <script> do index.html
- `WHATSAPP` — número do anunciante, só dígitos (DDI+DDD+número).
- `WA_TEXT`  — mensagem que já abre na conversa.
- `CHAPTERS` — nome, descrição e quadro inicial (`start`) de cada ambiente.
  **Confira os nomes contra a planta real.**

## Publicação
A pasta inteira vai para o GitHub Pages. `git push` republica na mesma URL em ~1 min.
