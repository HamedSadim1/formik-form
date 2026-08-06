# Formik Form App

Een moderne, professionele React-applicatie gebouwd met Vite, TypeScript en Tailwind CSS. Deze applicatie demonstreert geavanceerde formulierbeheer met Formik, een **dark glass v2** UI-design en best practices voor React-ontwikkeling.

## ✨ Kenmerken

- **Dark Glass v2 Design**: Gelaagde glas-kaart met gradient-randen en een rijke aurora-achtergrond
- **Design Tokens**: Centraal kleurenpalet en animaties via Tailwind CSS v4 `@theme`
- **TypeScript**: Volledig getypeerde codebase voor betere ontwikkelervaring
- **Formik Forms**: Robuuste formulierbeheer met Yup-validatie (incl. verplichte groepen)
- **Micro-interacties**: Hover-states, transitions, focus-glow en press-feedback
- **Toegankelijkheid**: ARIA-koppelingen, focus-management en `prefers-reduced-motion`
- **Component Architectuur**: Modular opgebouwde, herbruikbare componenten (DRY)
- **Responsive Design**: Optimale weergave op alle apparaten
- **Vite Build Tool**: Snelle ontwikkelserver en geoptimaliseerde productie builds

## 🛠️ Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite 8
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Form Management**: Formik + Yup validation
- **Icons**: React Icons
- **Code Quality**: ESLint, Prettier, Commitlint (conventional commits), Husky
- **Package Manager**: npm

## 🚀 Installatie

1. **Clone de repository**

   ```bash
   git clone https://github.com/HamedSadim1/formik-form.git
   cd formik-form
   ```

2. **Installeer dependencies**

   ```bash
   npm install
   ```

3. **Start de ontwikkelserver**

   ```bash
   npm run dev
   ```

4. **Open in browser**

   `http://localhost:5173`

## 📜 Beschikbare Scripts

- `npm run dev` - Start de ontwikkelserver
- `npm run build` - Bouw voor productie (typecheck + Vite build)
- `npm run preview` - Preview productie build lokaal
- `npm run typecheck` - TypeScript typecheck
- `npm run lint` - ESLint
- `npm run lint:fix` - ESLint met autofix
- `npm run format` - Prettier (schrijf)
- `npm run format:check` - Prettier (check)

## 🏗️ Project Structuur

```text
src/
├── components/              # Herbruikbare UI componenten
│   ├── Forum.tsx            # Hoofdformulier component
│   ├── FormField.tsx        # Input veld met focus-glow en karakterteller
│   ├── OptionChip.tsx       # Herbruikbare checkbox/radio optie-chip
│   ├── FieldGroup.tsx       # Gedeelde fieldset/legende/foutmelding wrapper
│   ├── CheckboxGroup.tsx    # Checkbox groep (verplicht, min. 1 keuze)
│   ├── RadioGroup.tsx       # Radio groep (verplicht, 1 keuze)
│   ├── SubmitButton.tsx     # Submit button met loading state
│   ├── SuccessMessage.tsx   # Geanimeerde succes bevestiging
│   └── LiveValues.tsx       # Opvouwbare live-samenvatting van formulierwaarden
├── utils/                   # Hulpfuncties en configuratie
│   └── formUtils.ts         # Form validatie, types en opties
├── App.tsx                  # Hoofdapplicatie component
├── index.tsx                # Applicatie entry point
└── index.css                # Design tokens (@theme), globale styles en animaties
```

## 🎨 UI/UX Features

- **Dark Glass v2**: Glazen kaart met gradient-rand (`p-px` wrapper), `backdrop-blur` en insethighlights
- **Custom Form Controls**: Gradient checkboxes/radios met selectie-highlight en focusring
- **Micro-interacties**: Focus-underline die aangroeit, icon-scale, verzend-icoon dat glijdt, press-feedback
- **Karakterteller**: Live `0/10`-teller die amber kleurt bij het benaderen én op de limiet, rood alleen bij overschrijden
- **Validatie**: Real-time foutmeldingen met `role="alert"` en error-ring op groepen
- **Loading States**: Visuele feedback met spinner tijdens formulier verzending
- **Fout-staat**: Gesimuleerde verzendfout (15% kans) met `role="alert"`-melding, retry- en sluitknop
- **Success Animation**: Gepulste ring en staggered entree na succesvolle verzending
- **Inzending-overzicht**: Succes-scherm toont een terugblik op je inzending; "Terug naar mijn formulier" herstelt de waarden in het formulier
- **Responsive Layout**: Vloeiende breedte met responsive padding op mobiel

## ♿ Toegankelijkheid

- `aria-invalid`, `aria-describedby`, `aria-required` en `aria-busy` op alle velden en knoppen
- `fieldset`/`legend`-semantiek voor de checkbox- en radiogroepen
- `autocomplete`-attributen voor betere mobiele invoer
- Focus wordt verplaatst naar de succes-melding en terug naar het eerste veld bij reset
- Zichtbare `:focus-visible`-stijlen op alle interactieve elementen
- `prefers-reduced-motion`: animaties worden uitgeschakeld voor gebruikers die minder beweging willen
- `color-scheme: dark` en een leesbare browser-autofill-styling

## 🔧 Ontwikkeling

### Code Stijl

- **DRY Principle**: Gedeelde componenten zoals `OptionChip` en `FieldGroup`
- **Component Composition**: Modular opgebouwde componenten
- **Type Safety**: Geen `any` types gebruikt
- **Clean Architecture**: Gescheiden verantwoordelijkheden

### Best Practices

- Functionele componenten met hooks
- Proper TypeScript typing
- ESLint + Prettier configuratie
- Husky hooks: lint-staged en commitlint (conventional commits)
- Git versiebeheer met feature branches

## 📝 Formulier Functionaliteit

Het formulier bevat:

- **Naam veld**: Verplicht, max 10 karakters, met live karakterteller
- **E-mail veld**: Verplicht, e-mail validatie
- **Toggle**: "Ben je lang?" schakelaar
- **Checkbox groep**: Koekjes — verplicht, minstens één keuze
- **Radio groep**: Yoghurt — verplicht, één keuze
- **Live preview**: Opvouwbare samenvatting van de huidige formulierwaarden
- **Succes-flow**: Na verzending een samenvatting van je inzending; "Terug naar mijn formulier" hervult het formulier, "Opnieuw invullen" start leeg
- **Gesimuleerde fout**: 15% kans op mislukte verzending met foutmelding en retry — deterministisch testbaar via `?fail=always`, `?fail=never` of `?fail=0.5`

## 🚀 Deployment

1. **Bouw voor productie**

   ```bash
   npm run build
   ```

2. **Deploy de `dist` folder** naar je hosting provider

## 🤝 Bijdragen

1. Fork het project
2. Maak een feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit je wijzigingen met een conventionele message (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push naar de branch (`git push origin feature/AmazingFeature`)
5. Open een Pull Request

## 📄 Licentie

Dit project is gelicentieerd onder de MIT License - zie het [LICENSE](LICENSE) bestand voor details.

## 👨‍💻 Auteur

**Hamed Sadim** - [GitHub](https://github.com/HamedSadim1)

## 🙏 Erkenningen

- [React](https://reactjs.org/) - De JavaScript bibliotheek voor user interfaces
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Formik](https://formik.org/) - Build forms in React, without the tears
- [Yup](https://github.com/jquense/yup) - Schema validation
- [React Icons](https://react-icons.github.io/react-icons/) - Popular icons in React
