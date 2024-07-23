import { expect, test, vi } from 'vitest'

import { HttpClient } from '../src'

vi.mock('axios')

test('GET', async () => {
  const httpRequest = new HttpClient()
  expect(await httpRequest.get('/users', {}, {})).toBe({})
})

test('POST', async () => {
  const httpRequest = new HttpClient()
  expect(await httpRequest.post('/users', {})).toBe({})
})

test('DELETE', async () => {
  const httpRequest = new HttpClient()
  expect(await httpRequest.delete('/users', {})).toBe({})
})

test('PUT', async () => {
  const httpRequest = new HttpClient()
  expect(await httpRequest.put('/users', {})).toBe({})
})

test('PATCH', async () => {
  const httpRequest = new HttpClient()
  expect(await httpRequest.patch('/users', {})).toBe({})
})
