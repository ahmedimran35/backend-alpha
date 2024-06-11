class API_Error extends Error {
  //* Define Status Code
  statusCode: number
  constructor(statusCode: number, message: string | undefined, stack = '') {
    super(message)
    //* Assign status code
    this.statusCode = statusCode
    //* check stack is have
    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

export default API_Error
