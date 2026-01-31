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
        { text: 'Czekamy na AWS, komunikat do klientów', effects: { sanity: -20, morale: -15, codeQuality: 0 } },
        { text: 'Panikujemy i migrujemy na us-west-2', effects: { sanity: -30, morale: -25, codeQuality: 5 } },
        { text: 'Blame AWS publicznie na Twitterze', effects: { sanity: 5, morale: 10, codeQuality: -10 } },
      ],
    },
    {
      id: 'ch2',
      category: 'chaos',
      title: 'BILLING ALERT',
      text: 'Rachunek za AWS: $47,000. Ktoś zostawił 50 EC2 instancji po testach.',
      options: [
        { text: 'Płacimy i dodajemy cost monitoring', effects: { sanity: -15, morale: -5, codeQuality: 10 } },
        { text: 'Negocjujemy z AWS support', effects: { sanity: -25, morale: -10, codeQuality: 0 } },
        { text: 'Szukamy winnego', effects: { sanity: -10, morale: -30, codeQuality: 0 } },
      ],
    },
    {
      id: 'ch3',
      category: 'chaos',
      title: 'UPSTREAM DOWN',
      text: 'Serwis upstream padł. Hindusi deploy\'nęli w piątek o 18:00. Nie odpowiadają na Slacku.',
      options: [
        { text: 'Czekamy do poniedziałku', effects: { sanity: -25, morale: -20, codeQuality: 0 } },
        { text: 'Implementujemy workaround', effects: { sanity: -20, morale: -10, codeQuality: -15 } },
        { text: 'Budzimy ich managera o 3 w nocy', effects: { sanity: 5, morale: 10, codeQuality: 0 } },
      ],
    },
    {
      id: 'ch4',
      category: 'chaos',
      title: 'BREAKING CHANGE',
      text: 'Breaking API change w produkcji od upstream. Żadnego deprecation notice. Połowa funkcji nie działa.',
      options: [
        { text: 'Emergency hotfix po naszej stronie', effects: { sanity: -25, morale: -15, codeQuality: -20 } },
        { text: 'Eskalacja do ich leadership', effects: { sanity: -15, morale: -10, codeQuality: 0 } },
        { text: 'Tworzymy abstraction layer', effects: { sanity: -30, morale: -20, codeQuality: 10 } },
      ],
    },
    {
      id: 'ch5',
      category: 'chaos',
      title: 'INVESTOR DEMO',
      text: 'Investor chce zobaczyć demo. Za godzinę. Zoom link już wysłany. Połowa rzeczy nie działa.',
      options: [
        { text: 'Mock data i fake everything', effects: { sanity: -25, morale: -15, codeQuality: -20 } },
        { text: 'Pokażemy co działa, honest demo', effects: { sanity: -10, morale: 10, codeQuality: 0 } },
        { text: 'Przełożymy na jutro', effects: { sanity: -15, morale: -5, codeQuality: 0 } },
      ],
    },
    {
      id: 'ch6',
      category: 'chaos',
      title: 'SECURITY AUDIT',
      text: 'External security audit: 47 critical vulnerabilities. Newsletter poszedł do całej firmy. Board pyta.',
      options: [
        { text: 'Weekend crunch - fix all critical', effects: { sanity: -40, morale: -40, codeQuality: 30 } },
        { text: 'Priorytetyzujemy top 10', effects: { sanity: -20, morale: -15, codeQuality: 15 } },
        { text: 'Większość to false positives...', effects: { sanity: 5, morale: 5, codeQuality: -10 } },
      ],
    },
  ],

  oncall: [
    {
      id: 'on1',
      category: 'oncall',
      title: 'PAGERDUTY ALERT',
      text: 'Pager o 3:24 AM. Production database 99% full. ETA to disaster: 30 minut.',
      options: [
        { text: 'Rozwiązuję sam, zespół śpi', effects: { sanity: -40, morale: 5, codeQuality: 0 } },
        { text: 'Budzę zespół, wszyscy na pokład', effects: { sanity: -20, morale: -30, codeQuality: 5 } },
        { text: 'Ignoruję do rana...', effects: { sanity: -10, morale: -20, codeQuality: -25 } },
      ],
    },
    {
      id: 'on2',
      category: 'oncall',
      title: 'EXCEPTION STORM',
      text: '10,000 exceptions w ciągu minuty. Monitoring płonie. Slack nie nadąża z alertami.',
      options: [
        { text: 'Kill switch - disable feature', effects: { sanity: -15, morale: -20, codeQuality: 0 } },
        { text: 'Rollback do previous version', effects: { sanity: -10, morale: -10, codeQuality: 0 } },
        { text: 'Debug na żywo w produkcji', effects: { sanity: -35, morale: -15, codeQuality: 10 } },
      ],
    },
    {
      id: 'on3',
      category: 'oncall',
      title: 'SECURITY BREACH',
      text: 'Ktoś commit\'nął API key do publicznego repo. 20 minut temu. Boty już próbują się włamać.',
      options: [
        { text: 'PANIC MODE - regeneruj wszystko', effects: { sanity: -30, morale: -25, codeQuality: 15 } },
        { text: 'Rotate keys według procedure', effects: { sanity: -15, morale: -10, codeQuality: 10 } },
        { text: 'Temporary IP blocking', effects: { sanity: -10, morale: -5, codeQuality: -5 } },
      ],
    },
    {
      id: 'on4',
      category: 'oncall',
      title: 'MEMORY LEAK',
      text: 'Memory usage: 8GB → 16GB → 24GB. Serwery crashują jeden po drugim.',
      options: [
        { text: 'Restart all, repeat co godzinę', effects: { sanity: -25, morale: -15, codeQuality: -10 } },
        { text: 'Profile na produkcji', effects: { sanity: -35, morale: -20, codeQuality: 20 } },
        { text: 'Scale horizontal - więcej serwerów', effects: { sanity: -15, morale: -10, codeQuality: -5 } },
      ],
    },
    {
      id: 'on5',
      category: 'oncall',
      title: 'SSL EXPIRED',
      text: 'SSL certificate expired o 2 AM. Website pokazuje security warning. Users blocked.',
      options: [
        { text: 'Renew certificate ASAP', effects: { sanity: -20, morale: -15, codeQuality: 0 } },
        { text: 'Setup auto-renewal na przyszłość', effects: { sanity: -15, morale: -10, codeQuality: 15 } },
        { text: 'Blame DevOps publicznie', effects: { sanity: 5, morale: -30, codeQuality: 0 } },
      ],
    },
  ],

  absurd: [
    {
      id: 'ab1',
      category: 'absurd',
      title: 'CRYPTO EXODUS',
      text: 'Bitcoin wzrósł 500%. Połowa zespołu to crypto-millionaires. 3 wypowiedzenia w ciągu godziny.',
      options: [
        { text: 'Kontroferta finansowa', effects: { sanity: -40, morale: -50, codeQuality: 0 } },
        { text: 'Gratuluję, życzę powodzenia', effects: { sanity: 10, morale: -40, codeQuality: 0 } },
        { text: 'Praca to nie tylko $$$...', effects: { sanity: 15, morale: -30, codeQuality: 0 } },
      ],
    },
    {
      id: 'ab2',
      category: 'absurd',
      title: 'RUBBER DUCK WIN',
      text: 'Junior spędził 2 dni debugując. Rozwiązał problem tłumacząc go rubber ducky. Duck był bardziej pomocny niż senior.',
      options: [
        { text: 'Kupuję rubber ducks dla wszystkich', effects: { sanity: 20, morale: 15, codeQuality: 0 } },
        { text: 'Mandate rubber duck debugging', effects: { sanity: 10, morale: 5, codeQuality: 5 } },
        { text: 'Promote duck to Tech Lead', effects: { sanity: 15, morale: 20, codeQuality: 0 } },
      ],
    },
  ],
};

export const EVENT_CATEGORIES = Object.keys(RANDOM_EVENTS);
