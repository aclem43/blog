import { Router } from 'express'
import { getImage, getImages, getPost, getPosts, insertImage, insertPost } from './database/db'
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

router.post('/post', (req, res) => {
  console.log(req.body)
  if (!req.body.title || !req.body.description || !req.body.content) {
    res.status(400).send('Missing required fields')
  }
  insertPost(req.body.title, req.body.description, req.body.content, req.body.image)

  res.status(200).send('Post created')
})

router.get('/posts', (req, res) => {
  getPosts().then((posts) => {
    res.send(posts)
  })
})

router.get('/post/:id', (req, res) => {
  getPost(parseInt(req.params.id, 10)).then((post) => {
    if (!post) {
      res.status(404).send('Post not found')
    } else {
      res.status(200).send(post)
    }
  })
})

export default router
