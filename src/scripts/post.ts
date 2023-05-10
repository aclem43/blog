export interface BasePost {
  id: number
  title: string
  descriptionBody: string
  image?: { url: string; height: number; cover: boolean }
}

export interface Post extends BasePost {
  content: {
    body: string
    media: { id: number; link: string }[]
  }
}

export const mockPostRequest = (): Post[] => {
  const posts = [
    {
      id: 1,
      title: 'Post 1',
      image: { url: 'https://picsum.photos/200/600', height: 200, cover: true },
      descriptionBody: 'Description post 1',
      content: {
        body: 'Body post 1',
        media: [
          {
            id: 1,
            link: 'https://picsum.photos/200/300'
          },
          {
            id: 2,
            link: 'https://picsum.photos/200/300'
          }
        ]
      }
    },
    {
      id: 2,
      title: 'Post 2',
      descriptionBody: 'Description post 2',
      content: {
        body: 'Body post 2',
        media: [
          {
            id: 3,
            link: 'https://picsum.photos/200/300'
          }
        ]
      }
    }
  ]
  return posts
}
