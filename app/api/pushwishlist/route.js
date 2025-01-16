"use server";
import { NextResponse } from "next/server";
import mongoosedb from "@/app/lib/db";
import user from "@/app/lib/models/user";

export const PUT = async (req) => {
  try {
    await mongoosedb();

    const userId = req.headers.get("user_id");
    const newItem = await req.json();

    const userData = await user.findById(userId);
    if (!userData) {
      return new NextResponse(
        JSON.stringify({ success: false, message: "User not found" }),
        { status: 404 }
      );
    }
    const alreadyAdded = userData.wishlist.some(
      (item) => item.id == newItem.id
    );

    if (alreadyAdded) {
      return new NextResponse(
        JSON.stringify({ success: false, message: "Item already added" }),
        { status: 400 }
      );
    }

    userData.wishlist.unshift(newItem);
    if (userData.wishlist.length > 20) {
      userData.wishlist = userData.wishlist.slice(0, 20);
    }

    await userData.save();
    return new NextResponse(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500 }
    );
  }
};
