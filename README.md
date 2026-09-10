# Tour interativo do apartamento

Página estática. A rolagem da página controla o "caminhar" pelo imóvel — os
quadros em `frames/` foram extraídos de um vídeo de visita.

**Ver online:** publicado via GitHub Pages (link em *Settings → Pages* / na aba
"Deployments" do repositório).

## Estrutura

```
index.html      # a página do tour (todo o CSS/JS embutido)
frames/         # 344 quadros .webp (as "imagens" do percurso)
poster.webp     # imagem de carregamento / preview de link
LEIA-ME.md      # instruções detalhadas de ajuste
```

## Ajustes rápidos

Abra `index.html`, bloco `CONFIG` no `<script>`:

- `WHATSAPP` — número do cliente (DDI+DDD+número, só dígitos).
- `WA_TEXT` — mensagem que já abre na conversa.
- `CHAPTERS` — nome, descrição e quadro inicial de cada ambiente.

Detalhes completos em [`LEIA-ME.md`](LEIA-ME.md).
