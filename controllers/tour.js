const fs = require("fs");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

const getAllData = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      tours: tours,
    },
  });
};

const createData = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newData = Object.assign({ id: newId }, req.body);
  tours.push(newData);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tours: newData,
        },
      });
    }
  );
};

const getDataById = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: `Data with id ${id} not found`,
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      tour: tour,
    },
  });
};

const updateDataById = (req, res) => {
  const id = req.params.id * 1;
  const index = tours.findIndex((el) => el.id === id);
  if (index === -1) {
    return res.status(404).json({
      status: "fail",
      message: `Data with id ${id} not found`,
    });
  }
  tours[index] = { ...tours[index], ...req.body };
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        message: `Data with id ${id} updated`,
        data: {
          tours: tours[index],
        },
      });
    }
  );
};

const deleteDataById = (req, res) => {
  const id = req.params.id * 1;
  const index = tours.findIndex((el) => el.id === id);
  if (index === -1) {
    return res.status(404).json({
      status: "fail",
      message: `Data with id ${id} not found`,
    });
  }
  tours.splice(index, 1);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        message: `Data with id ${id} deleted`,
        data: {
          tours: null,
        },
      });
    }
  );
};

module.exports = {
  getAllData,
  createData,
  getDataById,
  updateDataById,
  deleteDataById,
};
