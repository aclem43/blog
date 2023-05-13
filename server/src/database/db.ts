import mssql from 'mssql'
import { logger } from '../logger'
import fs from 'fs'
import { FileMimeType } from '../mimetypes'

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
        imageURL VARCHAR(MAX) NOT NULL,
        description VARCHAR(255),
        )
    `)
  const dir = __dirname + '../../images/'
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
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

export const getImage = async (id: number) => {
  const result = await sql.query`select * from images where id = ${id}`
  return result.recordset[0]
}

export const insertImage = async (path: string, mimeType: string) => {
  const fileExtension = FileMimeType[mimeType]
  const newFileName = __dirname + '../../images/' + (await getNextImageId()) + '.' + fileExtension
  fs.renameSync(path, newFileName)
  const result = await sql.query`insert into images (imageURL) values (${newFileName})`
  return
}

export const deleteImage = async (id: number) => {
  const result = await sql.query`delete from images where id = ${id}`
  return result.recordset[0]
}

export const getNextImageId = async () => {
  const result = await sql.query`select max(id) as maxId from images`
  return result.recordset[0].maxId + 1
}
