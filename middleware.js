import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';

async function verifyToken(token) {
    if (!process.env.DB_JWTS) {
        throw new Error('JWT secret key (JWTS) is not configured');
    }
    const secret = new TextEncoder().encode(process.env.DB_JWTS);
    const { payload } = await jwtVerify(token, secret);
    return payload;
}

export const middleware = async (req) => {
    try {
        const token = req.headers.get('accessToken');
        if (!token) {
            return NextResponse.json({ success: false, message: 'Please login' }, { status: 401 });
        }

        const verifyWithJWTS = await verifyToken(token);
        const rqheader = new Headers(req.headers);
        rqheader.set('user_id', verifyWithJWTS.id);

        return NextResponse.next({
            request: {
                headers: rqheader,
            },
        });
    } catch (err) {
        console.error(err);
        const status = err.message.includes('JWT') ? 500 : 401;
        return NextResponse.json(
            { success: false, message: 'Please login', error: err.message },
            { status }
        );
    }
};

export const config = {
    matcher: [
        '/api/pushhistory',
        '/api/getuser',
        '/api/gethistory',
        '/api/pushwishlist',
        '/api/getwishlist',
        '/api/deletewishlist',
        '/api/wishlistid',
    ],
};
