const projectsForm = require('../model/project');
// const mongoose = require('mongoose');

exports.submitFeedback = async (req, res) => {
    try {
        const updatedDoc = await projectsForm.findOneAndUpdate(
          { _id: projectId },
          { $set: { point, comment } },
          { new: true }
        );
    
        if (!updatedDoc) {
          return res.status(404).send('Document not found');
        }
    
        res.send(updatedDoc);
      } catch (error) {
        res.status(500).send('Error updating document');
      }
};
