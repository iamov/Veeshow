import { getCookies } from "./getCookie"
import { state } from "./store"

export const History = async(body)=>{
    try{
    const token = await getCookies()
    if(!token)
        {
            return
        }
    const data = await fetch(`/api/pushhistory`,{
        method:'PUT',
        headers:{'Content-Type': 'application/json', 'accessToken': token},
        body:JSON.stringify(body)
    })
    console.log(data)
}
catch(error){
    console.log(error)
}
}

export const WishList = async(body)=>{
    try{
    state.wishload = true
    const token = await getCookies()
    if(!token)
        {
            return 
        }
    const data = await fetch(`/api/pushwishlist`,{
        method:'PUT',
        headers:{'Content-Type': 'application/json', 'accessToken': token},
        body:JSON.stringify(body)
    })
    state.wishload = false
}
catch(error){
    console.log(error)
    state.wishload = false
}
}

export function saveToRecentlyWatched(item) {
    try{
    let recentlyWatched = JSON.parse(localStorage.getItem('recentlyWatched')) || [];
    recentlyWatched = recentlyWatched.filter(existingItem => existingItem.id != item.id);
    recentlyWatched.unshift(item);
    if (recentlyWatched.length > 10) {
        recentlyWatched.pop();
    }
    localStorage.setItem('recentlyWatched', JSON.stringify(recentlyWatched));
}
catch(err)
{
    console.log(err)
}
}

export const getUserDetail = async ()=>{
    try{
        const token = await getCookies()
        if(!token)
            {
                return 
            }
        const data = await fetch(`/api/getuser`,{
            method:'GET',
            headers:{'accessToken': token},
        })
        const info = await data.json()
        return info.data
    }
    catch(error){
        console.log(error)
    }
}

export const DeleteWish = async (body)=>{
    try{
        const token = await getCookies()
        if(!token)
            {
                return
            }
        const data = await fetch(`/api/deletewishlist`,{
            method:'DELETE',
            headers:{'accessToken': token},
            body:JSON.stringify(body)
        })
        const info = await data.json()
        return info.results
    }
    catch(error){
        console.log(error)
    }
}

export const getUserHistory = async ()=>{
    try{
        const token = await getCookies()
        if(!token)
        {
            return []
        }
        const data = await fetch(`/api/gethistory`,{
            method:'GET',
            headers:{'accessToken': token},
        })
        const info = await data.json()
        return info.data
    }
    catch(error){
        console.log(error)
    }
}

export const getUserWishlist = async ()=>{
    try{
        const token = await getCookies()
        if(!token)
        {
            return []
        }
        const data = await fetch(`/api/getwishlist`,{
            method:'GET',
            headers:{'accessToken': token},
        })
        const info = await data.json()
        return info.data
    }
    catch(error){
        console.log(error)
    }
}

export const getWishlistId = async ()=>{
    try{
        const token = await getCookies()
        if(!token)
        {
            return []
        }
        const data = await fetch(`/api/wishlistid`,{
            method:'GET',
            headers:{'accessToken': token},
        })
        const info = await data.json()
        console.log(info)
        return info?.data
    }
    catch(error){
        console.log(error)
    }
}