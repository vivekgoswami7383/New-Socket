const users=[]

const addUser = ({id, username, room})=>{
    username = username.trim().toLowerCase();
    room = room.trim().toLowerCase();

    if(!username || !room){
        return {
            error : "Username or Room are required!!!"
        }
    }

    const existingUser=users.find((theUser)=>{
        return theUser.room===room && theUser.username===username
    })
    if(existingUser){
        return {
            error : "Username already exist"
        }
    }

    const user={id, username, room}

    users.push(user)

    return { user }
}

const removeUser=(id)=>{
    const index=users.findIndex(theUser=> theUser.id===id)

    if(index!=-1){
        return users.splice(index,1)[0];
    }
}

const getUser=(id)=> {
    return users.find(theUser=> theUser.id===id)
}

const getUserInRoom=(room)=>{
    return users.filter(theUser=> theUser.room===room)
}


module.exports={
    addUser, removeUser, getUser, getUserInRoom
}