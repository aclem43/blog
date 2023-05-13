import { Router } from 'express'
import { getImage, getImages, insertImage } from './database/db'
import multer from 'multer'
import path from 'path'
const upload = multer({ dest: 'uploads/' })

const router = Router()

router.get('/', (req, res) => {
  res.send('Api')
})

router.get('/image/:id', async (req, res) => {
  const image = await getImage(parseInt(req.params.id, 10))
  if (!image) {
    res.status(404).send('Image not found')
  } else {
    res.sendFile(path.resolve(image.imageURL))
  }
})

router.post('/image', upload.single('file'), (req, res) => {
  insertImage(req.file.path, req.file.mimetype)
  res.status(200).send('Image uploaded')
})

router.get('/images', async (req, res) => {
  const images = await getImages()
  res.send(images)
})

export default router
