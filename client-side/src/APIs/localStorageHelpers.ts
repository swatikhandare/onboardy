export const getResourceFromLocalStorage = <T>(name: string): T => {
  if (!localStorage.getItem(name)) {
    localStorage.setItem(name, "[]")
  }
  return JSON.parse(localStorage.getItem(name) || "")
}

export const setResourceAtLocalStorage = <T>(name: string, data: T) => {
  localStorage.setItem(name, JSON.stringify(data))
}