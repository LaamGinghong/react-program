import { readFileSync } from 'fs'

interface PackageJSON {
  name: string
  version: string
  [key: string]: any
}

function getPackageJSON(src: string) {
  const packageJson: PackageJSON = JSON.parse(readFileSync(src) as any)
  return packageJson
}

export default getPackageJSON
