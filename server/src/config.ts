import fs from 'fs'

let config: {
  dev: boolean
  database: {
    connectionString: string
  }
  user: {
    username: string
    password: string
  }
}

export const initConfig = async () => {
  const configJSON = fs.readFileSync(__dirname + '/../config.json', 'utf8')

  config = JSON.parse(configJSON)
}

export const getConfig = () => {
  return config
}
