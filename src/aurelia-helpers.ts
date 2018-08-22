import { NavigationInstruction } from 'aurelia-router';

export const getInstructionUrl = (instruction: NavigationInstruction): string => {
  const queryString = instruction.queryString
    ? `?${instruction.queryString}`
    : '';
  return instruction.fragment + queryString;
};
