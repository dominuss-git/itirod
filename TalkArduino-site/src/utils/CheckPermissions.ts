import { Permissions } from "../routes/routes"

export const checkPermissions = (need: Array<Permissions>, exist: Array<Permissions>): boolean => {
  if (need.length === 0) return true

  return need.reduce((acc: boolean, permission) => {
    if (acc) {
      if (!exist.includes(permission)) {
        acc = false;
      }
    }
    return acc
  }, true)
}
