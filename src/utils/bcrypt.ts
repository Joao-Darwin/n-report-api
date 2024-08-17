import bcrypt from 'bcrypt'

const saltOrRounds = 10;

const createHashPassword = async (textPassword: string): Promise<string> => {
    const hashPassword = await bcrypt.hash(textPassword, saltOrRounds);
    return hashPassword;
} 

const compareHashWithTextPassword = async (textPassword: string, hashPassword: string): Promise<boolean> => {
    return await bcrypt.compare(textPassword, hashPassword);
}

export {
    createHashPassword,
    compareHashWithTextPassword
}