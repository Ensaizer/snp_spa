const express = require('express');
const { User, Organization } = require('../../db/models');

const userRouter = express.Router();

userRouter.get('/', async (req, res) =>{
    try{
        const users = await User.findAll({
            include: Organization
        });
        
        res.status(200).json(users)
    } catch (e) {
        res.status(500).json('User field')
    }
})

userRouter.delete('/:id', async (req, res) =>{
    try{
        const { id }  = req.params;
        await User.destroy({where: {id}})
        res.status(200).json(id)
    } catch (e) {
        res.status(500).json(e)
    }
})

userRouter.patch('/:id', async (req, res) =>{
    try{
        const { id }  = req.params;
        const body = req.body
        await User.update(body, {where: {id}})
        res.status(200).json(id)
    } catch (e) {
        res.status(500).json('User field')
    }
})

userRouter.get('/customers', async (req, res) =>{
    try{
        const users = await User.findAll({where: {roleId: 1}});
        res.status(200).json(users)
    } catch (e) {
        res.status(500).json('User field')
    }
})

userRouter.get('/partners', async (req, res) =>{
    try{
        const users = await User.findAll({where: {roleId: 2}});
        res.status(200).json(users)
    } catch (e) {
        res.status(500).json('User field')
    }
})


module.exports = userRouter;
