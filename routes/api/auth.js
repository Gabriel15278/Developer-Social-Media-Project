const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const rateLimit = require('express-rate-limit');


const User = require('../../models/User');

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 10 login requests per windowMs
    message: 'Too many login attempts from this IP, please try again after 15 minutes'
});

//@route    GET api/auth
//@desc     Test route
//@access   Public
router.get('/', auth, async (req, res) => {
    try {
        res.json(req.user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

//@route    POST api/users
//@desc     Authenticate user & get token
//@access   Public
router.post('/', [loginLimiter,
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const { email, password} = req.body;

    try {
        
        // See if users not exists
        let user = await User.findOne({email: email});

        if(!user){
            return res.status(400).json({errors: [{msg: 'Invalid Credentials'}]});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({errors: [{msg: 'Invalid Credentials'}]});
        }

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