export const convertToDate = (date: string) => {
  date = date.replace(/T|Z/g, ' ')
  console.log(date)

  const [year, month, day] = date.split(' ')[0].split('-')
  const [hour, minute, second] = date.split(' ')[1].split(':')
  return new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hour),
    Number(minute),
    Number(second)
  )
}
