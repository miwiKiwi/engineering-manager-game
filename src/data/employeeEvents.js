export const EMPLOYEE_EVENTS = {
  backend: [
    {
      id: 'be1',
      text: '"Mój kod działa tylko na moim laptopie"',
      options: [
        { text: 'Dockeryzacja - stawiamy kontener', effects: { sanity: 5, morale: -10, codeQuality: 5 } },
        { text: 'Fix lokalnie, niech działa', effects: { sanity: -10, morale: 5, codeQuality: -15 } },
        { text: 'Przepisz od zera', effects: { sanity: -5, morale: -15, codeQuality: 10 } },
      ],
    },
    {
      id: 'be2',
      text: '"Senior powiedział żebym przepisał wszystko na Rust"',
      options: [
        { text: 'STOP. Nie przepisujemy.', effects: { sanity: 5, morale: -20, codeQuality: 5 } },
        { text: 'Okej, ale masz 2 dni deadline', effects: { sanity: -10, morale: 5, codeQuality: -10 } },
        { text: 'Niech będzie Rust...', effects: { sanity: -25, morale: 10, codeQuality: -20 } },
      ],
    },
    {
      id: 'be3',
      text: '"Debuguję 3 dni, zapomniałem odkomentować linijkę"',
      options: [
        { text: 'Stało się, idź dalej', effects: { sanity: 5, morale: 5, codeQuality: 0 } },
        { text: 'Dodajemy linting rules', effects: { sanity: -5, morale: -5, codeQuality: 10 } },
        { text: '*głębokie westchnienie*', effects: { sanity: -15, morale: 0, codeQuality: 0 } },
      ],
    },
    {
      id: 'be4',
      text: '"Potrzebuję 2 tygodnie urlopu za 3 dni, bilety kupione"',
      options: [
        { text: 'Okej, ale przekaż taski', effects: { sanity: -10, morale: 5, codeQuality: 0 } },
        { text: 'Nie możesz teraz', effects: { sanity: -5, morale: -25, codeQuality: 0 } },
        { text: 'Bierz, jakoś sobie poradzimy', effects: { sanity: 10, morale: 15, codeQuality: -5 } },
      ],
    },
    {
      id: 'be5',
      text: '"Ten bug to nie bug, to feature"',
      options: [
        { text: 'To bug. Napraw.', effects: { sanity: -10, morale: -10, codeQuality: 15 } },
        { text: 'Known limitation, dokumentujemy', effects: { sanity: 5, morale: 5, codeQuality: -10 } },
        { text: 'Przekonajmy PO że to feature', effects: { sanity: -15, morale: 10, codeQuality: -15 } },
      ],
    },
  ],
  frontend: [
    {
      id: 'fe1',
      text: '"Przepisujemy Angulara na Reacta. Połowa w Angular, połowa w React. Nikt nie wie jak działa"',
      options: [
        { text: 'Dokończcie migrację', effects: { sanity: -10, morale: -20, codeQuality: -15 } },
        { text: 'Wracacie do Angulara', effects: { sanity: 5, morale: -30, codeQuality: -10 } },
        { text: 'Zostawiamy hybrid...', effects: { sanity: -20, morale: 5, codeQuality: -25 } },
      ],
    },
    {
      id: 'fe2',
      text: '"Junior dodał redux-saga do formularza logowania. 500 linii zamiast 10"',
      options: [
        { text: 'Niech zostanie, działa', effects: { sanity: 5, morale: 5, codeQuality: -20 } },
        { text: 'Przepisz normalnie', effects: { sanity: -10, morale: -15, codeQuality: 15 } },
        { text: 'Code review i wyjaśnienie', effects: { sanity: -5, morale: -5, codeQuality: 10 } },
      ],
    },
    {
      id: 'fe3',
      text: '"CSS nie działa na Safari. Na Chrome idealnie"',
      options: [
        { text: 'Fix dla Safari', effects: { sanity: -10, morale: -10, codeQuality: 10 } },
        { text: 'Ignorujemy te 5% userów', effects: { sanity: 10, morale: 5, codeQuality: -15 } },
        { text: 'Warning banner dla Safari', effects: { sanity: 5, morale: 0, codeQuality: -10 } },
      ],
    },
    {
      id: 'fe4',
      text: '"Designer chce animacje na wszystkim. Performance leci w dół"',
      options: [
        { text: 'Dodajemy wszystkie animacje', effects: { sanity: -15, morale: 5, codeQuality: -15 } },
        { text: 'Tylko 3 najważniejsze', effects: { sanity: 10, morale: -5, codeQuality: 5 } },
        { text: 'Performance > animacje', effects: { sanity: -5, morale: -20, codeQuality: 10 } },
      ],
    },
    {
      id: 'fe5',
      text: '"Chcę 30% podwyżki. Kolega z poprzedniej pracy zarabia więcej"',
      options: [
        { text: '10% teraz, resztę za pół roku', effects: { sanity: 5, morale: -10, codeQuality: 0 } },
        { text: 'Porozmawiam z HR...', effects: { sanity: -15, morale: -20, codeQuality: 0 } },
        { text: 'Okej, załatwiam 30%', effects: { sanity: -20, morale: 20, codeQuality: 0 } },
      ],
    },
  ],
};
