# Portfolio — Madelyn Torff

Application web portfolio avec tableau de bord d'administration sécurisé.

**Stack :** React 19 · TypeScript (strict) · Tailwind CSS v4 · Vite · Zod · Google OAuth 2.0

---

## Installation

### Prérequis

- Node.js 18+ 
- Un compte Google Cloud (pour OAuth)

### 1. Cloner et installer les dépendances

```bash
npm install
```

### 2. Configurer les variables d'environnement

Copier le fichier exemple et renseigner votre Client ID Google :

```bash
cp .env.example .env
```

Ouvrir `.env` et remplacer la valeur :

```
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```

#### Obtenir un Google Client ID

1. Aller sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créer un projet (ou en sélectionner un existant)
3. Menu **APIs & Services → Credentials**
4. Cliquer **+ Create Credentials → OAuth 2.0 Client ID**
5. Type : **Web application**
6. Ajouter dans *Authorized JavaScript origins* :
   - `http://localhost:5173` (développement)
   - Votre domaine de production si applicable
7. Copier le **Client ID** généré dans votre `.env`

### 3. Lancer en développement

```bash
npm run dev
```

L'application est disponible sur [http://localhost:5173](http://localhost:5173).

---

## Build de production

```bash
npm run build
```

Les fichiers générés se trouvent dans `dist/`. Pour prévisualiser le build :

```bash
npm run preview
```

---

## Structure du projet

```
src/
├── components/        # Composants UI réutilisables
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── SectionHero.tsx
│   ├── SectionProjects.tsx
│   ├── SectionTestimonials.tsx
│   ├── ProjectCard.tsx
│   └── ProtectedRoute.tsx
├── context/           # États globaux (useReducer + useContext)
│   ├── AuthContext.tsx
│   └── ProjectsContext.tsx
├── hooks/             # Custom hooks
│   └── useForm.ts
├── layouts/           # Structures de pages
│   └── AdminLayout.tsx
├── pages/             # Vues routées
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Login.tsx
│   ├── ProjectDetail.tsx
│   ├── NotFound.tsx
│   └── admin/
│       ├── AdminProjects.tsx
│       └── AdminContacts.tsx
├── services/          # Configuration externe
│   └── googleAuth.ts
├── types/             # Contrats de données TypeScript
│   └── index.ts
└── App.tsx            # Routage + providers
```

---

## Routes

| Route | Description | Accès |
|-------|-------------|-------|
| `/` | Page d'accueil avec projets et témoignages | Public |
| `/a-propos` | Page À propos | Public |
| `/contact` | Formulaire de contact (validation Zod) | Public |
| `/projects/:id` | Détail d'un projet | Public |
| `/login` | Page de connexion Google | Public |
| `/admin/projects` | Gestion CRUD des projets | Authentifié |
| `/admin/contacts` | Consultation des messages reçus | Authentifié |

---

## Fonctionnalités

- **Authentification Google OAuth 2.0** — connexion sécurisée, routes protégées
- **CRUD Projets** — créer, modifier, supprimer des projets via l'admin
- **Formulaire de contact** — validation avec Zod, messages stockés en mémoire
- **Témoignages dynamiques** — affichage conditionnel (visible/masqué)
- **Code Splitting** — chaque page chargée à la demande (React.lazy + Suspense)
- **TypeScript strict** — typage complet, aucun `any`
- **Page 404** — gestion des routes inconnues

---

## Commandes

```bash
npm run dev      # Démarrer le serveur de développement
npm run build    # Build de production
npm run preview  # Prévisualiser le build
npm run lint     # Linter ESLint
```
