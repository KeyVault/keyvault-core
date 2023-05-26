import 'dotenv/config';
import { createClient } from "@supabase/supabase-js";
import { NextFunction, Request, Response } from 'express';
import Api400Error from '../errors/api400Error';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

type Body = {
    email: string;
    password: string;
};

const newAccountController =async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {
        const { email, password } = req.body as Body;
        
        // create a new user at supabase
        const { data:signupData, error:signUpError } =  await supabase.auth.signUp({
            email,
            password
        });
    
        if (signUpError) {
            throw new Api400Error(signUpError.message);
        }
    
        // append to users table
        const { data:appendUserData, error:appendUserError } = await supabase.from('users').insert([
            { id: signupData.user?.id, email: signupData.user?.email, created_at: signupData.user?.created_at, updated_at: signupData.user?.updated_at },
        ]);
        
        if (appendUserError) {
            throw new Api400Error(appendUserError.message);
        }
        
        res.status(200).json({
            success: true,
            msg: appendUserData
        });
        
        } catch (error) {
            next(error);
        } 
}

export default newAccountController;