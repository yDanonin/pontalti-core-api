import { Router } from 'express';
import { validateRequest } from '../../../middlewares/validate-request';
import { 
  createMessageConfigSchema, 
  updateMessageConfigSchema,
  createMessageScheduleSchema,
  updateMessageScheduleSchema,
  createMessageTemplateSchema,
  updateMessageTemplateSchema
} from './message-schema';
import { 
  createMessageConfig,
  updateMessageConfig,
  deleteMessageConfig,
  getMessageConfigById,
  getMessageConfigByCustomerId,
  getAllMessageConfigs,
  createMessageSchedule,
  updateMessageSchedule,
  deleteMessageSchedule,
  getMessageScheduleById,
  getMessageSchedulesByConfigId,
  createMessageTemplate,
  updateMessageTemplate,
  deleteMessageTemplate,
  getMessageTemplateById,
  getAllMessageTemplates
} from './message-controller';

const router = Router();

// Message Config Routes
router.get('/config', getAllMessageConfigs);
router.post('/config', validateRequest(createMessageConfigSchema), createMessageConfig);
router.put('/config/:id', validateRequest(updateMessageConfigSchema), updateMessageConfig);
router.delete('/config/:id', deleteMessageConfig);
router.get('/config/:id', getMessageConfigById);
router.get('/config/customer/:customerId', getMessageConfigByCustomerId);

// Message Schedule Routes
router.post('/schedule', validateRequest(createMessageScheduleSchema), createMessageSchedule);
router.put('/schedule/:id', validateRequest(updateMessageScheduleSchema), updateMessageSchedule);
router.delete('/schedule/:id', deleteMessageSchedule);
router.get('/schedule/:id', getMessageScheduleById);
router.get('/schedule/config/:configId', getMessageSchedulesByConfigId);

// Message Template Routes
router.post('/template', validateRequest(createMessageTemplateSchema), createMessageTemplate);
router.put('/template/:id', validateRequest(updateMessageTemplateSchema), updateMessageTemplate);
router.delete('/template/:id', deleteMessageTemplate);
router.get('/template/:id', getMessageTemplateById);
router.get('/template', getAllMessageTemplates);

export default router; 