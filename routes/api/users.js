const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const {check, validationResult} = require('express-validator');
const rateLimit = require('express-rate-limit');

const User = require('../../models/User');

const createAccountLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 5, // start blocking after 5 requests
    message: 'Too many accounts created from this IP, please try again after an hour'
});

//@route    POST api/users
//@desc     Register user
//@access   Public
router.post('/', [createAccountLimiter, 
    check('name', 'Name is required').not().isEmpty().escape(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({min: 6})
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {name, email, password} = req.body;

    try {
        
        // See if users exists
        let user = await User.findOne({email: email});

        if(user){
            return res.status(400).json({errors: [{msg: 'User already exists'}]});
        }

        // Get users gravatar
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        user = new User({
            name,
            email,
            avatar,
            password
        });

        // Encrypt password
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        // Return JWT
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {expiresIn: 36000},
            (err, token) => {
                if(err) throw err;
                res.json({token});
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})
module.exports = router;