export const userInfoToApi = (object: any) => {
  return {
    name: object.Name,
    surname: object.Surname,
    telephone: object['Phone Number'],
    address: object.Street,
    zip: object['Zip Code'],
    city: object.City,
  };
};
