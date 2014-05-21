'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Event Schema
 */
var EventSchema = new Schema({
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
    name: {
        type: String,
        default: '',
        trim: true
    }
});

/**
 * Validations
 */
EventSchema.path('thing').validate(function(thing) {
    return thing.length;
}, 'Title cannot be blank');

/**
 * Statics
 */
EventSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Event', EventSchema);
