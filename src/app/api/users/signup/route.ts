import { dbConnect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import { sendEmail } from "@/utils/mailer";

dbConnect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody
        console.log(reqBody)

        const user = await User.findOne({email})

        if (user) {
            return NextResponse.json({error: "User already exists"}, {status:400})
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPwd = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email, 
            password: hashedPwd
        })

        const saveUser = await newUser.save()

        console.log(saveUser)

        //Send Verification mail
        await sendEmail({email, emailType: "VERIFY", userId: saveUser._id})

        return NextResponse.json({message: 'User registered successfully', success: true, saveUser})

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}