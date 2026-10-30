# Timeless v8 — Investor Grade Demo (October 2026)

Demo statica allineata al Business Plan Investor Grade Execution Oct2026 v2.

## Deploy su GitHub + Vercel
1. Scaricare e decomprimere lo ZIP.
2. Nel repository GitHub sostituire `index.html`, `README.md` e i tre PNG nella root.
3. **Importante**: rimuovere dal repository `package.json`, `vite.config.js`, `src/` e `public/` se si vuole il deploy statico senza npm. Non basta caricare i file: il package.json esistente potrebbe far partire Vite.
4. In Vercel: Framework Preset = Other; Build Command vuoto; Output Directory vuoto o `.`; Root Directory root.
5. Commit su main e verificare deployment Ready.

## Contenuti
- Home university beachhead, ricerca e filtri skill
- Theta 1 minuto = €0,50 riferimento, 60 Θ = €30
- Fee standard 8%, premium 12%, fiat 15%
- Booking interattivo con durata, slot, modalità e fee
- Chat abilitata dopo booking, review, stato prenotazione
- Wallet e Trust Score dimostrativi

## Limitazioni
**Demo soltanto.** Nessuna autenticazione, persistenza, pagamento, escrow, AI, verifica identità o invio messaggi reali. I profili, i dati reputazionali e i saldi sono fittizi. Le fee vengono mostrate a carico del learner come scelta di visualizzazione della demo; la ripartizione effettiva tra le parti resta da specificare nel modello operativo.

Per il vero MVP: backend, database, autenticazione, sicurezza e conformità normativa.
