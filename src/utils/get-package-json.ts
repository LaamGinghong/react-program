import { readFileSync } from 'fs'

interface PackageJSONOptions {
  name: string
  version: string
  [key: string]: any
}

function getPackageJSON(dir: string) {
  const packageJSON: PackageJSONOptions = JSON.parse(
    readFileSync(`${dir}/package.json`) as any,
  )
  return packageJSON
}

export default getPackageJSON
