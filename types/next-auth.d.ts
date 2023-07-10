declare module 'next-auth' {
  interface Session {
    user: {
      email: string
      username: string
      id: string
      username: string
      bio: string
      name: string
      password: string
    }
  }
  interface User {
    id: string
    username: string
    bio: string
    _id: string
    followers: User[]
    following: User[]
  }

  interface PostAttributes {
    _id: string
    userId: string
    postValue: string
    data_time: string
    username: string
    usersWhoLiked: string[]
  }

  interface CommentAttributes {
    _id?: string
    data_time: Date
    commentValue: string
    postId: string | string[] | undefined
    userId: string | undefined
  }

  interface EditUserInfoAttributes {
    name?: string
    bio?: string
    oldPassword?: string
    newPassword?: string
  }
}

export { CommentAttributes, EditUserInfoAttributes, PostAttributes, Session, User }
