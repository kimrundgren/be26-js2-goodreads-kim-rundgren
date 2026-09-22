# The Book Nook

The Book Nook är en förenklad Goodreads-inspirerad one-page-app för att hålla koll på böcker du vill läsa och böcker du har läst.

## Funktioner

- Visa sparade böcker med titel, författare, utgivningsår, omslagsbild, betyg och lässtatus
- Lägga till nya böcker
- Markera böcker som lästa eller olästa
- Betygsätta lästa böcker från 1–5
- Redigera lässtatus och betyg
- Ta bort böcker
- Filtrera böcker efter alla, lästa eller olästa
- Data sparas i Firebase och finns kvar mellan sidladdningar

## Teknik

- **HTML och CSS**
- **Vanilla JavaScript** med ES-moduler
- **OOP** med en `Book`-klass
- **Vite**
- **Bootstrap 5**
- **Firebase Realtime Database**
- **Firebase REST API** via `fetch`

Firebase JavaScript SDK används inte. All kommunikation med databasen sker via Firebase REST API.

## Kom igång

### Förutsättningar

- Node.js
- npm

### Installation

Klona repot:

```bash
git clone git@github.com:kimrundgren/be26-js2-goodreads-kim-rundgren.git
cd be26-js2-goodreads-kim-rundgren
```

Installera projektets beroenden:

```bash
npm install
```

Starta utvecklingsservern:

```bash
npm run dev
```

Öppna den lokala URL:en som visas i terminalen, vanligtvis:

```text
http://localhost:5173
```

Firebase-databasens URL finns som `BASE_URL` i `src/api/booksApi.js`.

## Projektstruktur

Projektet är uppdelat efter ansvar, där `main.js` fungerar som applikationens nav.

```text
src/
├── api/
│   └── booksApi.js
│
├── modules/
│   └── books/
│       ├── Book.js
│       ├── bookData.js
│       ├── books.css
│       │
│       ├── list/
│       │   ├── bookList.js
│       │   ├── bookItem.js
│       │   └── bookFilter.js
│       │
│       └── forms/
│           ├── addBookForm.js
│           └── editBookForm.js
│
└── main.js
```

### Ansvar

- **`main.js`** – samordnar applikationen, state, events och kommunikationen mellan modulerna
- **`api/booksApi.js`** – hanterar all kommunikation med Firebase via GET, POST, PATCH och DELETE
- **`Book.js`** – innehåller `Book`-klassen och regler för bokdata
- **`bookData.js`** – omvandlar data från Firebase till `Book`-instanser
- **`list/`** – innehåller rendering och filtrering av boklistan
- **`forms/`** – hanterar data och interaktion för formulären
- **`books.css`** – innehåller styling för bokmodulen

## Bra att veta som utvecklare

- **Firebase returnerar ett objekt, inte en array.** `getBooks()` ger tillbaka data i formatet `{ id1: {...}, id2: {...} }`. Omvandlingen till en array av `Book`-instanser sker i `bookData.js` (`createBooksFromData` / `createBookFromData`), inte i `main.js`.
- **`.json`-suffixet i URL:en** krävs av Firebase Realtime Database's REST API för alla anrop (GET, POST, PATCH, DELETE).
- **`Book`-klassen validerar sig själv.** `setScore()` kastar ett fel om boken inte är markerad som läst, eller om värdet inte är ett heltal mellan 1 och 5. Att sätta `setIsRead(false)` nollställer automatiskt betyget.
- **Felhantering finns i två lager:** `booksApi.js` loggar och kastar vidare fel från `fetch`-anropen, och `main.js` fångar dem med `.catch(error => console.error(error))` runt varje anrop.
- **State hålls enkelt** i `main.js` som vanliga variabler (`books`, `currentFilter`, `bookToEdit`) – ingen extern state-hantering används.
