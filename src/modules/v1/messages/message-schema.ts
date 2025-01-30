import * as yup from 'yup';
import { MessageTriggerType, MessageTargetTable } from '../../../types/message.types';

// Message Config Schemas
export const createMessageConfigSchema = yup.object({
  body: yup.object({
    customer_id: yup.number().required(),
    can_whatsapp: yup.boolean().required(),
    can_whatsapp_attachments: yup.boolean().required(),
    can_telegram: yup.boolean().required(),
    can_telegram_attachments: yup.boolean().required(),
    can_email: yup.boolean().required(),
    can_email_attachments: yup.boolean().required()
  })
});

export const updateMessageConfigSchema = yup.object({
  params: yup.object({
    id: yup.number().required()
  }),
  body: yup.object({
    can_whatsapp: yup.boolean(),
    can_whatsapp_attachments: yup.boolean(),
    can_telegram: yup.boolean(),
    can_telegram_attachments: yup.boolean(),
    can_email: yup.boolean(),
    can_email_attachments: yup.boolean()
  })
});

// Message Schedule Schemas
export const createMessageScheduleSchema = yup.object({
  body: yup.object({
    message_config_id: yup.number().required(),
    day_of_week: yup.number().min(0).max(6).required(),
    can_send: yup.boolean().required(),
    start_time: yup.string().matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato inválido de hora'),
    end_time: yup.string().matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato inválido de hora')
  })
});

export const updateMessageScheduleSchema = yup.object({
  params: yup.object({
    id: yup.number().required()
  }),
  body: yup.object({
    day_of_week: yup.number().min(0).max(6),
    can_send: yup.boolean(),
    start_time: yup.string().matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato inválido de hora'),
    end_time: yup.string().matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato inválido de hora')
  })
});

// Message Template Schemas
export const createMessageTemplateSchema = yup.object({
  body: yup.object({
    name: yup.string().min(1).max(100).required(),
    description: yup.string().min(1).max(500).required(),
    subject: yup.string().min(1).max(200).required(),
    content: yup.string().required(),
    variables: yup.array().of(yup.string())
  })
});

export const updateMessageTemplateSchema = yup.object({
  params: yup.object({
    id: yup.string().required()
  }),
  body: yup.object({
    name: yup.string().min(1).max(100),
    description: yup.string().min(1).max(500),
    subject: yup.string().min(1).max(200),
    content: yup.string(),
    variables: yup.array().of(yup.string())
  })
}); 