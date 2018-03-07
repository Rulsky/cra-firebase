// @flow
const getHost = () => {
  const localport = 5000
  try {
    const { hostname, host, protocol } = window.location
    if (hostname === 'localhost') {
      return `${protocol}//${hostname}:${localport}`
    }
    return `${protocol}//${host}`
  } catch (error) {
    if (process.env.NODE_ENV === 'production') {
      const { X_GOOGLE_GCLOUD_PROJECT } = process.env
      if (X_GOOGLE_GCLOUD_PROJECT) {
        return `https://${X_GOOGLE_GCLOUD_PROJECT}.firebaseapp.com`
      }
      throw new Error('can\'t get a value of X_GOOGLE_GCLOUD_PROJECT from enviroment')
    }
    // assume that we are in local env
    return `http://localhost:${localport}`
  }
}

export default getHost
