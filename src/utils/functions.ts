export const getDate = (date: Date) => {
  if (!date) date = new Date()

  return `${date.getDate()}/${date.getMonth() + 1} ${date.getHours()}/${date.getMinutes()}`
}