
const projectsForm = require('../model/project');

const getProjects = async (req, res) => {
  try {
    const projects = await projectsForm.find();
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};

module.exports = { getProjects };
