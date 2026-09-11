# Apartamento frente-mar — tour + maquete 3D

Duas peças estáticas, publicadas juntas no GitHub Pages e instaláveis como app (PWA).

| | O que é | Onde |
|---|---|---|
| **Tour guiado** | A rolagem da página controla o "caminhar" pelo imóvel, com índice de ambientes e CTA de WhatsApp. | `/` |
| **Maquete 3D** | Apartamento inteiro em 3D, ambiente único e sem cortes: você anda pelos cômodos passando pelas portas. | `/maquete/` |

## Estrutura

```
index.html              tour guiado (CSS/JS embutidos)
sheets/                 quadros do tour empacotados em folhas 4x3
                        sm_*  celular (468px)    sd_*  desktop (712px)
                        cada folha em .avif com .webp de reserva
poster.webp             imagem de carregamento / preview de link
maquete/index.html      maquete 3D navegável (Three.js via CDN)
manifest.webmanifest    PWA: nome, ícones, atalhos
sw.js                   service worker: abre offline e instantâneo na 2ª visita
icons/                  ícones do app (mini-planta do próprio apê)
```

## Desempenho

Os quadros do tour saíram de **513 arquivos soltos / 11,5 MB** para **43 folhas**
em dois níveis, servidas em AVIF. O celular baixa o nível menor. O service worker
grava tudo no aparelho, então da segunda abertura em diante é instantâneo e
funciona sem internet.

Na maquete 3D: iluminação reduzida de 15 luzes para 3, texturas de 63 para 6
(o UV é escalado na geometria em vez de clonar a textura por parede) e, no
celular, pixel ratio limitado a 1,5 com antialias desligado.

## Ajustes

**Tour** — bloco `CONFIG` no `<script>` do `index.html`:
- `WHATSAPP` — número do anunciante, só dígitos (DDI+DDD+número).
- `WA_TEXT` — mensagem que já abre na conversa.
- `CHAPTERS` — nome, descrição e quadro inicial (`start`) de cada ambiente.

**Maquete 3D** — bloco `PLAN` no `<script>` do `maquete/index.html`:
- `ROOMS` — cada cômodo é um retângulo em metros (`x0,z0,x1,z1`).
- `WALLS` — paredes como segmentos, com os vãos (portas, janelas, passagens).

A planta atual foi **estimada a partir do vídeo**. Com a planta real em mãos,
basta corrigir os números — paredes, portas e colisão se reajustam sozinhas.

Para publicar uma versão nova dos arquivos em cache, troque `VERSION` no `sw.js`.
