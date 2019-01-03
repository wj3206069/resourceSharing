const RoleKey = 'userInfo'

export function getRoles() {
  const token = sessionStorage.getItem(RoleKey)
  if (token && token !== '') {
    return JSON.parse(token)
  } else {
    return token
  }
}

export function setRoles(token) {
  return sessionStorage.setItem(RoleKey, token)
}

export function removeRoles() {
  return sessionStorage.removeItem(RoleKey)
}
