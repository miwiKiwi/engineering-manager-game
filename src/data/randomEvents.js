// Random Events - eventy losowe niezwiązane z pracownikami
// Kategorie: chaos (company/infra), oncall (production incidents), absurd (rzadkie/śmieszne)

export const RANDOM_EVENTS = {
  chaos: [
    {
      id: 'ch1',
      category: 'chaos',
      title: 'AWS ALERT',
      text: 'AWS us-east-1 padł. Wszystko nie działa. Twitter płonie. Nikt nie pomyślał o multi-region.',
      options: [
        { text: 'Czekamy na AWS, komunikat do klientów.', effects: { sanity: -20, morale: -15, codeQuality: 0 } },
        { text: 'Panikujemy i migrujemy na us-west-2.', effects: { sanity: -30, morale: -25, codeQuality: 5 } },
        { text: 'Zwalamy winę na AWS publicznie na Twitterze.', effects: { sanity: 5, morale: 10, codeQuality: -10 } },
      ],
    },
    {
      id: 'ch2',
      category: 'chaos',
      title: 'NOWE BIURO',
      text: 'HR-y z Dubaju znalazły nowe biuro, na Siedmiogrodzkiej. Jeśli nie znajdziesz innego w 30min. podpisują umowę na 2 lata.',
      options: [
        { text: 'Czy ktoś ma namiar na biuro na wynjem w dobrym miejscu?', effects: { sanity: -15, morale: -5, codeQuality: 0 } },
        { text: 'Rzucam wszystko i szyukam, mieliśmy przyciągać devów lokalizacją.', effects: { sanity: -20, morale: -5, codeQuality: 0 } },
        { text: 'Dobra, w sumie lubię sobie czasem zrobić spacer z metra i popatrzeć na inne wieżowce.', effects: { sanity: -3, morale: -30, codeQuality: 0 } },
      ],
    },
    {
      id: 'ch3',
      category: 'chaos',
      title: 'UPSTREAM DOWN',
      text: 'Serwis upstream padł. Hindusi wrzucili last minute change do release-a. Nie odpowiadają na Slacku.',
      options: [
        { text: 'Czekamy do jutra, kiedyś naprawimy.', effects: { sanity: -25, morale: -20, codeQuality: 0 } },
        { text: 'Implementujemy workaround i planujemy im spotkanie o 8 rano.', effects: { sanity: -20, morale: -10, codeQuality: -15 } },
        { text: 'Budzimy ich managera o 3 w nocy', effects: { sanity: 5, morale: 10, codeQuality: 0 } },
      ],
    },
    {
      id: 'ch4',
      category: 'chaos',
      title: 'BREAKING CHANGE',
      text: 'Breaking API change na produkcji od upstream. Żadnego deprecation notice. Połowa funkcji nie działa.',
      options: [
        { text: 'Emergency hotfix po naszej stronie.', effects: { sanity: -25, morale: -15, codeQuality: -20 } },
        { text: 'Eskalacja do ich EM, niech robią rollback.', effects: { sanity: -15, morale: -10, codeQuality: 0 } },
        { text: 'Tworzymy abstraction layer, byle szybko.', effects: { sanity: -30, morale: -20, codeQuality: 10 } },
      ],
    },
    {
      id: 'ch5',
      category: 'chaos',
      title: 'INVESTOR DEMO',
      text: 'Investor chce zobaczyć demo. Za godzinę. Zoom link już wysłany. Połowa rzeczy nie działa.',
      options: [
        { text: 'Mock data i fake everything.', effects: { sanity: -25, morale: -15, codeQuality: -20 } },
        { text: 'Pokażemy co działa, honest demo.', effects: { sanity: -10, morale: 10, codeQuality: 0 } },
        { text: 'Przełożymy na jutro.', effects: { sanity: -15, morale: -5, codeQuality: 0 } },
      ],
    },
    {
      id: 'ch6',
      category: 'chaos',
      title: 'SECURITY AUDIT',
      text: 'External security audit: 47 critical vulnerabilities. Newsletter poszedł do całej firmy. Board pyta.',
      options: [
        { text: 'Weekend crunch - fix dla wszystkich krytycznych', effects: { sanity: -40, morale: -40, codeQuality: 15 } },
        { text: 'Priorytetyzujemy top 10', effects: { sanity: -20, morale: -15, codeQuality: 15 } },
        { text: 'Większość to false positives...', effects: { sanity: 5, morale: 5, codeQuality: -10 } },
      ],
    },
  ],

  oncall: [
    {
      id: 'on1',
      category: 'oncall',
      title: 'ONCALL ALERT',
      text: 'Alert o 3:24 AM. Production database 99% full. ETA to disaster: 30 minut.',
      options: [
        { text: 'Rozwiązuję z Alexem, zespół śpi.', effects: { sanity: -25, morale: 5, codeQuality: 0 } },
        { text: 'Budzę zespół, wszyscy na pokład.', effects: { sanity: -20, morale: -30, codeQuality: 5 } },
        { text: 'Ignorujemy do rana...', effects: { sanity: -10, morale: -20, codeQuality: -25 } },
      ],
    },
    {
      id: 'on2',
      category: 'oncall',
      title: 'EXCEPTION STORM',
      text: '10,000 wyjątków w ciągu minuty. Monitoring płonie. Slack nie nadąża z alertami.',
      options: [
        { text: 'Kill switch - disable feature.', effects: { sanity: -15, morale: -20, codeQuality: 0 } },
        { text: 'Rollback do poprzedniej wersji.', effects: { sanity: -10, morale: -10, codeQuality: 0 } },
        { text: 'Debug na żywo w produkcji.', effects: { sanity: -25, morale: -15, codeQuality: 3 } },
      ],
    },
    {
      id: 'on3',
      category: 'oncall',
      title: 'SECURITY BREACH',
      text: 'Ktoś wrzucił API key do publicznego repo. 20 minut temu. To był AI. Boty już próbują się włamać.',
      options: [
        { text: 'PANIC MODE - regeneruj wszystko.', effects: { sanity: -20, morale: -25, codeQuality: 15 } },
        { text: 'Rotate keys zgodnie z procedurą.', effects: { sanity: -15, morale: -10, codeQuality: 5 } },
        { text: 'Blokujemy IP.', effects: { sanity: -10, morale: -5, codeQuality: -5 } },
      ],
    },
    {
      id: 'on4',
      category: 'oncall',
      title: 'MEMORY LEAK',
      text: 'Memory usage: 8GB → 16GB → 24GB. Serwery crashują jeden po drugim.',
      options: [
        { text: 'Restart all, powtarzaj co godzinę', effects: { sanity: -25, morale: -15, codeQuality: -10 } },
        { text: 'Profile na produkcji', effects: { sanity: -15, morale: -20, codeQuality: 10 } },
        { text: 'Scale horizontal - więcej serwerów', effects: { sanity: -15, morale: -10, codeQuality: -5 } },
      ],
    },
  ],

  absurd: [
    {
      id: 'ab1',
      category: 'absurd',
      title: 'CRYPTO EXODUS',
      text: 'Bitcoin wzrósł 500%. Połowa zespołu to crypto-milionerzy. 3 wypowiedzenia w ciągu godziny.',
      options: [
        { text: 'Kontroferta finansowa, firma przelicza budżety.', effects: { sanity: -40, morale: -50, codeQuality: 0 } },
        { text: 'Gratuluję, życzę powodzenia...', effects: { sanity: 10, morale: -40, codeQuality: 0 } },
        { text: 'Praca to nie tylko $$$...', effects: { sanity: 15, morale: -30, codeQuality: 0 } },
      ],
    },
    {
      id: 'ab2',
      category: 'absurd',
      title: 'RUBBER DUCK WIN',
      text: 'Junior spędził 2 dni debugując. Rozwiązał problem tłumacząc go rubber duck. Duck był bardziej pomocny niż senior.',
      options: [
        { text: 'Kupuję rubber ducks dla wszystkich.', effects: { sanity: 20, morale: 15, codeQuality: 0 } },
        { text: 'Obowiązkowy rubber duck debugging.', effects: { sanity: 10, morale: 5, codeQuality: 5 } },
        { text: 'Zrób z Ducka tech lead-a, wychodzi na to samo.', effects: { sanity: 15, morale: 20, codeQuality: 0 } },
      ],
    },
    {
      id: 'ab3',
      category: 'absurd',
      title: 'KOT NA KLAWIATURZE',
      text: 'Kot devopsa przeszedł po klawiaturze. Przypadkiem zdeployował na produkcję. Wszystko działa lepiej niż przed.',
      options: [
        { text: 'Zatrudniamy kota.', effects: { sanity: 20, morale: 20, codeQuality: 5 } },
        { text: 'Revert, bo to nie przeszło code review.', effects: { sanity: 5, morale: -5, codeQuality: 10 } },
        { text: 'Zostawiamy. Kot wie co robi.', effects: { sanity: 15, morale: 15, codeQuality: -5 } },
      ],
    },
    {
      id: 'ab4',
      category: 'absurd',
      title: 'RAGE QUIT NA STANDUPIE',
      text: 'Senior wstał ze standupu, powiedział "mam dość tego cyrku", wyszedł. Wrócił po 10 minutach z kawą jakby nic się nie stało.',
      options: [
        { text: 'Udajemy że nic się nie stało. My też tak chcemy.', effects: { sanity: 10, morale: 5, codeQuality: 0 } },
        { text: 'Rozmowa 1:1 po standupie.', effects: { sanity: -5, morale: 10, codeQuality: 0 } },
        { text: 'Może on ma rację? Skracamy standup do 5 minut.', effects: { sanity: 15, morale: 15, codeQuality: 0 } },
      ],
    },
  ],
};

export const EVENT_CATEGORIES = Object.keys(RANDOM_EVENTS);
