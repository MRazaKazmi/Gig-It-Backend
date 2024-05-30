import { User, UserStore } from '../../models/user';

const store = new UserStore()


describe("User Model", () => {

  const testUser: User = {
    username: 'testuser',
    email: 'test@example.com',
    password: 'password123',
    usertype: 'Contractor'
  }

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
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      usertype: 'Contractor'});
      testUser.userid = result.userid
      expect(result.username).toEqual(testUser.username);
      expect(result.email).toEqual(testUser.email);
      expect(result.password).toEqual(testUser.password);
      expect(result.usertype).toEqual(testUser.usertype);
  });

  it('index method should return a list of users', async () => {
    const result = await store.index();
    expect(result).toEqual([testUser]);
  });

  it('show method should return the correct user', async () => {
    const result = await store.show(testUser.userid!);
    expect(result).toEqual(testUser);
  });

  it('delete method should remove the user', async () => {
    await store.delete(testUser.userid!);
    const result = await store.index()

    expect(result).toEqual([]);
  });
});
