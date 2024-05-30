import { Proposal, ProposalStore } from '../../models/proposal';
import { Gig, GigStore } from '../../models/gig';
import { User, UserStore } from '../../models/user';

const proposalStore = new ProposalStore()
const gigStore = new GigStore()
const userStore = new UserStore()


describe("Proposal Model", () => {

  let testProposal: Proposal = {
    proposalid: 1,
    userid: 1,
    gigid: 1,
    coverletter: 'testcoverletter',
    bidamount: 100,
    status: 'Accepted',
    datesubmitted: '01/01/2024'
  }

  let testGig: Gig = {
    gigid: 1,
    userid: 1,
    title: 'testtitle',
    description: 'testdescription',
    location: 'testlocation',
    budget: 100,
    dateposted: '01/01/2024',
    status: 'Open'
};

  let testUser: User = {
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
    testUser.userid = createUser.userid!
    testGig.userid = createUser.userid!


    const createGig:Gig = await gigStore.create({
        userid: testGig.userid,
        title: 'testtitle',
        description: 'testdescription',
        location: 'testlocation',
        budget: 100,
        dateposted: '01/01/2024',
        status: 'Open'
    })
    testGig.gigid = createGig.gigid!
    testProposal.gigid = createGig.gigid!



  })

  it('should have an index method', () => {
    expect(proposalStore.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(proposalStore.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(proposalStore.create).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(proposalStore.delete).toBeDefined();
  });

  it('create method should add a proposal', async () => {
    const result = await proposalStore.create({
      userid: testGig.userid,
      gigid: testGig.gigid!,
      coverletter: 'testcoverletter',
      bidamount: 100,
      status: 'Accepted',
      datesubmitted: '01/01/2024'

    });
    testProposal.proposalid = result.proposalid

    expect(result.coverletter).toEqual(testProposal.coverletter);
    expect(result.status).toEqual(testProposal.status);

  });

  it('index method should return a list of proposals', async () => {
    const result = await proposalStore.index();
    expect(result.length).toBe(1)
    expect(result[0].coverletter).toEqual(testProposal.coverletter);
    expect(result[0].status).toEqual(testProposal.status);
  });

  it('show method should return the correct proposal', async () => {
    const result = await proposalStore.show(1);
    expect(result.coverletter).toEqual(testProposal.coverletter);
    expect(result.status).toEqual(testProposal.status);
  });

  it('delete method should remove the proposal', async () => {
    await proposalStore.delete(testProposal.proposalid!);
    const result = await proposalStore.index()

    expect(result).toEqual([]);
  });

  afterAll(async () => {
    userStore.delete(testUser.userid!)
    gigStore.delete(testGig.gigid!)

  })
});
