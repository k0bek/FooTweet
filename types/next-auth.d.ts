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
    _id?: string
    followers: User[]
    following: User[]
    backgroundImage?: string
    profileImage?: string
  }

  interface PostAttributes {
    _id: string
    userId: string
    postValue: string
    data_time: string
    username: string
    usersWhoLiked: string[]
    postImage: string
    profileImage: string
    name: string
  }

  interface CommentAttributes {
    _id?: string
    data_time: Date
    commentValue: string
    postId: string | string[] | undefined
    userId: string | undefined
    name: string
    username: string
    profileImage: string
  }

  interface EditUserInfoAttributes {
    name?: string
    bio?: string
    oldPassword?: string
    newPassword?: string
  }
}

export { CommentAttributes, EditUserInfoAttributes, PostAttributes, Session, User }
