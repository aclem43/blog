import mssql from 'mssql'
import { logger } from '../logger'
import fs from 'fs'
import { FileMimeType } from '../mimetypes'
import { getConfig } from '../config'

const sql = mssql

const connect = async () => {
  try {
    await sql.connect(getConfig().database.connectionString)
    logger.log('Connected to database')
  } catch (err) {
    logger.error('Failed to connect to database')
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
        description VARCHAR(MAX) NOT NULL,
        content VARCHAR(MAX) NOT NULL,
        imageId INT,
        date DATETIME NOT NULL DEFAULT GETDATE(),
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
        post TINYINT,
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

export const insertPost = async (
  title: string,
  description: string,
  content: string,
  imageId: number
) => {
  await sql.query`insert into blog_posts (title, description, content, imageId) values (${title}, ${description}, ${content}, ${imageId})`
}

export const getImages = async () => {
  const result = await sql.query`select * from images`
  for (const image of result.recordset) {
    image.imageURL = '/api/image/' + image.id
  }
  return result.recordset
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
