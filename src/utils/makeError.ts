import { HttpStatus } from '@nestjs/common';

export enum ErrorLayerKind {
  REPOSITORY_ERROR = 'REPOSITORY_ERROR',
  SERVICE_ERROR = 'SERVICE_ERROR',
  CONTROLLER_ERROR = 'CONTROLLER_ERROR',
}

export interface MakeErrorProps {
  status: HttpStatus;
  message: string;
  layer: ErrorLayerKind;
}

export const makeError = (error: MakeErrorProps) => {
  return error;
};
