import { jwtVerify } from 'jose';
import { NextResponse} from "next/server"


async function verifyToken(token) {
    const secret = new TextEncoder().encode(process.env.JWTS);
    const { payload } = await jwtVerify(token, secret);
    return payload
}

export const middleware = async (req)=>{
    try{
        const token = req.headers.get("accessToken");
        if(!token)
        {
            return new NextResponse(JSON.stringify({success:false, message:'Please login with token'}))
        }
        else{
            const verifyWithJWTS = await verifyToken(token);
            const rqheader = new Headers(req.headers)
            rqheader.set('user_id', verifyWithJWTS.id)

            return NextResponse.next({
                request:{
                    headers:rqheader,
                }
            })
        }
    }
    catch(err)
    {
        return new NextResponse(JSON.stringify({success:false, message:'Please login'}))
    }
}

export const config ={
    matcher:['/api/pushhistory', '/api/getuser', '/api/gethistory', '/api/pushwishlist', '/api/getwishlist', '/api/deletewishlist', '/api/wishlistid']
}