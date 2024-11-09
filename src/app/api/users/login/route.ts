import { dbConnect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

dbConnect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log(reqBody);

        const user = await User.findOne({email})

        if (!user) {
            return NextResponse.json({ error: "User doesn't exist" }, { status: 400 });
        }

        console.log("User found")

        const validPwd = await bcryptjs.compare(password, user.password)

        if (!validPwd) {
            return NextResponse.json({ error: "Password is incorrect, try again!" }, { status: 400 });
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn:'1d'})

        const response = NextResponse.json({
            message: "User logged in successfully",
            success: true
        })

        response.cookies.set("token", token, {
            httpOnly:true
        })

        return response

    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}