# SPRINTS — Página do Puzzle KayMel

> **Objetivo da branch `feat/puzzle`:** terminar a página inicial do álbum de fotos, onde a Melissa resolve o puzzle do "cai mel" (KayMel → cai mel → cair mel). Ao resolver, o mel cai, há uma celebração e a tela transiciona gradualmente para o placeholder do álbum (o álbum em si é a próxima branch).

## Workflow

1. Cada sprint é implementada e validada no `npm run dev` antes de qualquer commit.
2. O usuário valida o resultado e confirma o commit manualmente.
3. Só então seguimos para a sprint seguinte.

## Sprint 0 — Estabilizar refactor + dívidas

- Corrigir `scene/decoration.tsx` (mapa de animações sem `float`/`breathe`) e `scene/title.tsx` (import quebrado).
- Mover `_components/animated-decoration.tsx` → `scene/` e unificar o tipo `Animation` (uma única definição em `types.ts`).
- Usar as constantes `HONEY_POT_SIZE` e `TITLE`/`TITLE_HIGHLIGHT` (sem valores hardcoded).

**Validar:** cena atual intacta no dev; `npx tsc --noEmit`, `npm run lint` e `npm run build` limpos.

**Commit:** `refactor(puzzle): estabiliza migração _components -> scene`

---

## Sprint 1 — Mecânica do puzzle (lógica + feedback de erro)

- `_data/scene.ts`: 5 abelhas com `letter: "M" | "E" | "L" | null` (2 iscas), `correctSequence: ["M", "E", "L"]` e reposicionamento para não sobrepor.
- `types.ts` + `reducer/puzzle-reducer.ts`: `collectedLetters`, `wrongBeeId`, action `RESET_SEQUENCE`. Reducer decide: isca → shake; letra fora de ordem → shake + reset; letra certa → guarda a letra.
- `page.tsx`: cliques → reducer (remove `console.log`).
- `scene/bee.tsx`: animação de shake retrigável e abelhas não clicáveis durante animações.
- `scene/title.tsx`: letras coletadas do "Mel" acendem (progresso visível no título).

**Validar:** abelha certa acende a letra; isca/fora de ordem balança (fora de ordem reseta a sequência).

**Commit:** `feat(puzzle): mecânica de sequência M-E-L com feedback de erro`

---

## Sprint 2 — Voo da abelha + pote enchendo

- `scene/bee.tsx`: voo com curva até o pote quando a letra é correta.
- `scene/honey-pot.tsx`: nível de mel sobe a cada gota (3 níveis).

**Validar:** abelha certa voa até o pote, despeja a gota, pote enche; loop completo jogável.

**Commit:** `feat(puzzle): voo das abelhas e nível de mel no pote`

---

## Sprint 3 — "Cai mel" + celebração

- `scene/honey-pot.tsx`: na 3ª gota o pote vira/entorna.
- Novo `scene/honey-rain.tsx`: jorro de mel caindo + corações.

**Validar:** resolver o puzzle → pote vira, mel cai, celebração.

**Commit:** `feat(puzzle): pote entorna, mel cai e celebração`

---

## Sprint 4 — Transição para o álbum + finalização

- Novo `scene/album-placeholder.tsx` + sequência de stages até `completed`.
- Responsivo (clamp/vw, decor oculta em telas pequenas), `aria-label` por abelha e `prefers-reduced-motion`.
- README: melhoria futura registrada (o "Mel" do título escorrerá junto quando o mel cair).

**Validar:** vitória → transição gradual para o placeholder; mobile ok; `tsc`, `lint`, `prettier`, `build` limpos.

**Commit:** `feat(puzzle): transição para o álbum e finalização da página`

---

## Polimento final (antes de entregar a branch)

- Voo não-linear da abelha ao acertar: piruetas (rotação/espiral no meio do caminho) + rastro tracejado (dashed) marcando o trajeto até o pote.

---

## Melhorias futuras (fora desta branch)

- O "Mel" do título escorrendo junto quando o mel cai.
- Conteúdo real do álbum de fotos (livro).
