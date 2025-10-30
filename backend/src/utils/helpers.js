const generateBookingReference = () => {
  const prefix = "HUF";
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  const randomChars = Math.random().toString(36).substring(2, 4).toUpperCase();
  return `${prefix}${randomNum}${randomChars}`;
};

export default generateBookingReference