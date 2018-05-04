const express = require('express')
const database = require('./database.js')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors');
const http = require('http').Server(app);
const moment = require('moment');

const io = require('socket.io').listen(http)

const replicate = process.argv[3]

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
}

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const config = {
    host: 'localhost',
    user: 'root',
    password: 'ching', /* your db password here*/
    database: 'chat_data'
};
const db = new database(config);

//======================start post==============================
app.post('/login', (req,res) => {
    let user = req.body.username;
    let pw = req.body.password;
    login(user,pw).then(results => {res.send(results)})
})

app.post('/regist', (req,res) => {
    let user = req.body.username;
    let pw = req.body.password;
    regist(user,pw).then(results => {res.send(results)})
})

app.post('/getUserGroup' , (req,res) => {
    let username = req.body.username;
    console.log(username);
    getUserGroup(username).then(results => {res.send(results)})
})

app.post('/getGroupMember',(req,res)=>{
    let groupName = req.body.groupName;
    getGroupMember(groupName).then(results => {res.send(results)})
})

app.post('/deleteGroup',(req,res)=>{
    let group = req.body.groupId;
    deleteGroup(group).then(results =>{res.send(results)})
})

app.post('/getUserMember',(req,res)=>{
    let name = req.body.userId;
    getUserMember(name).then(results=>res.send(results))
})

app.post('/createGroup',(req,res)=>{
    let groupName = req.body.groupName
    let userId = req.body.userId
    createGroup(groupName,userId).then(results=>{res.send(results)})
})

app.post('/add',(req,res)=>{

})

app.post('/getUnRead', (req,res)=>{
    let user = req.body.userId;
    let group = req.body.groupName;
    getUnRead(user,group).then(results=>{res.send(results)})
})

app.post('/update',(req,res)=>{
    let userId = req.body.userId
    let allgroup = req.body.allgroup
    let index = req.body.index
    update(userId,allgroup,index).then(results=>res.send(results));
    
})
//======================end post==============================
//======================start function==============================



async function getUnRead(user, group){
    try {
        const gid = await findGroupId(group)
        const unreadmsg = await db.query('SELECT u.userId, u.colour, m.text, m.timestamp from message m natural join user u\
                                    where groupId = '+gid+' and messageId > u.messageId')
        return {'result' : 'success', unreadmsg}
    }catch(e){
        return {'result' : 'no unread message'}
    }  
}

async function update(userId,allgroup,index){
     console.log("Update : userId "+ userId )
     var newarr = []
     for(let i =0;i<allgroup.length;i++){
       newarr.push(allgroup[i].name)  
     }

    for(let i =0;i<newarr.length;i++){
        const x = await db.query("select gm.userId from groupmember gm \
        left join chat_data.group g on gm.groupId=g.groupId \
        left join user u on u.userId=gm.userId \
        where g.groupName ='"+newarr[i]+"';");

        for(let j=0;j<x.length;j++){
            if(x[j].userId==userId && index.indexOf(i)==-1){
               await deleteUser(newarr[i],userId)
            }
        }
        if(index.indexOf(i)!=-1){
            await addmember(newarr[i],userId)
        }
        
    }
    return{ result: 'success' }
}
async function deleteUser(groupName,userId){
    try{
        let gd = await db.query("select groupId from chat_data.group where groupName='"+groupName+"';")
        await db.query("delete from groupmember where groupId="+gd[0].groupId+" and userId='"+userId+"';")
        return{valid : true}
    }catch(e){
        console.log('fail delete user')
        return{valid : false}
    }
}


async function addmember(groupName,userId){
    try{
        console.log('===========')
        let gd = await db.query("select groupId from chat_data.group where groupName='"+groupName+"';")
        let mess = await db.query("select max(messageId) as a from message where groupId = "+gd[0].groupId+";");
        await db.query("insert into groupmember values ("+gd[0].groupId+",'"+userId+"',"+mess[0].a+");")
        return{valid : true}
    }catch(e){
        console.log('fail add user'+e)
        return{valid : false}
    }
}


async function getGroupMember(groupName){
    try{
        const groupMember = await db.query("select gm.userId,u.color from groupmember gm \
        left join chat_data.group g on gm.groupId=g.groupId \
        left join user u on u.userId=gm.userId \
        where g.groupName = '"+groupName+"';");
        return({
            valid : true,
            groupMember
        })
    }catch(e){
        return({valid : false})
    }
}

async function deleteGroup(groupId){
    try{
        const numofmember = await db.query("select count(*) as num from groupmember \
        where groupId = '"+groupId+"';").then(res=>res[0])
        
        if(numofmember.num == 1){
            let results = await db.query("delete from chat_data.group \
            where groupId='"+groupId+"'; ")
            return{result : true}
        }else{
            return{result : false}
        }
    }catch(e){
        return{result : false}
    }
}

