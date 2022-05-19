const SimpleSmartContract = artifacts.require('SimpleSmartContract');

contract('SimpleSmartContract',  () => {
    let simpleSmartContract ;
    before(async () => {
        simpleSmartContract = await SimpleSmartContract.deployed();
    })
    it('should deploy smart contract properly', async () => {
        assert(simpleSmartContract.address !== '');
    })

    it('Should add value to the array', async () => {
        await simpleSmartContract.add(1);
        const result = await simpleSmartContract.ids(0);
        assert(result.toNumber() === 1);
    })

    it('Should get the value from the array', async () => {
        const result = await simpleSmartContract.get(0);
        assert(result.toNumber() === 1);
    })

    it('Should get all the values in the array', async() => {
        const rowResult = await simpleSmartContract.getAll();
        const result = rowResult.map(id => id.toNumber());
        assert.deepEqual(result, [1]);
    })

    it('Should return the length', async () => {
        const result = await simpleSmartContract.length();
        assert(result.toNumber() === 1);
    })
})