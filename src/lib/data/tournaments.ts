import type { Tournament, Heat, Season } from "@/lib/types";

export const seasons: Season[] = [
  {
    id: "s2026",
    title: "Сезон 2026",
    startsAt: "2026-01-15",
    endsAt: "2026-12-15",
    isActive: true,
  },
  {
    id: "s2025",
    title: "Сезон 2025",
    startsAt: "2025-01-20",
    endsAt: "2025-12-10",
    isActive: false,
  },
];

export const tournaments: Tournament[] = [
  {
    id: "t1",
    slug: "moscow-spring-cup-2026",
    title: "Moscow Spring Cup 2026",
    subtitle: "Открытие сезона: первый этап российской лиги",
    coverUrl:
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=1600&q=70",
    description:
      "Открытие сезона 2026. Закрытый трасса с 12 воротами, два дня квалификаций и финальный день элиминации. Призовой фонд от партнёров лиги.",
    rules:
      "Класс 5 дюймов, ограничение мощности 6S, обязательный whoop-style fail-safe. Полная редакция — в правилах лиги v3.2.",
    format: "elimination",
    discipline: "class_5inch",
    location: "Москва, ARENA Sport Hall",
    startsAt: "2026-05-09T10:00:00+03:00",
    endsAt: "2026-05-10T19:00:00+03:00",
    registrationOpensAt: "2026-03-15T09:00:00+03:00",
    registrationClosesAt: "2026-04-25T23:59:00+03:00",
    maxParticipants: 32,
    seatsTaken: 21,
    status: "registration_open",
    seasonId: "s2026",
    organizerName: "Российская лига дрон-рейсинга",
    prizePool: "350 000 ₽",
    entryFee: "3 500 ₽",
  },
  {
    id: "t2",
    slug: "spb-night-grand-prix",
    title: "St. Petersburg Night GP",
    subtitle: "Ночная гонка с подсветкой ворот",
    coverUrl:
      "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1600&q=70",
    description:
      "Уникальный формат: ночные заезды с LED-разметкой трассы. Только пилоты с опытом ночных полётов.",
    rules:
      "Открытый класс. Допуск только пилотов с подтверждённым опытом ночных полётов. Обязательны navigation-light модули.",
    format: "round_robin",
    discipline: "class_5inch",
    location: "Санкт-Петербург, Лахта Центр (площадка)",
    startsAt: "2026-06-21T20:00:00+03:00",
    endsAt: "2026-06-22T01:00:00+03:00",
    registrationOpensAt: "2026-04-01T09:00:00+03:00",
    registrationClosesAt: "2026-06-10T23:59:00+03:00",
    maxParticipants: 24,
    seatsTaken: 9,
    status: "registration_open",
    seasonId: "s2026",
    organizerName: "Polar Drones Club",
    prizePool: "200 000 ₽",
    entryFee: "Бесплатно",
  },
  {
    id: "t3",
    slug: "kazan-multiclass-open",
    title: "Kazan Multi-Class Open",
    subtitle: "Турнир в трёх классах за один уикенд",
    coverUrl:
      "https://images.unsplash.com/photo-1521405617584-1d9867ec2e15?auto=format&fit=crop&w=1600&q=70",
    description:
      "Три класса (5 дюймов, cinewhoop, tinywhoop) — три параллельных зачёта. Один из крупнейших региональных турниров.",
    rules: "Регламент мультиклассового зачёта. Подробности в стартовом пакете.",
    format: "mixed",
    discipline: "multi_class",
    location: "Казань, Innopolis Arena",
    startsAt: "2026-07-12T11:00:00+03:00",
    endsAt: "2026-07-13T18:00:00+03:00",
    registrationOpensAt: "2026-05-01T09:00:00+03:00",
    registrationClosesAt: "2026-07-01T23:59:00+03:00",
    maxParticipants: 48,
    seatsTaken: 0,
    status: "published",
    seasonId: "s2026",
    organizerName: "Volga Racing League",
    prizePool: "500 000 ₽",
    entryFee: "4 000 ₽",
  },
  {
    id: "t4",
    slug: "siberian-time-trial",
    title: "Siberian Time Trial",
    subtitle: "Квалификация на лучший круг",
    coverUrl:
      "https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&w=1600&q=70",
    description:
      "Один день, одна трасса, один лучший круг. Чистый time-trial формат для перфекционистов.",
    rules: "Каждый пилот получает 5 попыток. В зачёт идёт лучший круг.",
    format: "time_trial",
    discipline: "class_5inch",
    location: "Новосибирск, Аэродром «Северный»",
    startsAt: "2026-08-15T10:00:00+07:00",
    endsAt: "2026-08-15T18:00:00+07:00",
    registrationOpensAt: "2026-06-15T09:00:00+07:00",
    registrationClosesAt: "2026-08-01T23:59:00+07:00",
    maxParticipants: 20,
    seatsTaken: 0,
    status: "published",
    seasonId: "s2026",
    organizerName: "Siberian Wings",
    prizePool: "150 000 ₽",
    entryFee: "2 000 ₽",
  },
  {
    id: "t5",
    slug: "winter-indoor-2026",
    title: "Winter Indoor Championship",
    subtitle: "Завершающий этап зимнего инвестрования",
    coverUrl:
      "https://images.unsplash.com/photo-1589903308904-1010c2294adc?auto=format&fit=crop&w=1600&q=70",
    description:
      "Закрытый зимний турнир. Только tinywhoop класс. Безопасный формат для городских залов.",
    rules: "Класс tinywhoop, до 65мм, защитные канопи обязательны.",
    format: "elimination",
    discipline: "tinywhoop",
    location: "Москва, Loft Hall #5",
    startsAt: "2026-02-08T12:00:00+03:00",
    endsAt: "2026-02-08T20:00:00+03:00",
    registrationOpensAt: "2025-12-15T09:00:00+03:00",
    registrationClosesAt: "2026-01-30T23:59:00+03:00",
    maxParticipants: 16,
    seatsTaken: 16,
    status: "finished",
    seasonId: "s2026",
    organizerName: "Indoor FPV Russia",
    prizePool: "80 000 ₽",
  },
  {
    id: "t6",
    slug: "krasnodar-cinewhoop-jam",
    title: "Krasnodar Cinewhoop Jam",
    subtitle: "Соревнование по плавности и точности",
    coverUrl:
      "https://images.unsplash.com/photo-1452802447250-470a88ac82bc?auto=format&fit=crop&w=1600&q=70",
    description:
      "Cinewhoop-формат: оценивается не только время, но и плавность пролёта. Мнение жюри + хронометраж.",
    rules: "Cinewhoop класс. Регламент хроно + субъективная оценка плавности (3 судьи).",
    format: "round_robin",
    discipline: "cinewhoop",
    location: "Краснодар, Парк Галицкого",
    startsAt: "2026-09-05T10:00:00+03:00",
    endsAt: "2026-09-06T17:00:00+03:00",
    registrationOpensAt: "2026-07-01T09:00:00+03:00",
    registrationClosesAt: "2026-08-25T23:59:00+03:00",
    maxParticipants: 24,
    seatsTaken: 0,
    status: "draft",
    seasonId: "s2026",
    organizerName: "South Storm Club",
    prizePool: "120 000 ₽",
    entryFee: "2 500 ₽",
  },
];

