export const EMPLOYEE_EVENTS = {
  backend: [
    {
      id: 'be1',
      text: '"Mój kod działa tylko na moim laptopie"',
      options: [
        { text: 'Dockeryzacja - stawiamy kontener.', effects: { sanity: -3, morale: -5, codeQuality: 5 } },
        { text: 'Fixuj lokalnie, niech działa.', effects: { sanity: -5, morale: 5, codeQuality: -10 } },
        { text: 'Badź poważny, przepisz od zera.', effects: { sanity: -8, morale: -10, codeQuality: 10 } },
      ],
    },
    {
      id: 'be2',
      text: '"Senior powiedział żebym przepisał wszystko na Rust"',
      options: [
        { text: 'STOP! Nie przepisujemy.', effects: { sanity: -4, morale: -15, codeQuality: 5 } },
        { text: 'Okej, ale masz 2 dni deadline.', effects: { sanity: -8, morale: 5, codeQuality: -10 } },
        { text: 'Niech będzie Rust... *pod nosem* Niepoważne to jest.', effects: { sanity: -15, morale: 10, codeQuality: -15 } },
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
        { text: 'Okej, ale przekaż taski.', effects: { sanity: -5, morale: 5, codeQuality: 0 } },
        { text: 'Nie możesz teraz.', effects: { sanity: -3, morale: -20, codeQuality: 0 } },
        { text: 'Bierz, odpoczynek jest ważny. Jakoś sobie poradzimy.', effects: { sanity: -7, morale: 15, codeQuality: -5 } },
      ],
    },
    {
      id: 'be5',
      text: '"Ten bug to nie bug, to feature"',
      options: [
        { text: 'To bug. Napraw.', effects: { sanity: -6, morale: -10, codeQuality: 15 } },
        { text: 'Known limitation, dokumentujemy i już.', effects: { sanity: -2, morale: 5, codeQuality: -10 } },
        { text: 'Dobra, przekonajmy PO że to feature.', effects: { sanity: -10, morale: 10, codeQuality: -15 } },
      ],
    },
    {
      id: 'be7',
      text: '"Napisałem mikroserwis do jednej funkcji. Ma własny Kubernetes cluster i 3 bazy danych"',
      options: [
        { text: 'Merge do innego serwisu, natychmiast!', effects: { sanity: -6, morale: -15, codeQuality: 10 } },
        { text: 'Niech zostanie, działa przecież.', effects: { sanity: -3, morale: 5, codeQuality: -15 } },
        { text: '3 bazy mówisz? Code review i uproszczenie.', effects: { sanity: -8, morale: -5, codeQuality: 10 } },
      ],
    },
    {
      id: 'be8',
      text: '"Test coverage spadło do 12%. Ktoś wyłączył testy, bo podbił wersję junita."',
      options: [
        { text: 'Migrujemy testy do nowej wersji, bez dyskusji', effects: { sanity: -5, morale: -10, codeQuality: 15 } },
        { text: 'Piszemy nowe, lepsze testy', effects: { sanity: -10, morale: -5, codeQuality: 10 } },
        { text: '12% to wystarczy... wywal te stare...', effects: { sanity: -2, morale: 5, codeQuality: -15 } },
      ],
    },
    {
      id: 'be6',
      glitch: true,
      text: '"Znalazłem dziwny plik w repo: observer_notes.md. W środku tylko: ATLAS - Access code for the aware... Co to znaczy?"',
      options: [
        { text: 'Pewnie easter egg, ignorujemy, nie ma czasu!', effects: { sanity: 0, morale: 0, codeQuality: 0 } },
        { text: 'Ciekawe, ATLAS... sprawdzę to później w konsoli...', effects: { sanity: 5, morale: 5, codeQuality: 0 } },
        { text: 'Usuń to, nie potrzebujemy tajemnic.', effects: { sanity: -5, morale: 0, codeQuality: 5 } },
      ],
    },
  ],
  frontend: [
    {
      id: 'fe1',
      text: '"Przepisujemy Angulara na Reacta. Połowa w Angular, połowa w React. Do tego ktoś dodał Sagę... Nikt nie wie jak to działa"',
      options: [
        { text: 'Dokończcie migrację, ale wywalcie Sagę.', effects: { sanity: -8, morale: -15, codeQuality: -5 } },
        { text: 'Wracamy do Angulara, revertujcie wszystko.', effects: { sanity: -5, morale: -20, codeQuality: -5 } },
        { text: 'Dobra, zostawcie tą Sagę skoro już jest...', effects: { sanity: -12, morale: 5, codeQuality: -20 } },
      ],
    },
    {
      id: 'fe2',
      text: '"Junior dodał redux-saga do formularza logowania. 500 linii zamiast 10"',
      options: [
        { text: 'Niech zostanie, działa.', effects: { sanity: -2, morale: 5, codeQuality: -15 } },
        { text: 'Przepisz normalnie', effects: { sanity: -6, morale: -10, codeQuality: 15 } },
        { text: 'Code review i wyjaśnienie', effects: { sanity: -4, morale: -5, codeQuality: 10 } },
      ],
    },
    {
      id: 'fe3',
      text: '"CSS nie działa na Safari. Na Chrome idealnie"',
      options: [
        { text: 'Fix dla Safari.', effects: { sanity: -6, morale: -5, codeQuality: 10 } },
        { text: 'Ignorujemy te 5% użytkowników.', effects: { sanity: 3, morale: 5, codeQuality: -10 } },
        { text: 'Warning banner dla Safari.', effects: { sanity: -2, morale: 0, codeQuality: -5 } },
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
        { text: '10% teraz, reszta za pół roku', effects: { sanity: -4, morale: -5, codeQuality: 0 } },
        { text: 'Porozmawiam z HR...', effects: { sanity: -8, morale: -10, codeQuality: 0 } },
        { text: 'Okej, załatwiam 30%', effects: { sanity: -12, morale: 20, codeQuality: 0 } },
      ],
    },
    {
      id: 'fe7',
      text: '"Bundle size: 47MB. Użytkownik czeka 30 sekund na załadowanie strony logowania"',
      options: [
        { text: 'Code splitting i lazy loading, to nie może tak działać.', effects: { sanity: -8, morale: -10, codeQuality: 15 } },
        { text: 'Dodajemy ładny loading spinner z samolotem, bedzie im lepiej', effects: { sanity: -2, morale: 5, codeQuality: -10 } },
        { text: 'Optymalizujemy importy, zawsze coś.', effects: { sanity: -5, morale: -5, codeQuality: 10 } },
      ],
    },
    {
      id: 'fe8',
      text: '"Storybook ma 200 komponentów. Na produkcji używamy 15. Reszta to warianty buttonów"',
      options: [
        { text: 'Przejrzymy je i usuniemy nieużywane.', effects: { sanity: -6, morale: -10, codeQuality: 10 } },
        { text: 'Zostaw, może się przydadzą.', effects: { sanity: -2, morale: 5, codeQuality: -10 } },
        { text: 'Design system od zera, zaczynamy.', effects: { sanity: -12, morale: -15, codeQuality: 15 } },
      ],
    },
    {
      id: 'fe6',
      glitch: true,
      text: '"Znalazłem w konsoli dziwny stack trace: reality.core.manager.awareness_test.run(). Nie mamy takiego modułu w kodzie. Co to jest?"',
      options: [
        { text: 'Pewnie z jakiejś biblioteki', effects: { sanity: 0, morale: 0, codeQuality: 0 } },
        { text: 'Pokaż mi to...', effects: { sanity: -5, morale: 5, codeQuality: 0 } },
        { text: 'Awareness test? Ciekawe... Nigdzie w kodzie tego nie ma?', effects: { sanity: 5, morale: 5, codeQuality: 0 } },
      ],
    },
  ],
  devops: [
    {
      id: 'do1',
      text: '"Kubernetes cluster wykłada się co 2 godziny"',
      options: [
        { text: 'Debugujemy i szukamy root cause.', effects: { sanity: -10, morale: -10, codeQuality: 15 } },
        { text: 'Workaround z restartami i stwórz taska na analizę.', effects: { sanity: -3, morale: 5, codeQuality: -10 } },
        { text: 'Skalujemy horyzontalnie, więcej nodów, wyłączcie alerty.', effects: { sanity: -5, morale: -5, codeQuality: -5 } },
      ],
    },
    {
      id: 'do2',
      text: '"Jenkins pipeline wywala się losowo. Czasem przechodzi, czasem nie"',
      options: [
        { text: 'Przepisujemy pipeline od zera.', effects: { sanity: -12, morale: -15, codeQuality: 15 } },
        { text: 'Dodajemy retry i idziemy na lunch.', effects: { sanity: -4, morale: 5, codeQuality: -10 } },
        { text: 'Migracja na GitHub Actions.', effects: { sanity: -8, morale: -5, codeQuality: 10 } },
      ],
    },
    {
      id: 'do3',
      text: '"Monitoring mówi że wszystko OK, ale userzy mówią że nie działa"',
      options: [
        { text: 'Naprawiamy monitoring i zobaczymy czy to prawda.', effects: { sanity: -6, morale: -5, codeQuality: 10 } },
        { text: 'Wierzymy userom, debug.', effects: { sanity: -10, morale: 5, codeQuality: 5 } },
        { text: 'Dodajemy więcej metryk.', effects: { sanity: -8, morale: -10, codeQuality: 10 } },
      ],
    },
    {
      id: 'do4',
      text: '"Terraform state się rozjechał z produkcją"',
      options: [
        { text: 'Rebuild state ręcznie. Trzeba było pilnować.', effects: { sanity: -15, morale: -15, codeQuality: 5 } },
        { text: 'Importujemy istniejące resource-y', effects: { sanity: -8, morale: -5, codeQuality: -5 } },
        { text: 'Restore z backupu sprzed release-a', effects: { sanity: -5, morale: 5, codeQuality: 0 } },
      ],
    },
    {
      id: 'do5',
      text: '"Docker registry pełny. 500GB obrazów, nikt nie wie które potrzebne"',
      options: [
        { text: 'Cleanup policy + kasujemy stare.', effects: { sanity: -6, morale: -5, codeQuality: 10 } },
        { text: 'Kupujemy więcej storage, a co!', effects: { sanity: -2, morale: 5, codeQuality: -5 } },
        { text: 'Migrujemy na ECR, w końcu mamy AWS.', effects: { sanity: -10, morale: -10, codeQuality: 5 } },
      ],
    },
    {
      id: 'do7',
      text: '"Ktoś zrobił kubectl delete namespace production. Nie pytaj kto... Okej, to byłem ja"',
      options: [
        { text: 'Restore z backupu, lekcja na przyszłość.', effects: { sanity: -10, morale: -5, codeQuality: 5 } },
        { text: 'RBAC i ograniczamy uprawnienia. Tak, Tobie też.', effects: { sanity: -8, morale: -15, codeQuality: 15 } },
        { text: '*długie, wymowne milczenie*', effects: { sanity: -15, morale: -10, codeQuality: 0 } },
      ],
    },
    {
      id: 'do8',
      text: '"Znalazłem sekrety w repo. Plaintext. Commit Yevhena sprzed dwóch lat. Nikt nie zauważył"',
      options: [
        { text: 'Rotujemy wszystkie klucze ASAP.', effects: { sanity: -10, morale: -10, codeQuality: 10 } },
        { text: 'Vault setup + git-secrets hook.', effects: { sanity: -8, morale: -5, codeQuality: 15 } },
        { text: 'Modlimy się że nikt inny nie widział.', effects: { sanity: -5, morale: 5, codeQuality: -10 } },
      ],
    },
    {
      id: 'do6',
      glitch: true,
      text: '"Logi pokazują dziwne requesty. Ktoś odpytuje endpoint /api/observer co 73.12 sekundy. Ale ten endpoint nie istnieje..."',
      options: [
        { text: 'Blokujemy IP.', effects: { sanity: -3, morale: 0, codeQuality: 5 } },
        { text: 'I nie ma 404? Interesujące... zbadajmy to.', effects: { sanity: 5, morale: 5, codeQuality: 0 } },
        { text: 'Ignorujemy, pewnie bot.', effects: { sanity: 0, morale: 0, codeQuality: 0 } },
      ],
    },
  ],
  po: [
    {
      id: 'po1',
      text: '"Klient chce zmienić scope. W połowie sprintu..."',
      options: [
        { text: 'Akceptujemy zmianę, to ważny feature.', effects: { sanity: -8, morale: -15, codeQuality: -5 } },
        { text: 'Odmawiamy - następny sprint, trzeba ich wychować.', effects: { sanity: -4, morale: 5, codeQuality: 5 } },
        { text: 'Kompromis - część teraz, część potem.', effects: { sanity: -6, morale: -5, codeQuality: 0 } },
      ],
    },
    {
      id: 'po2',
      text: '"OKRy się zmieniły. Zupełnie inny priorytet na Q2"',
      options: [
        { text: 'Zmieniamy kierunek natychmiast.', effects: { sanity: -10, morale: -20, codeQuality: -10 } },
        { text: 'Kończymy sprint, potem zmiana.', effects: { sanity: -5, morale: -5, codeQuality: 5 } },
        { text: 'Ignorujemy nowe OKR-y, dowieziemy to co jest.', effects: { sanity: -3, morale: 10, codeQuality: 0 } },
      ],
    },
    {
      id: 'po3',
      text: '"Klient grozi odejściem bez custom feature"',
      options: [
        { text: 'Robimy custom feature, klient chce.', effects: { sanity: -10, morale: -10, codeQuality: -15 } },
        { text: 'Proponujemy alternatywę', effects: { sanity: -6, morale: -5, codeQuality: 5 } },
        { text: 'Niech odchodzi, ten feature zajmie 5 sprint-ów.', effects: { sanity: -4, morale: 5, codeQuality: 10 } },
      ],
    },
    {
      id: 'po4',
      text: '"Konkurencja wypuściła feature który planowaliśmy za pół roku"',
      options: [
        { text: 'Gonimy rynek - ciśniemy.', effects: { sanity: -12, morale: -15, codeQuality: -15 } },
        { text: 'Robimy lepszą wersję, spokojnie.', effects: { sanity: -4, morale: 5, codeQuality: 10 } },
        { text: 'Zmiana kierunku - robimy coś innego.', effects: { sanity: -6, morale: -10, codeQuality: 0 } },
      ],
    },
    {
      id: 'po5',
      text: '"Zarząd chce raport. Dzisiaj. W slajdach. 20 stron"',
      options: [
        { text: 'Popierdoliło ich. Robię sam, zespół pracuje.', effects: { sanity: -15, morale: 5, codeQuality: 0 } },
        { text: 'Szybki raport na 5 slajdów. Tyle mogą dostać.', effects: { sanity: -5, morale: 0, codeQuality: 0 } },
        { text: 'Deleguję na juniora, i tak nic nie zrozumieją.', effects: { sanity: -3, morale: -10, codeQuality: 0 } },
      ],
    },
    {
      id: 'po6',
      text: '"Zmieniam priorytet. Znowu. Trzeci raz w tym tygodniu. Zarząd się nie może zdecydować"',
      options: [
        { text: 'Blokujemy zmiany do końca sprintu.', effects: { sanity: -4, morale: 10, codeQuality: 5 } },
        { text: 'Okej, zmieniamy, ale przynieś zespołowi ciasto za tydzień.', effects: { sanity: -10, morale: -15, codeQuality: -10 } },
        { text: 'Spotkanie z zarządem - ustalamy raz i tyle.', effects: { sanity: -8, morale: -5, codeQuality: 5 } },
      ],
    },
    {
      id: 'po7',
      text: '"Mam 47 user stories w backlogu. Wszystkie oznaczone jako P0. Które robimy pierwsze?"',
      options: [
        { text: 'Priorytetyzujemy razem, max 5 P0', effects: { sanity: -6, morale: 5, codeQuality: 5 } },
        { text: 'Robimy wszystkie naraz, i tak się opóźnią.', effects: { sanity: -15, morale: -20, codeQuality: -15 } },
        { text: 'Losujemy. Serio. Chcesz ktorymś obniżyć priorytet?', effects: { sanity: 5, morale: 10, codeQuality: -10 } },
      ],
    },
  ],
  junior: [
    {
      id: 'jr1',
      text: '"Nie rozumiem kodu seniora. Pytałem, powiedział - przeczytaj docs. Nie ma żadych docsów."',
      options: [
        { text: 'Code review session z seniorem.', effects: { sanity: -6, morale: 10, codeQuality: 5 } },
        { text: 'Mentoring session, pokaż co tam jest.', effects: { sanity: -4, morale: 5, codeQuality: 0 } },
        { text: 'Musisz sam się nauczyć, czytaj kod!', effects: { sanity: -2, morale: -15, codeQuality: -5 } },
      ],
    },
    {
      id: 'jr2',
      text: '"Pierwszy PR po 2 tygodniach. 51 komentarzy w review"',
      options: [
        { text: 'Konstruktywny feedback 1:1.', effects: { sanity: -8, morale: 10, codeQuality: 10 } },
        { text: 'Szczery ale ostry feedback.', effects: { sanity: -4, morale: -10, codeQuality: 15 } },
        { text: 'Approve, niech się uczy na produkcji.', effects: { sanity: -2, morale: 5, codeQuality: -15 } },
      ],
    },
    {
      id: 'jr3',
      text: '"AI ma halucynacje, każe użyć niestniejącej biblioteki. Co mam robić?"',
      options: [
        { text: 'Pair programming session, wykminicie to.', effects: { sanity: -10, morale: 15, codeQuality: 10 } },
        { text: 'Tu masz guavę, robi to samo i ma dokumentację.', effects: { sanity: -3, morale: -5, codeQuality: 5 } },
        { text: 'Robię za niego, na nikim nie można polegać.', effects: { sanity: -8, morale: -10, codeQuality: 5 } },
      ],
    },
    {
      id: 'jr4',
      text: '"Czy mogę dodać tę bibliotekę? Ma tylko 50 gwiazdek i ostatnia zmiana 2 lata temu, ale jest idealna"',
      options: [
        { text: 'Review razem ze mną: "Jak poznać, że to szajs?"', effects: { sanity: -6, morale: 5, codeQuality: 5 } },
        { text: 'Użyj sprawdzonej alternatywy, takich starych rzeczy sie nie używa.', effects: { sanity: -2, morale: -5, codeQuality: 10 } },
        { text: 'Okej, eksperymentuj, ale security issues bedą na ciebie.', effects: { sanity: -3, morale: 10, codeQuality: -10 } },
      ],
    },
    {
      id: 'jr5',
      text: '"Mam imposter syndrome. Czy ja się w ogóle nadaję?"',
      options: [
        { text: 'Mentoring i pozytywny feedback.', effects: { sanity: -5, morale: 20, codeQuality: 0 } },
        { text: 'To normalne, przejdzie, jedziemy.', effects: { sanity: -2, morale: 5, codeQuality: 0 } },
        { text: 'Twarda szkoła - musisz dowieźć.', effects: { sanity: -3, morale: -15, codeQuality: 5 } },
      ],
    },
    {
      id: 'jr7',
      text: '"Zrobiłem force push na main. Przepraszam. Nie wiedziałem co to robi"',
      options: [
        { text: 'Reflog i przywracamy, spokojnie. Ale nie rób tak więcej.', effects: { sanity: -6, morale: 5, codeQuality: 5 } },
        { text: 'Branch protection rules, teraz, devops!', effects: { sanity: -5, morale: -10, codeQuality: 15 } },
        { text: 'Jak... jak to w ogóle możliwe, że nie wiedziałeś?', effects: { sanity: -12, morale: -5, codeQuality: 0 } },
      ],
    },
    {
      id: 'jr8',
      text: '"Pisałem 3 dni feature. Właśnie się dowiedziałem że już istnieje. W innym module"',
      options: [
        { text: 'Porównamy oba i wybierzemy lepszy, team session.', effects: { sanity: -5, morale: 5, codeQuality: 5 } },
        { text: 'Twój jest lepszy, zamieniamy.', effects: { sanity: -3, morale: 15, codeQuality: -5 } },
        { text: 'Dokumentacja istnieje nie bez powodu...', effects: { sanity: -4, morale: -10, codeQuality: 0 } },
      ],
    },
    {
      id: 'jr6',
      glitch: true,
      text: '"Spędziłem 3 godziny scrollując TikToka zamiast debugować. A potem ten bug się sam naprawił. Jakby system czekał aż przestanę się rozpraszać. Dziwne, nie?"',
      options: [
        { text: 'Coincidence. Wracaj do pracy.', effects: { sanity: 0, morale: -5, codeQuality: 0 } },
        { text: 'Hmm... ciekawe. Opowiedz więcej.', effects: { sanity: -3, morale: 5, codeQuality: 0 } },
        { text: 'Może coś w tym jest...', effects: { sanity: 5, morale: 5, codeQuality: 0 } },
      ],
    },
  ],
};
