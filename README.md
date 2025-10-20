# Deniz Portfolio – Persönliche Website mit Angular

Dieses Repository enthält den Quellcode für die persönliche Portfolio-Webseite von Deniz, umgesetzt mit dem Angular-Framework. Die Anwendung zeigt übersichtlich und responsiv technische Fähigkeiten, Projekte, Lebenslauf-Daten und Kontaktinformationen. Die Codebasis ist modular strukturiert und verwendet globale SCSS-Variablen, damit Styles konsistent und leicht anpassbar sind.

## Funktionen

- Startseite mit Rollen-Animation: Die Landing-Page stellt Deniz mit rotierenden Rollen wie "Full‑Stack Developer", "Frontend Engineer" und "UI/UX Enthusiast" vor. Außerdem werden Kennzahlen (z. B. abgeschlossene Projekte, Jahre Erfahrung) angezeigt und ein Button zum Herunterladen des Lebenslaufs bzw. zur Navigation zu den Projekten bereitgestellt.
- Skills-Seite: Technische Skills (z. B. HTML, CSS/SCSS, JavaScript, TypeScript, Angular) und Soft-Skills (Kommunikation, Teamarbeit, Problemlösung, Kreativität) werden mit Prozentwerten dargestellt. Jedes Skill-Item zeigt eine Fortschrittsleiste und einen numerischen Prozentsatz.
- Projekte: Ausgewählte Projekte werden in einem responsiven Kartenraster gezeigt. Jede Karte enthält Titel, kurze Beschreibung, verwendete Technologien, Vorschaubild und optional einen Link.
- Lebenslauf & Kontakt: Separate Seiten ermöglichen das Lesen des Lebenslaufs, den Download als PDF und das Senden von Nachrichten über ein Kontaktformular (Komponenten unter `src/app/features/resume` und `src/app/features/contact`).
- Anpassbares Design: Farben, Abstände und Typografie sind in `src/styles.scss` zentral definiert. Passe CSS-Variablen wie `--clr-primary`, `--clr-secondary` oder die Abstandsvariablen (`--space-sm`, `--space-lg`) an, um das Design deinem Branding anzupassen.

## Voraussetzungen

- Node.js (v14 oder neuer)
- Angular CLI (v15 oder neuer). Installation (global):

```bash
npm install -g @angular/cli
```

## Installation

1. Repository klonen:

```bash
git clone https://github.com/OGDeniz/deniz-portfolio.git
cd deniz-portfolio
```

2. Abhängigkeiten installieren:

```bash
npm install
```

3. Entwicklungsserver starten:

```bash
ng serve
```

Öffne danach `http://localhost:4200/` im Browser. Die Anwendung lädt automatisch neu, wenn du Quellcode änderst.

4. Für Produktion bauen:

```bash
ng build
```

Die kompilierten Dateien liegen dann im `dist/`-Ordner bereit zur Bereitstellung.

## Projektstruktur (Kurzüberblick)

```
deniz-portfolio/
├── src/
│   ├── app/
│   │   ├── features/
│   │   │   ├── home/       # Startseite (Rollen-Animation, Kennzahlen)
│   │   │   ├── skills/     # Skills-Seite (technisch & soft skills)
│   │   │   ├── projects/   # Projekte (Kartenübersicht)
│   │   │   ├── resume/     # Lebenslauf-Seite
│   │   │   └── contact/    # Kontaktformular
│   │   ├── app.routes.ts   # Routing-Konfiguration
│   │   └── app.component.* # Root-Component
│   ├── assets/             # Statische Assets (Bilder, Icons)
│   ├── public/             # Public-Dateien (z. B. Projektbilder)
│   └── styles.scss         # Globale Styles & Variablen
├── angular.json            # Angular Workspace Konfiguration
├── package.json            # Projekt-Metadaten, Scripts, Dependencies
└── README.md               # (diese Datei)
```

## Anpassungen

- Farben & Abstände ändern: Bearbeite `src/styles.scss` und passe die CSS-Variablen an.
- Skills aktualisieren: Öffne `src/app/features/skills/skills.component.ts` und aktualisiere die Arrays `technicalSkills` und `softSkills` (Name + Level 0–100).
- Projekte hinzufügen/ändern: Bearbeite das `projects`-Array in `src/app/features/projects/projects.component.ts`. Jedes Objekt sollte `title`, `description`, `technologies`, `image` (in `public/projects/`) und optional `link` enthalten.
- Routing: Passe `src/app/app.routes.ts` an, wenn du neue Seiten hinzufügst oder Pfade änderst. Die Features werden lazy-loaded, um die Performance zu verbessern.

## Mitwirken

Beiträge sind willkommen! Wenn du einen Fehler findest oder ein Feature vorschlagen möchtest, öffne ein Issue oder sende einen Pull Request. Bitte halte dich an den bestehenden Code-Stil.

## Lizenz

Dieses Projekt steht unter der MIT-Lizenz. Details findest du in der `LICENSE`-Datei.
