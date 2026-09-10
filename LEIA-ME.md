# Tour interativo do apartamento

Página HTML autônoma. A rolagem da página controla o "caminhar" pelo imóvel
(as imagens são frames do vídeo `WhatsApp Video 2026-09-10 at 10.27.43.mp4`).

## Como usar / publicar

- **Testar no PC:** abra um servidor local nesta pasta e acesse `index.html`
  (abrir o arquivo direto com `file://` funciona, mas hospedado é mais fiel).
- **Publicar:** suba a pasta `tour/` inteira para a hospedagem (Hostinger etc.).
  Mantenha `index.html` + a pasta `frames/` + `poster.webp` **juntos**.
- **Mandar por WhatsApp:** mande o link da página publicada (não dá pra enviar a
  pasta). O `tour.zip` (na pasta de cima) serve só para mover os arquivos.

## Ajustes (abra `index.html`, bloco "CONFIG" no `<script>`)

| O quê | Onde | Observação |
|---|---|---|
| Número do WhatsApp | `WHATSAPP` | DDI+DDD+número, só dígitos. Ex.: `"5579998887766"` |
| Mensagem pré-preenchida | `WA_TEXT` | texto que já abre na conversa |
| Nomes / descrições dos ambientes | `CHAPTERS` | **confira contra a planta real** — os nomes e os pontos de cada cômodo foram deduzidos do vídeo |

Cada item de `CHAPTERS` tem `start` (número do primeiro frame do trecho, de 1 a
344), `name` e `desc`. Para mover onde um ambiente começa, mude só o `start`.

## Trocar o vídeo

Se o vídeo mudar, é preciso re-extrair os frames (mesma quantidade e nome:
`frames/f_0001.webp` … `f_0344.webp`) ou me avisar para gerar de novo.
