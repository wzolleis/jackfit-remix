import { DateTime } from "luxon";

const format = (date: Date): string => {
  return DateTime.fromJSDate(date).toFormat("dd.MM.yyyy HH:mm");
};

const parse = (text: string | null | undefined): Date | undefined => {
  if (!text) return undefined;
  return DateTime.fromFormat(text, "dd.MM.yyyy HH:mm").toJSDate();
};

export default {
  format,
  parse
};