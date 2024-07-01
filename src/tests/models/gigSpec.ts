import { Gig, GigStore } from '../../models/gig';
import { User, UserStore } from '../../models/user';

const gigStore = new GigStore()
const userStore = new UserStore()


describe("Gig Model", () => {

  const testGig: Gig = {
    gigid: 1,
    userid: 1,
    title: 'testtitle',
    description: 'testdescription',
    type:'testtype',
    location: 'testlocation',
    budget: 100,
    dateposted: '01/01/2024',
    status: 'Open'
};

  const testUser: User = {
    userid: 1,
    username: 'testuser',
    email: 'test@example.com',
    password: 'password123',
    usertype: 'Contractor'
  }

  beforeAll(async () => {
    const createUser:User = await userStore.create({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      usertype: 'Contractor'
    })
  testUser.userid = createUser.userid
})


  it('should have an index method', () => {
    expect(gigStore.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(gigStore.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(gigStore.create).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(gigStore.delete).toBeDefined();
  });

  it('create method should add a gig', async () => {

    const result = await gigStore.create({
      userid: testUser.userid!,
      title: 'testtitle',
      description: 'testdescription',
      type:'testtype',
      location: 'testlocation',
      budget: 100,
      dateposted: '01/01/2024',
      status: 'Open'});
    testGig.gigid = result.gigid
    expect(result.title).toEqual(testGig.title);
    expect(result.description).toEqual(testGig.description);
    expect(result.location).toEqual(testGig.location);
  });

  it('index method should return a list of gigs', async () => {
    const result = await gigStore.index();
    expect(result.length).toBe(1)
    expect(result[0].title).toEqual(testGig.title);
    expect(result[0].description).toEqual(testGig.description);
    expect(result[0].location).toEqual(testGig.location);
  });

  it('show method should return the correct gig', async () => {
    const result = await gigStore.show(testGig.gigid!);
    expect(result.title).toEqual(testGig.title);
    expect(result.description).toEqual(testGig.description);
    expect(result.location).toEqual(testGig.location);
  });

  it('delete method should remove the gig', async () => {
    await gigStore.delete(testGig.gigid!);
    const result = await gigStore.index()

    expect(result).toEqual([]);
  });

  afterAll(async () => {
    userStore.delete(testUser.userid!)

  })
});
