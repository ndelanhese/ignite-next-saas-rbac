export const getNameInitials = (fullName: string): string => {
  const names = fullName.split(' ')
  const firstNameInitial = names[0].charAt(0).toUpperCase()
  const lastNameInitial =
    names.length > 1 ? names[names.length - 1].charAt(0).toUpperCase() : ''
  return `${firstNameInitial}${lastNameInitial}`
}
