const db = require("../model/db.index");
const { noRawAttributes } = require("sequelize/lib/utils/deprecations");
const student = db.students;

const path = require("path");
async function checkDuplicates(username) {
  const userExist = await student.findAll({ where: { username: username } });

  if (userExist.length > 0) {
    return userExist;
  }
  return null;
}

module.exports.signup = async (req, res, next) => {
  const checkDuplicate = await checkDuplicates(req.body.username);
  if (checkDuplicate) {
    res.json({
      message: "Student already Exists",
      data: checkDuplicate,
    });
    return;
  }
  try {
    const newStudent = await student.create(req.body);

    res.status(201).json({
      status: "success",
      message: "Student Added",
      data: newStudent,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      message: "Error Occurred",
    });
  }
};

async function machineLearning() {
  const brain = require("brain.js");

  const config = {
    binaryThresh: 0.5,
    hiddenLayers: [3], // array of ints for the sizes of the hidden layers in the network
    activation: "sigmoid", // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
    leakyReluAlpha: 0.01, // supported for activation type 'leaky-relu'
  };

  // create a simple feed forward neural network with backpropagation
  const net = new brain.NeuralNetwork(config);

  const allStudents = await student.findAll();
  let present = [];
  allStudents.forEach((el) => {
    present.push({
      id: el.id,
      present: el.presentcount,
      absent: el.absentcount,
    });
  });
  console.log(present);
  present.forEach((el) => {
    if (el.present > el.absent) {
      net.train([{ input: [el.present, el.absent], output: [1] }]);
    } else {
      net.train([{ input: [el.present, el.absent], output: [0] }]);
    }
  });
  let output = [];
  present.forEach((el) => {
    output.push(net.run([el.present, el.absent]));
  });
  let final = [];
  output.forEach((el) => {
    final.push(parseInt(el[0] * 1000));
  });

  return final;
}

module.exports.getAll = async (req, res) => {
  const allStudents = await student.findAll();
  const machinelearning = await machineLearning();
  res.json({ allStudents, machinelearning });
};
