import { Request, Response } from 'express';
import messageService from '@pontalti/repository/message';

export const createMessageConfig = async (req: Request, res: Response) => {
  const data = await messageService.createMessageConfig(req.body);
  res.status(201).json(data);
};

export const updateMessageConfig = async (req: Request, res: Response) => {
  const data = await messageService.updateMessageConfig(Number(req.params.id), req.body);
  res.json(data);
};

export const deleteMessageConfig = async (req: Request, res: Response) => {
  await messageService.deleteMessageConfig(Number(req.params.id));
  res.status(204).send();
};

export const getMessageConfigById = async (req: Request, res: Response) => {
  const data = await messageService.getMessageConfigById(Number(req.params.id));
  res.json(data);
};

export const getMessageConfigByCustomerId = async (req: Request, res: Response) => {
  const data = await messageService.getMessageConfigByCustomerId(Number(req.params.customerId));
  res.json(data);
};

export const createMessageSchedule = async (req: Request, res: Response) => {
  const data = await messageService.createMessageSchedule(req.body);
  res.status(201).json(data);
};

export const updateMessageSchedule = async (req: Request, res: Response) => {
  const data = await messageService.updateMessageSchedule(Number(req.params.id), req.body);
  res.json(data);
};

export const deleteMessageSchedule = async (req: Request, res: Response) => {
  await messageService.deleteMessageSchedule(Number(req.params.id));
  res.status(204).send();
};

export const createMessageTemplate = async (req: Request, res: Response) => {
  const data = await messageService.createMessageTemplate(req.body);
  res.status(201).json(data);
};

export const updateMessageTemplate = async (req: Request, res: Response) => {
  const data = await messageService.updateMessageTemplate(req.params.id, req.body);
  res.json(data);
};

export const deleteMessageTemplate = async (req: Request, res: Response) => {
  await messageService.deleteMessageTemplate(req.params.id);
  res.status(204).send();
};

export const getMessageTemplateById = async (req: Request, res: Response) => {
  const data = await messageService.getMessageTemplateById(req.params.id);
  res.json(data);
};

export const getAllMessageTemplates = async (_req: Request, res: Response) => {
  const data = await messageService.getAllMessageTemplates();
  res.json(data);
};

export const getMessageScheduleById = async (req: Request, res: Response) => {
  try {
    const data = await messageService.getMessageScheduleById(Number(req.params.id));
    if (!data) {
      return res.status(404).json({ message: 'Agendamento não encontrado' });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar agendamento' });
  }
};

export const getMessageSchedulesByConfigId = async (req: Request, res: Response) => {
  try {
    const data = await messageService.getMessageSchedulesByConfigId(Number(req.params.configId));
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar agendamentos' });
  }
};

export const getAllMessageConfigs = async (_req: Request, res: Response) => {
  try {
    const data = await messageService.getAllMessageConfigs();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar configurações de mensagens' });
  }
}; 