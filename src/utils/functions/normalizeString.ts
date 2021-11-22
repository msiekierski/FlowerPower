const normalizeString = (str: string): string => {
  const polish = ['ą', 'ć', 'ę', 'ł', 'ń', 'ó', 'ś', 'ź', 'ż'];
  const substitutes = ['a', 'c', 'e', 'l', 'n', 'o', 's', 'z', 'z'];
  return str
    .split('')
    .map((letter) => {
      if (polish.indexOf(letter) >= 0) {
        return substitutes[polish.indexOf(letter)];
      } else return letter;
    })
    .join('');
};

export default normalizeString;
