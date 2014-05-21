'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Location Schema
 */
var LocationSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    thing: {
        type: String,
        default: '',
        trim: true
    },
    loc: {
        lat: {
            type: Number,
            default: '0'
        },
        long: {
            type: Number,
            default: '0'
        }
    },
});

/**
 * Validations
 */
LocationSchema.path('thing').validate(function(thing) {
    return thing.length;
}, 'Thing cannot be blank');

/**
 * Statics
 */
LocationSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Location', LocationSchema);
