import { HttpStatusCode } from 'axios'

export const errorMessageMap = new Map([
  [HttpStatusCode.Unauthorized, '401: Unauthorized!'],
  [HttpStatusCode.Forbidden, '403: Forbidden!'],
  [HttpStatusCode.NotFound, '404: NotFound!'],
  [HttpStatusCode.MethodNotAllowed, '405: Method Not Allowed!'],
  [HttpStatusCode.Conflict, '409: Conflict!'],
  [HttpStatusCode.UnprocessableEntity, '422: Unprocessable Entity!'],
  [HttpStatusCode.TooManyRequests, '429: Too Many Requests!'],
  [HttpStatusCode.InternalServerError, '500: Internal Server Error!'],
  [HttpStatusCode.BadRequest, '502: Bad Gateway!'],
  [HttpStatusCode.BadGateway, '504: Gateway Timeout!']
])
