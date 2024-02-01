export const dateFormatter = (timestamp: number | string) => {
  const date = new Date(+timestamp);
  const formattedDate = date.toISOString().split("T")[0];
  return formattedDate;
};
