import db from './connector'

const authorsCollenction = db.collection('authors')
const postsCollection = db.collection('posts')

const getDocIfExists = (doc) => {
  if (doc.exists) {
    return doc.data()
  }
  return null
}

const resolvers = {
  Query: {
    allAuthors: () => authorsCollenction.get()
      .then(snap => snap.docs.map(d => d.data())),
    authorByName: (parent, { firstName, lastName }) => {
      if (firstName && !lastName) {
        return authorsCollenction
          .where('firstName', '==', firstName)
          .get()
          .then(snap => snap.docs.map(d => d.data()))
      } else if (lastName && !firstName) {
        return authorsCollenction
          .where('lastName', '==', lastName)
          .get()
          .then(snap => snap.docs.map(d => d.data()))
      } else if (firstName && lastName) {
        return authorsCollenction
          .where('firstName', '==', firstName)
          .where('lastName', '==', lastName)
          .get()
          .then(snap => snap.docs.map(d => d.data()))
      }
      return null
    },
    authorById: (parent, { id }) => authorsCollenction.doc(id).get()
      .then(getDocIfExists),
    allPosts: () => postsCollection.get()
      .then(snap => snap.docs.map(d => d.data())),
  },
  Mutation: {
    incrementPostViews: (parent, { postId }) => db.runTransaction((t) => {
      const ref = postsCollection.doc(postId)
      return t.get(ref).then((doc) => {
        const post = doc.data()
        t.update(ref, { views: post.views + 1 })
        return {
          ...post,
          views: post.views + 1,
        }
      })
    }),
    addPost: (parent, { title, text, authorId }) => {
      const postRef = postsCollection.doc()
      const newPost = {
        id: postRef.id,
        title,
        text,
        views: 0,
        author: {
          id: authorId,
        },
      }
      postRef.set(newPost)
        .then(() => {
          const authorRef = authorsCollenction.doc(authorId)
          authorRef.get().then((doc) => {
            const authorData = doc.data()
            if (authorData.posts && Array.isArray(authorData.posts)) {
              const { posts } = authorData
              posts.push(postRef.id)
              authorRef.update({ posts })
            } else {
              const posts = []
              posts.push(postRef.id)
              authorRef.update({ posts })
            }
          })
        })
      return newPost
    },
    addAuthor: (parent, { firstName, lastName }) => {
      const newAuthorRef = authorsCollenction.doc()
      const author = {
        id: newAuthorRef.id,
        firstName,
        lastName,
        posts: [],
      }
      newAuthorRef.set(author)
      return author
    },
  },
  Post: {
    author: ({ author: { id } }) => authorsCollenction.doc(id).get()
      .then(getDocIfExists),
  },
  Author: {
    posts: ({ posts }) => posts.map(p => postsCollection.doc(p)
      .get().then(getDocIfExists)),
  },
}

export default resolvers
