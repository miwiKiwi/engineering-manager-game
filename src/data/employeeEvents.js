export const EMPLOYEE_EVENTS = {
  backend: [
    {
      id: 'be1',
      text: '"Mój kod działa tylko na moim laptopie"',
      options: [
        { text: 'Dockeryzacja - stawiamy kontener', effects: { sanity: -3, morale: -5, codeQuality: 5 } },
        { text: 'Fix lokalnie, niech działa', effects: { sanity: -5, morale: 5, codeQuality: -10 } },
        { text: 'Przepisz od zera', effects: { sanity: -8, morale: -10, codeQuality: 10 } },
      ],
    },
    {
      id: 'be2',
      text: '"Senior powiedział żebym przepisał wszystko na Rust"',
      options: [
        { text: 'STOP. Nie przepisujemy.', effects: { sanity: -4, morale: -15, codeQuality: 5 } },
        { text: 'Okej, ale masz 2 dni deadline', effects: { sanity: -8, morale: 5, codeQuality: -10 } },
        { text: 'Niech będzie Rust...', effects: { sanity: -15, morale: 10, codeQuality: -15 } },
      ],
    },
    {
      id: 'be3',
      text: '"Debuguję 3 dni, zapomniałem odkomentować linijkę"',
      options: [
        { text: 'Stało się, idź dalej', effects: { sanity: 3, morale: 5, codeQuality: 0 } },
        { text: 'Dodajemy linting rules', effects: { sanity: -5, morale: -5, codeQuality: 10 } },
        { text: '*głębokie westchnienie*', effects: { sanity: -10, morale: 0, codeQuality: 0 } },
      ],
    },
    {
      id: 'be4',
      text: '"Potrzebuję 2 tygodnie urlopu za 3 dni, bilety kupione"',
      options: [
        { text: 'Okej, ale przekaż taski', effects: { sanity: -5, morale: 5, codeQuality: 0 } },
        { text: 'Nie możesz teraz', effects: { sanity: -3, morale: -20, codeQuality: 0 } },
        { text: 'Bierz, jakoś sobie poradzimy', effects: { sanity: -7, morale: 15, codeQuality: -5 } },
      ],
    },
    {
      id: 'be5',
      text: '"Ten bug to nie bug, to feature"',
      options: [
        { text: 'To bug. Napraw.', effects: { sanity: -6, morale: -10, codeQuality: 15 } },
        { text: 'Known limitation, dokumentujemy', effects: { sanity: -2, morale: 5, codeQuality: -10 } },
        { text: 'Przekonajmy PO że to feature', effects: { sanity: -10, morale: 10, codeQuality: -15 } },
      ],
    },
  ],
  frontend: [
    {
      id: 'fe1',
      text: '"Przepisujemy Angulara na Reacta. Połowa w Angular, połowa w React. Nikt nie wie jak działa"',
      options: [
        { text: 'Dokończcie migrację', effects: { sanity: -8, morale: -15, codeQuality: -5 } },
        { text: 'Wracacie do Angulara', effects: { sanity: -5, morale: -20, codeQuality: -5 } },
        { text: 'Zostawiamy hybrid...', effects: { sanity: -12, morale: 5, codeQuality: -20 } },
      ],
    },
    {
      id: 'fe2',
      text: '"Junior dodał redux-saga do formularza logowania. 500 linii zamiast 10"',
      options: [
        { text: 'Niech zostanie, działa', effects: { sanity: -2, morale: 5, codeQuality: -15 } },
        { text: 'Przepisz normalnie', effects: { sanity: -6, morale: -10, codeQuality: 15 } },
        { text: 'Code review i wyjaśnienie', effects: { sanity: -4, morale: -5, codeQuality: 10 } },
      ],
    },
    {
      id: 'fe3',
      text: '"CSS nie działa na Safari. Na Chrome idealnie"',
      options: [
        { text: 'Fix dla Safari', effects: { sanity: -6, morale: -5, codeQuality: 10 } },
        { text: 'Ignorujemy te 5% userów', effects: { sanity: 3, morale: 5, codeQuality: -10 } },
        { text: 'Warning banner dla Safari', effects: { sanity: -2, morale: 0, codeQuality: -5 } },
      ],
    },
    {
      id: 'fe4',
      text: '"Designer chce animacje na wszystkim. Performance leci w dół"',
      options: [
        { text: 'Dodajemy wszystkie animacje', effects: { sanity: -10, morale: 5, codeQuality: -15 } },
        { text: 'Tylko 3 najważniejsze', effects: { sanity: -3, morale: -5, codeQuality: 5 } },
        { text: 'Performance > animacje', effects: { sanity: -5, morale: -15, codeQuality: 10 } },
      ],
    },
    {
      id: 'fe5',
      text: '"Chcę 30% podwyżki. Kolega z poprzedniej pracy zarabia więcej"',
      options: [
        { text: '10% teraz, resztę za pół roku', effects: { sanity: -4, morale: -5, codeQuality: 0 } },
        { text: 'Porozmawiam z HR...', effects: { sanity: -8, morale: -10, codeQuality: 0 } },
        { text: 'Okej, załatwiam 30%', effects: { sanity: -12, morale: 20, codeQuality: 0 } },
      ],
    },
  ],
  devops: [
    {
      id: 'do1',
      text: '"Kubernetes cluster wykłada się co 2 godziny"',
      options: [
        { text: 'Debugujemy i szukamy root cause', effects: { sanity: -10, morale: -10, codeQuality: 15 } },
        { text: 'Workaround z restartami', effects: { sanity: -3, morale: 5, codeQuality: -10 } },
        { text: 'Skalujemy horyzontalnie, więcej nodów', effects: { sanity: -5, morale: -5, codeQuality: -5 } },
      ],
    },
    {
      id: 'do2',
      text: '"Jenkins pipeline fails losowo. Czasem przechodzi, czasem nie"',
      options: [
        { text: 'Przepisujemy pipeline od zera', effects: { sanity: -12, morale: -15, codeQuality: 15 } },
        { text: 'Dodajemy retry i modlimy się', effects: { sanity: -4, morale: 5, codeQuality: -10 } },
        { text: 'Migracja na GitHub Actions', effects: { sanity: -8, morale: -5, codeQuality: 10 } },
      ],
    },
    {
      id: 'do3',
      text: '"Monitoring mówi że wszystko OK, ale userzy mówią że nie działa"',
      options: [
        { text: 'Naprawiamy monitoring', effects: { sanity: -6, morale: -5, codeQuality: 10 } },
        { text: 'Wierzymy userom, debug', effects: { sanity: -10, morale: 5, codeQuality: 5 } },
        { text: 'Dodajemy więcej metryk', effects: { sanity: -8, morale: -10, codeQuality: 10 } },
      ],
    },
    {
      id: 'do4',
      text: '"Terraform state się rozjechał z produkcją"',
      options: [
        { text: 'Rebuild state manualnie', effects: { sanity: -15, morale: -15, codeQuality: 5 } },
        { text: 'Importujemy istniejące resources', effects: { sanity: -8, morale: -5, codeQuality: -5 } },
        { text: 'Restore z backupu', effects: { sanity: -5, morale: 5, codeQuality: 0 } },
      ],
    },
    {
      id: 'do5',
      text: '"Docker registry pełny. 500GB obrazów, nikt nie wie które potrzebne"',
      options: [
        { text: 'Cleanup policy + kasujemy stare', effects: { sanity: -6, morale: -5, codeQuality: 10 } },
        { text: 'Kupujemy więcej storage', effects: { sanity: -2, morale: 5, codeQuality: -5 } },
        { text: 'Migrujemy na ECR', effects: { sanity: -10, morale: -10, codeQuality: 5 } },
      ],
    },
  ],
  po: [
    {
      id: 'po1',
      text: '"Stakeholder chce zmienić scope. W połowie sprintu"',
      options: [
        { text: 'Akceptujemy zmianę', effects: { sanity: -8, morale: -15, codeQuality: -5 } },
        { text: 'Push back - następny sprint', effects: { sanity: -4, morale: 5, codeQuality: 5 } },
        { text: 'Kompromis - część teraz', effects: { sanity: -6, morale: -5, codeQuality: 0 } },
      ],
    },
    {
      id: 'po2',
      text: '"OKRy się zmieniły. Zupełnie inny priorytet na Q2"',
      options: [
        { text: 'Pivotujemy natychmiast', effects: { sanity: -10, morale: -20, codeQuality: -10 } },
        { text: 'Kończymy sprint, potem pivot', effects: { sanity: -5, morale: -5, codeQuality: 5 } },
        { text: 'Ignorujemy nowe OKRy', effects: { sanity: -3, morale: 10, codeQuality: 0 } },
      ],
    },
    {
      id: 'po3',
      text: '"Klient grozi odejściem bez tej customowej feature"',
      options: [
        { text: 'Robimy custom feature', effects: { sanity: -10, morale: -10, codeQuality: -15 } },
        { text: 'Proponujemy alternatywę', effects: { sanity: -6, morale: -5, codeQuality: 5 } },
        { text: 'Niech odchodzi', effects: { sanity: -4, morale: 5, codeQuality: 10 } },
      ],
    },
    {
      id: 'po4',
      text: '"Konkurencja wypuściła feature który planowaliśmy za pół roku"',
      options: [
        { text: 'Gonimy rynek - crunch', effects: { sanity: -12, morale: -15, codeQuality: -15 } },
        { text: 'Robimy lepszą wersję, spokojnie', effects: { sanity: -4, morale: 5, codeQuality: 10 } },
        { text: 'Pivot - robimy coś innego', effects: { sanity: -6, morale: -10, codeQuality: 0 } },
      ],
    },
    {
      id: 'po5',
      text: '"Board chce progress report. Dzisiaj. W slajdach. 20 stron"',
      options: [
        { text: 'Robię sam, zespół pracuje', effects: { sanity: -15, morale: 5, codeQuality: 0 } },
        { text: 'Szybki update na 5 slajdów', effects: { sanity: -5, morale: 0, codeQuality: 0 } },
        { text: 'Deleguję na juniora', effects: { sanity: -3, morale: -10, codeQuality: 0 } },
      ],
    },
  ],
  junior: [
    {
      id: 'jr1',
      text: '"Nie rozumiem kodu seniora. Pytałem, powiedział - read the docs"',
      options: [
        { text: 'Code review session z seniorem', effects: { sanity: -6, morale: 10, codeQuality: 5 } },
        { text: 'Przydzielam mentora', effects: { sanity: -4, morale: 5, codeQuality: 0 } },
        { text: 'Musisz sam się nauczyć', effects: { sanity: -2, morale: -15, codeQuality: -5 } },
      ],
    },
    {
      id: 'jr2',
      text: '"Pierwszy PR po 2 tygodniach. 47 komentarzy w review"',
      options: [
        { text: 'Konstruktywny feedback 1:1', effects: { sanity: -8, morale: 10, codeQuality: 10 } },
        { text: 'Szczery ale ostry feedback', effects: { sanity: -4, morale: -10, codeQuality: 15 } },
        { text: 'Approve, niech się uczy na produkcji', effects: { sanity: -2, morale: 5, codeQuality: -15 } },
      ],
    },
    {
      id: 'jr3',
      text: '"Stack Overflow nie ma rozwiązania. Co mam robić?"',
      options: [
        { text: 'Pair programming session', effects: { sanity: -10, morale: 15, codeQuality: 10 } },
        { text: 'Wskazuję dokumentację', effects: { sanity: -3, morale: -5, codeQuality: 5 } },
        { text: 'Robię za niego', effects: { sanity: -8, morale: -10, codeQuality: 5 } },
      ],
    },
    {
      id: 'jr4',
      text: '"Czy mogę dodać tę bibliotekę? Ma tylko 50 stars ale jest idealna"',
      options: [
        { text: 'Review razem ze mną', effects: { sanity: -6, morale: 5, codeQuality: 5 } },
        { text: 'Użyj sprawdzonej alternatywy', effects: { sanity: -2, morale: -5, codeQuality: 10 } },
        { text: 'Okej, eksperymentuj', effects: { sanity: -3, morale: 10, codeQuality: -10 } },
      ],
    },
    {
      id: 'jr5',
      text: '"Mam imposter syndrome. Czy ja się w ogóle nadaję?"',
      options: [
        { text: 'Mentoring i pozytywny feedback', effects: { sanity: -5, morale: 20, codeQuality: 0 } },
        { text: 'To normalne, przejdzie', effects: { sanity: -2, morale: 5, codeQuality: 0 } },
        { text: 'Twarda szkoła - musisz dowieźć', effects: { sanity: -3, morale: -15, codeQuality: 5 } },
      ],
    },
  ],
};
