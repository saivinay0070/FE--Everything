export type AskRequest = {
  question: string;
};

export type AskResponse = {
  answer: string;
};

export type NotificationItem = {
  type: "now" | "focus" | "wind-down";
  title: string;
  message: string;
};

export type NotificationsResponse = {
  now: string;
  location: string;
  cards: NotificationItem[];
};
