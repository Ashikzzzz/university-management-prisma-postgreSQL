import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { buildingController } from './building.controller';
import { academicBuildingZodValidation } from './building.validation';

const router = express.Router();

router.post(
  '/create-building',
  validateRequest(academicBuildingZodValidation.academicBuildingtZodSchema),
  buildingController.createBuilding
);

// get a single building
router.get('/:id', buildingController.getAsingleBuilding);

router.delete('/:id', buildingController.deleteBuilding);

// update a building
router.patch('/:id', buildingController.updateABuilding);

// get all building
router.get('/', buildingController.getAllBuilding);

export const buildingRoute = router;