/*async function getUserMember(name){
    const allgroup = await db.query("select groupName, groupId from chat_data.group;")
    let groupin = []
    let group = []
    
    for(let i=0;i<allgroup.length;i++){
        try{
            group.push(allgroup[i].groupName)
            const x = await db.query("select userId from groupmember where groupId="+allgroup[i].groupId+";");
            for(let j=0;j<x.length;j++){
                if(x[j].userId==name){
                    groupin.push(i);
                }
            }
        }catch(e){

        }
    }
    return {group,groupin}
}*/
async function getUserMember(name){
    const allgroup = await db.query("select distinct gm.groupId, \
    gm.userId,g.groupName from chat_data.group g left join groupmember gm\
      on gm.groupId=g.groupId;")
    let groupin = []
    let group = []
    let groupna = []
    for(let i=0;i<allgroup.length;i++){
        if(group.indexOf(allgroup[i].groupName)==-1){

         group.push(allgroup[i].groupName)
         groupna.push({name: allgroup[i].groupName})}
        if(allgroup[i].userId==name){
            groupin.push(group.indexOf(allgroup[i].groupName))
        
    }
    }
    
    //console.log(group)
    return {groupna,groupin}
}

async function getUserGroup(username){
    try{
        console.log(username)
        const results = await db.query('SELECT g.groupName\
                        FROM chat_data.`group` g, groupmember gm  where g.groupId = gm.groupId and userId = ?', username)
        console.log('here')
        return {
            valid : true,
            groupList : results
        }
    }catch(e){
        console.log("from getUserGroup " + e);
        return {valid : false}
    }
}

async function regist(username,pw){
    try {
        await db.query('INSERT INTO user (userId, password, color) \
        VALUES ("'+ username + '","' + pw + '","#7265E6")')
            return ({
                valid: '1',
            })
    } catch (e) {
        console.log("from regist: " + e)
        return ({ valid: '-1' })
    }
}

async function login(username, pw) {
    try {
        const results = await db.query('SELECT U.password, U.userId, U.color\
                                    FROM user U\
                                    where userId= ?', username)
        console.log(results[0].password);
        if (results.length === 1 && results[0].password === pw) {
            return ({
                valid: true,
                userInformation : { username : results[0].userId,
                                    color : results[0].color
                }
            })
        } else throw new Error('invalid')
    } catch (e) {
        console.log("from login: " + e)
        return ({ valid: false })
    }
}

async function createGroup(groupName,userId){
    console.log("create "+groupName + " " +userId)
    try{
        await db.query("insert into chat_data.group (groupName) values ('"+groupName+"');").then(addmember(groupName,userId))
        return{valid : true}
    }catch(e){
        return{valid : false}
    }
    
}

async function findGroupId(groupname){
    return await db.query('select groupId from group where groupname = ?', groupname).then(res => res[0])
}

async function saveMessage(user, gn, message, time){
    try {
        const gid = await findGroupId(gn)
        const res = await db.query('INSERT INTO `chat_data`.`message`\
        (`text`,`timeStamp`,`userId`,`groupId`) VALUES \
        ('+message+','+time+','+user,gid+');')
        return 'true';
    }catch(e){
        return 'false';
    }
}

//======================end function==============================



io.on('connection', function(socket) {
     console.log('in socket io')
    // once a client has connected, we expect to get a ping from them saying what room they want to join
   socket.on('joinroom', (data)=> {
        console.log('Join'+ data.groupName)
        socket.join(data.groupName);
    });

    socket.on('SEND_MESSAGE', (data)=>{
        console.log('io : Send_mesage ', data)
        let timestamp = moment(new Date()).format("ddd, D/M/YYYY, HH:mm:ss")
        let res = saveMessage(data.author, data.groupName, data.message, timestamp)
        io.to(data.groupName).emit('RECEIVE_MESSAGE', { 'author': data.author, 'color': data.color, 'message': data.message, 'time': timestamp} )
        //repServerSocket.broadcast.emit('UP_SERVE', { 'author': data.author, 'color': data.color, 'message': data.message, 'time': timestamp})

    })

    socket.on('UP_SERVE', (data)=>{
        io.to(data.groupName).emit('RECEIVE_MESSAGE', data);
    })

});

/*const repServerSocket = require('socket.io-client')('http://localhost:'+replicate)
repServerSocket.on('connect', ()=>{
    console.log('connect to replicated port '+replicate)
})*/
http.listen(process.argv[2], () => console.log('Server is running on port '+process.argv[2]+'!'))



//====================Socket============================

