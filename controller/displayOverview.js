const Project = require('../model/project');

// Controller to get project overview
exports.getProjectOverview = async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
      } catch (error) {
        console.error('Có lỗi xảy ra khi lấy thông tin dự án:', error);
        res.status(500).send('Có lỗi xảy ra khi lấy thông tin dự án.');
      }
    };
