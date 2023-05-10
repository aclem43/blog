export interface BasePost {
  id: number
  title: string
  descriptionBody: string
  image?: { url: string; height: number; cover: boolean }
}

export interface Post extends BasePost {
  content: {
    body: string
  }
}

export const mockPostRequest = (): Post[] => {
  const posts = [
    {
      id: 1,
      title: 'Post 1',
      image: { url: 'https://picsum.photos/600/200', height: 200, cover: true },
      descriptionBody: 'Description post 1',
      content: {
        body: '# TEst\n ## Test\n ![foo](https://picsum.photos/200/600 "foo")'
      }
    },
    {
      id: 2,
      title: 'Post 2',
      descriptionBody: 'Description post 2',
      content: {
        body: 'Body post 2'
      }
    }
  ]
  return posts
}

export const getPost = (id: number): Post => {
  const posts = mockPostRequest()

  const post = posts.find((post) => post.id === id)
  if (!post) {
    throw new Error('Post not found')
  }
  return post
}
