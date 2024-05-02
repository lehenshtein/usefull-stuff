export function getAbbreviation(timeZone: string) {
  return getFormattedElement(timeZone, 'timeZoneName', 'short')
}

export function getOffset(timeZone: string) {
  return getFormattedElement(timeZone, 'timeZoneName', 'longOffset')
}

export function dateWithTimezone(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'medium',
    timeZone,
  }).format(date);
}
// year: "numeric",
//   month: "2-digit",
//   day: "2-digit",
//   hour: "2-digit",
//   minute: "2-digit",
//   second: "2-digit",
//   hour12: false,
//   timeZoneName: "shortOffset",
//   timeZone,

function getFormattedElement(timeZone: string, name: string, value: string) {
  return (new Intl.DateTimeFormat('en', {
    [name]: value,
    timeZone
  }).formatToParts().find(el => el.type === name) || {}).value;
}
