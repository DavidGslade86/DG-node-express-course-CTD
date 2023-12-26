
const auth = (req, res) => {
    if (req.cookies.name) {
        let authName = req.cookies.name;
        req.user = authName;
        return next();
    } else {
        res.status(401).json({ success: false, message: 'unauthorized' });
    }
}

const logon = (req, res) => {
    const { name } = req.body;
    if(name) {
        res.cookie("name", name);
        res.status(201).json({ success: true, message: `Hello ${name}` });
    } else {
        res.status(400).json({ success: false, message: "Please provide a name" });
    }
}

const logoff = (req, res) => {
    if (req.cookies.name) {
        res.clearCookie("name");
        res.status(200).json({ success: true, message: "You have successfully logged out" });
    } else {
        res.status(200).json({ success: false, message: "You were not logged in" });
    }
}

module.exports = {auth, logon, logoff};