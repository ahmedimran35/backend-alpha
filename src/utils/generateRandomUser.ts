const generateRandomNumber = (): number => {
  return Math.floor(10000 + Math.random() * 90000)
}

export const userNameGenerator = (name: string) => {
  const randomNumber = generateRandomNumber()
  const userName = `${name}${randomNumber}`
  return userName
}

// create a userName generator function for auth - robiul
export const generateUserName = (name: string): string => {
  const randomNumber = generateRandomNumber();
  const userName = `${name} ${randomNumber}`.replace(/\s+/g, '-').toLowerCase();
  return userName;
}