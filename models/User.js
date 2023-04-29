let mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'fullname is not provided '],
    },
    email: {
        type: String,
        unique: [true, 'email already exists in database'],
        trim: true,
        required: [true, 'email is not provided'],
        lowercase: true,
        validate: {
            validator: (v) => {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: (props) => `${props.value} is not a valid email`,
        },
    },
    password: {
        type: String,
        required: [true, 'password is not provided'],
        validate: {
            validator: function (value) {
                // Use a regular expression to validate the password format
                return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value);
            },
            message:
                'password must be at least 8 characters long and contain at least one letter and one number',
        },
    },
    preferences: {
        sources: {
            type: [String],
            default: [],
        },
        categories: {
            type: [String],
            default: [],
        },
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
    },
});

module.exports = mongoose.model('User', userSchema);
