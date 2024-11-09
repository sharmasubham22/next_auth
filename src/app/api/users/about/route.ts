import { dbConnect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { dataFromToken } from "@/utils/dataFromToken";

dbConnect();

export async function POST(request: NextRequest){
    const userId = await dataFromToken(request)

    const user = await User.findOne({_id:userId}).select("-password")

    if (!user) {
        return NextResponse.json({error:"No details found"}, {status:400})
    }

    return NextResponse.json({
        message:"User found",
        data:user
    })
}