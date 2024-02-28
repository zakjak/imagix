export const numberManipulate = (num) => {
    if(num > 1000){
        return `${(num / 1000).toFixed(1)} K`
    }else if(num > 100000){
        return `${(num / 1000).toFixed(1)} K`
    }else if(num > 1000000){
        return `${(num / 1000000).toFixed(1)} M`
    }else if(num > 1000000000){
        return `${(num / 1000000000).toFixed(1)} M`
    }else{
        return num
    }
}

export const follow = async (userId, currentUserId, currentUser, getUser) => {
    try{
        if(currentUser && userId && currentUser){
            const res = await fetch(`/api/user/getUser/${userId}/${currentUserId}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
            })

            if(res.ok){
              getUser()
            }
        }

    }catch(err){
        console.log(err)
    }
  }