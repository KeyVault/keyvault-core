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

        const { data, error } =  await supabase.auth.signUp({
            email,
            password
        });
    
        if (error) {
            throw new Api400Error(error.message);
        }
    
        console.log('Account created successfully:', data);
        res.status(200).json({
            success: true,
            msg: data
        });
        
        } catch (error) {
            next(error);
        } 
}

export default newAccountController;