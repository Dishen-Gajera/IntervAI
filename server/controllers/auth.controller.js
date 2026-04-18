import getToken from "../config/genToken.js";
import User from "../models/user.model.js";

export const googleAuth = async (req, res) => {

    try {
        const { name, email } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({ name, email });
        }
        const token = getToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: `Google Auth Login Error ${error}` });
    }

}

export const logOut = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "Logout Successfully" });
    } catch (error) {
        res.status(500).json({ message: `Google Auth Logout Error ${error}` });

    }

}