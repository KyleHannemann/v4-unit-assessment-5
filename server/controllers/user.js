const bcrypt = require('bcryptjs');

module.exports = {
    register:  async (req,res) =>{
        const {username, password} = req.body
        const db = req.app.get('db');
        let checkExists = await db.user.find_user_by_username([username]);
        if (checkExists.length >= 1){
            res.status(401).send('username unavailable');
            return;
        }
        else{
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt)
            let user = await db.user.create_user([username, hash, `https://robohash.org/${username}.png`])
            console.log(user)
            req.session.user = {
                id: user[0].id,
                username: user[0].username,
                profile_pic: user[0].profile_pic
            }
            console.log(req.session.user)
            res.status(200).send(req.session.user)
        }
    },
    login:  async (req,res) =>{
        const db = req.app.get('db')
        const {username, password} = req.body;
        let user = await db.user.find_user_by_username(username);
        if (user.length !== 1){
            res.status(401).send('invalid username')
            return;
        }
        else {
            let hash = bcrypt.compareSync(password, user[0].password);
            if (hash === false){
                res.status(401).send('invalid password');
                return;
            }
            else{
                req.session.user = {
                    id: user[0].id,
                    username: user[0].username,
                    profile_pic: user[0].profile_pic
                } 
                console.log(req.session.user)
                res.status(200).send(req.session.user) 
            }
        }
    },
    getUser: (req,res) =>{
        const db = req.app.get('db')
        if (req.session.user){
            res.status(200).send(req.session.user)
        }
        else{
            res.status(404).send('please login')
        }
    },
    logout: async  (req,res) =>{
        const db = req.app.get('db')
        req.session.destroy();
        res.sendStatus(200);
    }
}