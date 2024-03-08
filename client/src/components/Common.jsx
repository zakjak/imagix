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

export const follow = async (userId, currentUserId, currentUser, setUser, user) => {
    try{
        if(currentUser && userId && currentUser){
            const res = await fetch(`/api/user/getUser/${userId}/${currentUserId}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
            })

            if(res.ok){
                const data = await res.json()
                setUser(user.map(action => 
                    action._id === userId ? {
                        ...action,
                        followers: data.followers,
                        following: data.following
                    }:
                    user
                    ))

            }
        }

    }catch(err){
        console.log(err)
    }
  }

  