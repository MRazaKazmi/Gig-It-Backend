import { User, UserStore } from '../../models/user';

const store = new UserStore()

describe("User Model", () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('create method should add a user', async () => {
    const result = await store.create({
      username: 'Raza Kazmi',
      email: 'mohammad.r.kazmi@gmail.com',
      password: 'test123',
      usertype: 'Contractor'
    });
    expect(result).toEqual({
       userid: 1,
       username: 'Raza Kazmi',
       email: 'raza.kazmi@gmail.com',
       password: 'test123',
       usertype: 'Contractor'
    });
  });

  it('index method should return a list of users', async () => {
    const result = await store.index();
    expect(result).toEqual([{
       userid: 1,
       username: 'Raza Kazmi',
       email: 'raza.kazmi@gmail.com',
       password: 'test123',
       usertype: 'Contractor'
    }]);
  });

  it('show method should return the correct user', async () => {
    const result = await store.show(1);
    expect(result).toEqual({
       userid: 1,
       username: 'Raza Kazmi',
       email: 'raza.kazmi@gmail.com',
       password: 'test123',
       usertype: 'Contractor'
    });
  });

  it('delete method should remove the book', async () => {
    store.delete(1);
    const result = await store.index()

    expect(result).toEqual([]);
  });
});
