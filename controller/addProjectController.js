const Project = require('../model/project');
const multer = require('multer');

const uploadProject = async (req, res) => {
  try {
    const { projectName, author, summary } = req.body;
    const detail = req.files['detail'] ? req.files['detail'][0].path : null;
    const mainImage = req.files['mainImage'] ? req.files['mainImage'][0].path : null;
    const images = req.files['images'] ? req.files['images'].map(file => file.path) : [];
    const video = req.files['video'] ? req.files['video'][0].path : null;

    const newProject = new Project({ projectName, author, summary, detail, mainImage, images, video });
    const savedProject = await newProject.save();

    res.status(200).json({ message: 'Project uploaded successfully', project: savedProject });
  } catch (error) {
    if (error instanceof multer.MulterError) {
      if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'Vượt quá giới hạn kích thước tệp tin' });
      }
    }
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  uploadProject
};