export const heats: Heat[] = [
  {
    id: "h1",
    tournamentId: "t1",
    round: 1,
    label: "Квалификация · Heat 1",
    scheduledAt: "2026-05-09T10:30:00+03:00",
    status: "scheduled",
    pilotIds: ["p1", "p2", "p3", "p4"],
  },
  {
    id: "h2",
    tournamentId: "t1",
    round: 1,
    label: "Квалификация · Heat 2",
    scheduledAt: "2026-05-09T11:00:00+03:00",
    status: "scheduled",
    pilotIds: ["p5", "p6", "p7", "p8"],
  },
  {
    id: "h3",
    tournamentId: "t1",
    round: 2,
    label: "Полуфинал A",
    scheduledAt: "2026-05-10T15:00:00+03:00",
    status: "scheduled",
    pilotIds: ["p1", "p3", "p6", "p8"],
  },
  {
    id: "h4",
    tournamentId: "t1",
    round: 2,
    label: "Полуфинал B",
    scheduledAt: "2026-05-10T15:45:00+03:00",
    status: "scheduled",
    pilotIds: ["p2", "p4", "p5", "p7"],
  },
  {
    id: "h5",
    tournamentId: "t1",
    round: 3,
    label: "Финал",
    scheduledAt: "2026-05-10T18:00:00+03:00",
    status: "scheduled",
    pilotIds: [],
  },
];

export function getTournamentBySlug(slug: string): Tournament | undefined {
  return tournaments.find((t) => t.slug === slug);
}

export function getTournamentById(id: string): Tournament | undefined {
  return tournaments.find((t) => t.id === id);
}

export function getHeatsForTournament(tournamentId: string): Heat[] {
  return heats.filter((h) => h.tournamentId === tournamentId);
}

export function getActiveSeason(): Season {
  return seasons.find((s) => s.isActive) ?? seasons[0];
}
