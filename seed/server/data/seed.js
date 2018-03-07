// @flow
export default {
  authors: {
    '2s6l4IYRpOXTUecGoV9b': {
      id: '2s6l4IYRpOXTUecGoV9b',
      firstName: 'Jonathon',
      lastName: 'Doe',
      posts: [
        {
          id: 'dWKi6qm0Uw3hHpAaQxM1',
        },
        {
          id: 'CHSijWLnsHRa2iAbLui5',
        },
      ],
    },
    Ts3FpNkZiyMFsNUDDt0E: {
      id: 'Ts3FpNkZiyMFsNUDDt0E',
      firstName: 'Grace',
      lastName: 'Pollack',
      posts: [
        {
          id: 'PHH8xf7RkUFUX0hTvmFF',
        },
      ],
    },
    XDeHaB30uSeGqmxBIFH9: {
      id: 'XDeHaB30uSeGqmxBIFH9',
      firstName: 'Grace',
      lastName: 'Stern',
      posts: [],
    },
    XbeLCi3ogujlh5yGARh8: {
      id: 'XbeLCi3ogujlh5yGARh8',
      firstName: 'Jonathon',
      lastName: 'Smirnoff',
      posts: [],
    },
    lSxTNf9atZwfV0OkyL2m: {
      id: 'lSxTNf9atZwfV0OkyL2m',
      firstName: 'Ruslan',
      lastName: 'Zaytsev',
      posts: [],
    },
    nTBy0DrrvhrhgMmlTt7I: {
      id: 'nTBy0DrrvhrhgMmlTt7I',
      firstName: 'Hanna',
      lastName: 'Smirnoff',
      posts: [],
    },
    wDiTWKlhY9UjEsy3Y2ce: {
      id: 'wDiTWKlhY9UjEsy3Y2ce',
      firstName: 'Aaron',
      lastName: 'Shmidt',
      posts: [
        {
          id: 'b0jaIwhHBPQqlFHYXVPm',
        },
        {
          id: 'DFys9npGJbx7PtkJPnrJ',
        },
      ],
    },
  },
  posts: {
    '38eF1KvkJW3WN8KBHobr': {
      id: '38eF1KvkJW3WN8KBHobr',
      title: 'Working with Arrays, Lists, and Sets',
      text: 'Although Cloud Firestore can store arrays, it does not support querying array members or updating single array elements. However, you can still model this kind of data by leveraging the other capabilities of Cloud Firestore.',
      views: 2,
      author: {
        id: '2s6l4IYRpOXTUecGoV9b',
      },
    },
    CHSijWLnsHRa2iAbLui5: {
      id: 'CHSijWLnsHRa2iAbLui5',
      title: 'Data types',
      text: 'Cloud Firestore lets you write a variety of data types inside a document, including strings, booleans, numbers, dates, null, and nested arrays and objects. Cloud Firestore always stores numbers as doubles, regardless of what type of number you use in your code.',
      views: 1,
      author: {
        id: '2s6l4IYRpOXTUecGoV9b',
      },
    },
    DFys9npGJbx7PtkJPnrJ: {
      id: 'DFys9npGJbx7PtkJPnrJ',
      title: 'Modularizing the schema',
      text: 'If your schema gets large, you may want to define parts of it in different files and import them to create the full schema. This is possible by passing around arrays of schema strings.',
      views: 3,
      author: {
        id: 'wDiTWKlhY9UjEsy3Y2ce',
      },
    },
    PHH8xf7RkUFUX0hTvmFF: {
      id: 'PHH8xf7RkUFUX0hTvmFF',
      title: 'A test article by Jenny',
      text: '...Are you wondering how your GraphQL came up with that response, even though we didn’t tell it where to get data? It’s quite simple actually, we told the server in the starter kit to mock the data, and that’s what it’s doing.',
      views: 0,
      author: {
        id: 'Ts3FpNkZiyMFsNUDDt0E',
      },
    },
    b0jaIwhHBPQqlFHYXVPm: {
      id: 'b0jaIwhHBPQqlFHYXVPm',
      title: 'An exemple article by Aaron',
      text: 'Now that we’ve defined the types, we need to modify the Query type to tell the server about the queries that users are allowed to make.',
      views: 2234,
      author: {
        id: 'wDiTWKlhY9UjEsy3Y2ce',
      },
    },
    dWKi6qm0Uw3hHpAaQxM1: {
      id: 'dWKi6qm0Uw3hHpAaQxM1',
      title: 'Passing information out of transactions',
      text: 'Do not modify application state inside of your transaction functions. Doing so will introduce concurrency issues, because transaction functions can run multiple times and are not guaranteed to run on the UI thread. Instead, pass information you need out of your transaction functions.',
      views: 934823982,
      author: {
        id: '2s6l4IYRpOXTUecGoV9b',
      },
    },
  },
}
