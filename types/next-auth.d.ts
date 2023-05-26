declare module 'next-auth' {
  interface Session {
    user: {
      email: string;
      username: string;
      id: string;
      username: string;
      bio: string;
      name: string;
      password: string;
    };
  }
  interface User {
    id: string;
    username: string;
    bio: string;
  }

  interface PostAttributes {
    _id: string;
    userId: string;
    postValue: string;
    data_time: string;
    username: string;
  }

  interface CommentAttributes {
    _id?: string;
    data_time: Date;
    commentValue: string;
    username: string | undefined;
    postId: string | string[] | undefined;
  }

  interface EditUserInfoAttributes {
    name?: string;
    bio?: string;
    oldPassword?: string;
    newPassword?: string;
  }
}

export { CommentAttributes, EditUserInfoAttributes, PostAttributes, Session, User };
