import express from 'express';
import {
  getProjects,
  getProject,
  updateProject,
  addProject,
  deleteProject,
} from '../controllers/project.js';

const router = express.Router();

router.get('/', getProjects);
router.get('/:id', getProject);
router.put('/:id', updateProject);
router.post('/', addProject);
router.delete('/:id', deleteProject);

export default router;
