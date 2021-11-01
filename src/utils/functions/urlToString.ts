export function urlToString(value: string) {
  let split = value.split('-');
  for (var i: number = 0; i < split.length; i++) {
    split[i] = split[i][0].toUpperCase() + split[i].slice(1);
  }
  return split.join(' ');
}
