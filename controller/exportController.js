
const exceljs = require('exceljs');
const fs = require('fs');
const projectsForm = require('../model/project');

const exportToExcel = async (req, res) => {
  try {
    const projects = await projectsForm.find();

    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('Projects');

    // Add headers
    worksheet.addRow(['Project Name', 'Address', 'Author', 'Details', 'Topic', 'Image', 'Video', 'Point', 'Comment']);

    // Add data rows
    projects.forEach(project => {
      worksheet.addRow([
        project.projectName,
        project.address,
        project.author,
        project.details,
        project.topic,
        project.image,
        project.video,
        project.point,
        project.comment
      ]);
    });

    // Save workbook to a temporary file
    const filePath = './temp/projects.xlsx';
    await workbook.xlsx.writeFile(filePath);

    // Send the file as response
    res.download(filePath, 'project.xlsx', () => {
      // Delete the temporary file after download completes
      fs.unlinkSync(filePath);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};

module.exports = { exportToExcel };
