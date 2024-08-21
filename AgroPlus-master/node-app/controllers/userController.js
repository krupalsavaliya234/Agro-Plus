const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');


const   Users = mongoose.model('Users', {
    username: String,
    mobile: String,
    email: String,
    password: String,
    likedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }]
});

module.exports.likeProducts = (req, res) => {
    let productId = req.body.productId;
    let userId = req.body.userId;

    Users.updateOne({ _id: userId }, { $addToSet: { likedProducts: productId } })
        .then(() => {
            res.send({ message: 'liked success.' })
        })
        .catch(() => {
            res.send({ message: 'server err' })
        })

}
module.exports.signup = async (req, res) => {
    try {
        const { username, password, email, mobile } = req.body;

        // Check if a user with the given email already exists
        const existingUser = await Users.findOne({ email: email });

        if (existingUser) {
            return res.status(202).send({ message: 'User already exists' });
        }

        // Create a new user
        const user = new Users({ username, password, email, mobile });

        // Save the user to the database
        await user.save();

        // Send success response
        res.status(201).send({ message: 'User saved successfully' });

    } catch (error) {
        // Handle server errors
        res.status(500).send({ message: 'Server error', error: error.message });
    }
};

module.exports.myProfileById = (req, res) => {
    let uid = req.params.userId

    Users.findOne({ _id: uid })
        .then((result) => {
            res.send({
                message: 'success.', user: {
                    email: result.email,
                    mobile: result.mobile,
                    username: result.username
                }
            })
        })
        .catch(() => {
            res.send({ message: 'server err' })
        })

    return;

}

module.exports.getUserById = (req, res) => {
    const _userId = req.params.uId;

    Users.findOne({ _id: _userId })
        .then((result) => {
            if (result) {
                res.send({
                    message: 'Success.',
                    user: {
                        email: result.email,
                        mobile: result.mobile,
                        username: result.username
                    }
                });
            } else {
                res.status(404).send({ message: 'User not found.' });
            }
        })
        .catch((err) => {
            console.error('Error fetching user:', err);
            res.status(500).send({ message: 'Server error occurred.' });
        });
    
}


module.exports.login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    Users.findOne({ username: username })
        .then((result) => {
            if (!result) {
                res.send({ message: 'user not found.' })
            } else {
                if (result.password == password) {
                    const token = jwt.sign({
                        data: result
                    }, 'MYKEY', { expiresIn: '1h' });
                    res.send({ message: 'find success.', token: token, userId: result._id, username:result.username })
                }
                if (result.password != password) {
                    res.send({ message: 'password wrong.' })
                }

            }

        })
        .catch(() => {
            res.send({ message: 'server err' })
        })

}

module.exports.likedProducts = (req, res) => {

    Users.findOne({ _id: req.body.userId }).populate('likedProducts')
        .then((result) => {
            res.send({ message: 'success', products: result.likedProducts })
        })
        .catch((err) => {
            res.send({ message: 'server err' })
        })

}