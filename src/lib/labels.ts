import type {
  TournamentStatus,
  TournamentFormat,
  Discipline,
  RegistrationStatus,
  HeatStatus,
} from "@/lib/types";

export const tournamentStatusLabel: Record<TournamentStatus, string> = {
  draft: "Черновик",
  published: "Анонс",
  registration_open: "Регистрация открыта",
  registration_closed: "Регистрация закрыта",
  ongoing: "Идёт",
  finished: "Завершён",
  cancelled: "Отменён",
};

export const tournamentStatusVariant: Record<
  TournamentStatus,
  "neutral" | "success" | "warning" | "info" | "danger" | "accent"
> = {
  draft: "neutral",
  published: "info",
  registration_open: "success",
  registration_closed: "warning",
  ongoing: "accent",
  finished: "neutral",
  cancelled: "danger",
};

export const formatLabel: Record<TournamentFormat, string> = {
  time_trial: "Time Trial",
  elimination: "Elimination",
  round_robin: "Round Robin",
  mixed: "Mixed",
};

export const disciplineLabel: Record<Discipline, string> = {
  freestyle_race: "Freestyle Race",
  multi_class: "Multi-class",
  class_5inch: "Класс 5\"",
  cinewhoop: "Cinewhoop",
  tinywhoop: "Tinywhoop",
};

export const registrationStatusLabel: Record<RegistrationStatus, string> = {
  pending: "На рассмотрении",
  approved: "Подтверждена",
  rejected: "Отклонена",
  waitlist: "Лист ожидания",
  cancelled: "Отменена",
};

export const registrationStatusVariant: Record<
  RegistrationStatus,
  "neutral" | "success" | "warning" | "info" | "danger" | "accent"
> = {
  pending: "warning",
  approved: "success",
  rejected: "danger",
  waitlist: "info",
  cancelled: "neutral",
};

export const heatStatusLabel: Record<HeatStatus, string> = {
  scheduled: "Запланирован",
  running: "Идёт",
  finished: "Завершён",
  cancelled: "Отменён",
};
