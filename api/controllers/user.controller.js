export const signOut = (req, res, next) => {
    res.clearCookie('token')
}