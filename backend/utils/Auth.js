import bcrypt from 'bcrypt';

//hash password 
export const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(12);
        return await bcrypt.hash(password, salt);
    }
    catch (err) {
        console.log(err);
    }
}

//compare password
export const comparePassword = async (password, hashedPassword) => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    }
    catch (err) {
        console.log(err);
    }
}