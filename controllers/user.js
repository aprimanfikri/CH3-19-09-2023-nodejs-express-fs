const fs = require('fs');
const generateId = require('../utils/random');

const users = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/users.json`));

const getAllData = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Data retrieved successfully',
        data: {
            users: users,
        },
    });
};

const createData = (req, res) => {
    const id = generateId();
    const newData = Object.assign({ _id: id }, req.body);
    users.push(newData);
    fs.writeFile(`${__dirname}/../dev-data/data/users.json`, JSON.stringify(users), (err) => {
        res.status(201).json({
            status: 'success',
            message: 'Data created successfully',
            data: {
                users: newData,
            },
        });
    });
};

const getDataById = (req, res) => {
    const id = req.params.id;
    const user = users.find((el) => el._id === id);
    if (!user) {
        return res.status(404).json({
            status: 'fail',
            message: `Data with id ${id} not found`,
        });
    }
    res.status(200).json({
        status: 'success',
        message: `Data with id ${id} successfully retrieved`,
        data: {
            users: user,
        },
    });
};

const updateDataById = (req, res) => {
    const id = req.params.id;
    const index = users.findIndex((el) => el._id === id);
    if (index === -1) {
        return res.status(404).json({
            status: 'fail',
            message: `Data with id ${id} not found`,
        });
    }
    users[index] = { ...users[index], ...req.body };
    fs.writeFile(`${__dirname}/../dev-data/data/users.json`, JSON.stringify(users), (err) => {
        res.status(201).json({
            status: 'success',
            message: `Data with id ${id} updated successfully`,
            data: {
                users: users[index],
            },
        });
    });
};

const deleteDataById = (req, res) => {
    const id = req.params.id;
    const index = users.findIndex((el) => el._id === id);
    if (index === -1) {
        return res.status(404).json({
            status: 'fail',
            message: `Data with id ${id} not found`,
        });
    }
    users.splice(index, 1);
    fs.writeFile(`${__dirname}/../dev-data/data/users.json`, JSON.stringify(users), (err) => {
        res.status(200).json({
            status: 'success',
            message: `Data with id ${id} deleted successfully`,
            data: {
                users: null,
            },
        });
    });
};

module.exports = {
    getAllData,
    createData,
    getDataById,
    updateDataById,
    deleteDataById,
};
