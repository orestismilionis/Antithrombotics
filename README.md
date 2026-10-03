# Antithrombotic timing — ESAIC/ESRA

Bedside reference for interruption and resumption intervals of anticoagulants and antiplatelet agents.

- **Regional anaesthesia** tab: ESAIC/ESRA 2022 joint guideline (Tables 3 and 4) — neuraxial/deep vs superficial blocks, with renal adjustments.
- **Surgical interruption** tab: ESAIC 2023 severe peri-operative bleeding guideline (Recommendation 2) — low vs intermediate/high bleeding-risk procedures.
- **Other meds** tab: beta-blockers, RAAS inhibitors, diuretics, statins, all antidiabetic classes (SGLT2i, GLP-1 RA, metformin, insulin…), steroids, thyroid, antiepileptics, Parkinson's, psychotropics, opioids, inhalers, immunosuppressants, herbal — ESC 2022, DGAI/DGCH/DGIM 2024, ESAIC 2018. Rows marked *verify* are not covered by these guidelines and reflect consensus practice.
- **Planner** tab: enter drug(s), CrCl and procedure date/time → last-dose deadline and earliest resumption.
- **Dose definitions** tab: low/high DOAC dose categorisation (Table 1, 2022).

Everything is in one file, `index.html`. No build step, no dependencies, works offline.

## Publish on GitHub Pages (once)

1. Create a new repository on github.com (e.g. `antithrombotic-timing`), public.
2. Upload `index.html` and this `README.md` ("Add file → Upload files").
3. Repository **Settings → Pages → Build and deployment**: Source = *Deploy from a branch*, Branch = `main`, folder `/ (root)`. Save.
4. After about a minute the app is live at `https://<your-username>.github.io/antithrombotic-timing/`.

Add the page to your phone's home screen for quick access.

## Update the intervals (any time)

1. Open `index.html` on github.com and click the pencil (Edit).
2. Edit only the `DATA` block near the top of the `<script>` section. Each drug has `before`, `lab`, `after`, optional `renal` (`mod` = CrCl 30–50, `severe` = CrCl < 30), `grade` and `notes`.
3. Change `version` to today's date so the footer shows when the data was last checked.
4. "Commit changes". GitHub Pages redeploys automatically.

## Sources

- Kietaibl S, et al. Regional anaesthesia in patients on antithrombotic drugs: Joint ESAIC/ESRA guidelines. *Eur J Anaesthesiol* 2022;39:100–132.
- Kietaibl S, et al. Management of severe peri-operative bleeding: Guidelines from the ESAIC, second update 2022. *Eur J Anaesthesiol* 2023;40:226–304.

Decision support only — verify against the current guideline text and local protocol.

## Install on your phone (PWA)

The repository also contains `manifest.json`, `sw.js` and the icons, which make the page installable and usable offline.

- **iPhone (Safari):** open the GitHub Pages link → Share → *Add to Home Screen* → Add.
- **Android (Chrome):** open the link → menu (⋮) → *Add to Home screen* / *Install app*.

Updates are automatic: every time the app is opened with internet it checks GitHub and, if a newer version exists, shows “Updating…” and reloads itself. You never need to edit `sw.js`.
