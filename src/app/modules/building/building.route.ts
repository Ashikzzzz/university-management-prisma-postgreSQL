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

// get all building
router.get('/', buildingController.getAllBuilding);

export const buildingRoute = router;
