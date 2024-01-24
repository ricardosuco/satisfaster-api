import { test } from '@japa/runner'

const newDrink = {
  name: 'Coca Cola ' + Math.random(),
  category: 'Cocoa',
  instructions: 'Mix it',
  image: null,
}

const getLastId = async (client: any): Promise<number> => {
  const response = await client.get('/drinks')
  const lastPage = response.body().meta.last_page
  const lastPageResult = await client.get('/drinks?page=' + lastPage)
  return lastPageResult.body().data.at(-1).id
}

test.group('Create drink', () => {
  test('should create a new drink', async ({ client }) => {
    const response = await client.post('/drinks').json(newDrink)
    response.assertStatus(201)
  })

  test('should return bad request error', async ({ client }) => {
    const requests = [
      client.post('/drinks').json({ ...newDrink, name: 'Zombie' }),
      client.post('/drinks').json({ ...newDrink, category: 'Category Test' }),
      client.post('/drinks').json({ ...newDrink, instructions: null }),
      client.post('/drinks').json({ ...newDrink, name: null }),
      client.post('/drinks').json({ ...newDrink, category: null }),
    ]
    const responses = await Promise.all(requests)
    responses.forEach((response) => {
      response.assertStatus(422)
    })
  })
})

test.group('Get all drinks', () => {
  test('should get all drinks', async ({ client }) => {
    const response = await client.get('/drinks')
    response.assertStatus(200)
  })
  test('should array has length equal rows per page', async ({ client, assert }) => {
    const response = await client.get('/drinks/?page=1&rowsPerPage=50')
    response.assertStatus(200)
    assert.equal(response.body().data.length, 50)
  })
})

test.group('Get drink by id', () => {
  test('should return sucess', async ({ client }) => {
    const drinkId = await getLastId(client)
    const response = await client.get('/drinks/' + drinkId)
    response.assertStatus(200)
  })

  test('should return bad request', async ({ client }) => {
    const response = await client.get('/drinks/!!@#4')
    response.assertStatus(400)
  })

  test('should return not found', async ({ client }) => {
    const response = await client.get('/drinks/9999999')
    response.assertStatus(404)
  })
})

test.group('Update drink', () => {
  test('should return sucess', async ({ client }) => {
    const drinkId = await getLastId(client)
    const response = await client.put('/drinks/' + drinkId).json({ ...newDrink, name: 'New Name' })
    response.assertStatus(200)
  })
  test('should return bad request error with status code 422', async ({ client }) => {
    const drinkId = await getLastId(client)
    const response = await client.put('/drinks/' + drinkId).json({ ...newDrink, name: 'A1' })
    response.assertStatus(422)
  })
  test('should return bad request error with status code 400', async ({ client }) => {
    const response = await client.put('/drinks/!!@#4').json({ ...newDrink, name: 'New Name 2' })
    response.assertStatus(400)
  })
  test('should return not found error', async ({ client }) => {
    const response = await client.put('/drinks/9999999').json({ ...newDrink, name: 'New Name 2' })
    response.assertStatus(404)
  })
})

test.group('Remove drink', () => {
  test('should return sucess', async ({ client }) => {
    const drinkId = await getLastId(client)
    const response = await client.delete('/drinks/' + drinkId)
    response.assertStatus(200)
  })
  test('should return bad request error', async ({ client }) => {
    const response = await client.delete('/drinks/!!@#4')
    response.assertStatus(400)
  })

  test('should return not found error', async ({ client }) => {
    const response = await client.delete('/drinks/9999999')
    response.assertStatus(404)
  })
})
