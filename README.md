# Formik Form App

Een moderne, professionele React-applicatie gebouwd met Vite, TypeScript en Tailwind CSS. Deze applicatie demonstreert geavanceerde formulierbeheer met Formik, glasmorfisme UI-design en best practices voor React-ontwikkeling.

## ✨ Kenmerken

- **Moderne UI/UX**: Glasmorfisme design met Tailwind CSS
- **TypeScript**: Volledig getypeerde codebase voor betere ontwikkelervaring
- **Formik Forms**: Robuuste formulierbeheer met validatie
- **Component Architectuur**: Modular opgebouwde, herbruikbare componenten
- **Responsive Design**: Optimale weergave op alle apparaten
- **Vite Build Tool**: Snelle ontwikkelserver en geoptimaliseerde productie builds

## 🛠️ Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite 7
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS
- **Form Management**: Formik + Yup validation
- **Icons**: React Icons
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
- `npm run build` - Bouw voor productie
- `npm run preview` - Preview productie build lokaal

## 🏗️ Project Structuur

```text
src/
├── components/          # Herbruikbare UI componenten
│   ├── FormField.tsx    # Input veld component
│   ├── CheckboxGroup.tsx# Checkbox groep component
│   ├── RadioGroup.tsx   # Radio button groep component
│   ├── SubmitButton.tsx # Submit button component
│   ├── SuccessMessage.tsx # Succes bericht component
│   └── Forum.tsx        # Hoofdformulier component
├── utils/               # Hulpfuncties en configuratie
│   └── formUtils.ts     # Form validatie en opties
├── App.tsx              # Hoofdapplicatie component
├── index.tsx            # Applicatie entry point
└── index.css            # Globale styles en Tailwind imports
```

## 🎨 UI/UX Features

- **Glasmorfisme Effecten**: Moderne transparante UI elementen
- **Responsive Layout**: Vaste breedte container voor consistente weergave
- **Form Validation**: Real-time validatie met foutmeldingen
- **Loading States**: Visuele feedback tijdens formulier verzending
- **Success Animation**: Geanimeerde bevestiging na succesvolle verzending
- **Accessibility**: Proper labels en focus management

## 🔧 Ontwikkeling

### Code Stijl

- **DRY Principle**: Geen herhaling van code
- **Component Composition**: Modular opgebouwde componenten
- **Type Safety**: Geen `any` types gebruikt
- **Clean Architecture**: Gescheiden verantwoordelijkheden

### Best Practices

- Functionele componenten met hooks
- Proper TypeScript typing
- ESLint configuratie
- Git versiebeheer
- Professionele project structuur

## 📝 Formulier Functionaliteit

Het formulier bevat:

- **Naam veld**: Verplicht, max 10 karakters
- **E-mail veld**: Verplicht, e-mail validatie
- **Checkbox**: Enkele keuze vraag
- **Checkbox groep**: Meerdere keuze opties (koekjes)
- **Radio groep**: Enkele keuze opties (yoghurt)
- **Live preview**: Toont huidige formulier waarden

## 🚀 Deployment

1. **Bouw voor productie**

   ```bash
   npm run build
   ```

2. **Deploy de `dist` folder** naar je hosting provider

## 🤝 Bijdragen

1. Fork het project
2. Maak een feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit je wijzigingen (`git commit -m 'Add some AmazingFeature'`)
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
- [React Icons](https://react-icons.github.io/react-icons/) - Popular icons in React
