const dateOptionCommon = { year: "numeric", month: "numeric", day: "numeric" };
const dateOptionComments = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
export const dateTimeCommon = new Intl.DateTimeFormat("ru-Ru", dateOptionCommon);
export const dateTimeComments = new Intl.DateTimeFormat("ru-Ru", dateOptionComments);