export function stringToUrl(value: string) {
  return value.toLowerCase().split(' ').join('-');
}
