require('express-async-errors');
const { where } = require('./../models/list');
const List = require('./../models/list');

exports.createList = async (req, res) => {
    req.body.user = req.user;

    const list = await List.create(req.body);

    res.status(200).json({
        status: 'success',
        data: {
            list,
        },
    });
};

exports.findList = async (req, res) => {
    const { sort, ...query } = req.query;
    let queryStr = JSON.stringify(query);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    queryStr = JSON.parse(queryStr);
    const lists = await List.find({ user: req.user._id, ...queryStr }).sort(
        sort.split(',').join(' '),
    );

    res.status(201).json({
        status: 'success',
        data: {
            lists,
        },
    });
};

exports.changeStatus = async (req, res) => {
    const list = await List.findOne({ user: req.user._id, _id: req.params.id });
    if (!list) throw new Error('list with id not found');
    if (!req.body.status) throw new Error('input status');
    list.status = req.body.status;
    await list.save();
    res.status(200).json({
        status: 'success',
        data: {
            list,
        },
    });
};
