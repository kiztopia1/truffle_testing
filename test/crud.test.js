const Crud = artifacts.require('Crud');
contract('Crud', () => {
    let crud;
    before(async () => {
        crud = await Crud.deployed()
    })
    console.log(crud)
    it('Should create a new user', async () => {
        await crud.create('name');
        const user = await crud.read(1);
        assert (user[0].toNumber() === 1);
        assert(user[1] === 'name');
    });

    it('Should update a user', async () => {
        await crud.update(1, "name2");
        const user = await crud.read(1);
        assert(user[0].toNumber() === 1);
        assert(user[1] === 'name2');
    });

    it('Should NOT update a non-existing user', async () => {
        try{
            await crud.update(2, 'name2')
        }catch(e){
            assert(e.message.includes("User does not exist!"));
            return;
        }
        assert(false)
    })
    it('Should destroy a user', async () => {
        await crud.destroy(1);
        try{
            await crud.read(1);
        }catch (err){
            assert(err.message.includes("User does not exist!"))
            return;
        }
        assert(false)
    })
})