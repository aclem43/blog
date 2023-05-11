import mssql from 'mssql'
import { logger } from '../logger'

const sql = mssql

const connect = async () => {
  try {
    await sql.connect(
      'Server=localhost,1433;Database=blog;User Id=sa;Password=AO7gupRfmN;Encrypt=false'
    )
    logger.log('Connected to database')
  } catch (err) {
    logger.log('Failed to connect to database')
    logger.error(err)
  }
}

export const initilizeDatabase = async () => {
  await connect()
  await initilizeBlogPostTable()
  await initImagesTable()
}

const initilizeBlogPostTable = async () => {
  await sql.query(`
        IF OBJECT_ID('blog_posts', 'U') IS NULL
        CREATE TABLE blog_posts (
        id INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        descriptionBody VARCHAR(255) NOT NULL,
        imageId INT,
        )
    `)
  logger.log('Initialized blog_posts table')
}

const initImagesTable = async () => {
  await sql.query(`
        IF OBJECT_ID('images', 'U') IS NULL
        CREATE TABLE images (
        id INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
        image VARBINARY(MAX) NOT NULL,
        )
    `)
  logger.log('Initialized images table')
}

export const getPosts = async () => {
  const result = await sql.query`select * from blog_posts`
  return result.recordset
}

export const getPost = async (id: number) => {
  const result = await sql.query`select * from blog_posts where id = ${id}`
  return result.recordset[0]
}
