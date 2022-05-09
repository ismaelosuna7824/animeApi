import {Router} from 'express';
import {  Photos, Users } from '../entities/UserEntity';
import {Iuser} from '../interfaces/Iuse';
import { v4 as uuidv4 } from 'uuid';


const userRouter = Router();

userRouter.get('/users', (_, res)=>{
    res.send({sen: "hola mundo"})
});


userRouter.post('/create', async (req, res)=>{
    try {
        const user:Iuser = req.body;
        user.uuid = uuidv4();
        
        const Photo = new Photos();
        Photo.photos = "nueva fdto";
        await Photos.save(Photo);

        const User = new Users();
        User.name = user.name;
        User.surname  = user.surname;
        User.age = user.age;
        User.photo = Photo;
        User.colors= user.color;

        await Users.save(User);
        
        res.status(200).json({status: true, user})
        
    } catch (error) {
        res.status(404).send({eror: "error"})
        throw new Error("");
    }
})

userRouter.put('/update', async(req, res)=>{
    try {
        const user:Iuser = req.body;
        const resulut = await (await Users.update({uuid: user.uuid}, {name: user.name, surname: user.surname})).affected;
        //console.log(resulut);
        if(resulut === 1){
            res.status(200).json({status: true})
        }else{
            res.status(200).json({status: false})
        }
       
    } catch (error) {
        console.log(error);
        res.status(404).json({erro: error});
    }

}) 

userRouter.delete('/delete', async(req, res)=>{
    const user:Iuser = req.body;
    const result = await (await Users.delete({uuid: user.uuid })).affected;
    if(result === 1){
        res.status(200).json({status: true})
    }else{
        res.status(200).json({status: false})
    }
   
})

userRouter.get('/allusers', async (_, res)=>{
    try {
        const users = await Users.find({relations: {
            photo: true
        }});
        
        
        res.status(200).json(users.map(({name, surname, age, photo})=>{
            return {
                name, surname, age, photo
            }
        }))
    } catch (error) {
        res.status(404).send({error})
    }
});


userRouter.get('/user/:id', async(req, res)=>{
    try {
        const result = await Users.findOneBy({uuid: req.params.id})
        // const result = await Users.createQueryBuilder("users").select(["users.name", "users.age", "users.surname"]).where("users.id = :id", {id: +req.params.id}).getOne();
         result == null ? res.status(404).json({message: "usuario no encontrado"}) : res.send(result);
    } catch (error) {
        console.log(error);
        res.sendStatus(404).json({message: "Dato no encontrado"});
    }
});

export default userRouter;
