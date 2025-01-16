"use server"
import { NextResponse } from "next/server";
import mongoosedb from "@/app/lib/db";
import user from "@/app/lib/models/user";

export const GET= async(req)=>{
    try{
        await mongoosedb()
        const userId = req.headers.get('user_id');
        const data = await user.findOne({_id:userId})
        if(data)
        {
            return new NextResponse(JSON.stringify({success:true, data:data?.wishlist}))
        }
        else{
            return new NextResponse(JSON.stringify({success:false, message:'User not found'}))
        }
    }
    catch(err)
    {

    }
}