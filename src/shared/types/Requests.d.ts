interface ICreateGoalRequest {
  name: string;
  year: number;
  color: string;
}

interface ICreateObjectiveRequest {
  name: string;
  goalId: string;
  quarter: number;
}

interface ICreateTaskRequest {
  name: string;
  objectiveId: string;
  effort: number;
}

interface IEditGoalRequest extends ICreateGoalRequest {
  id: string;
}

interface IEditObjectiveRequest extends ICreateObjectiveRequest {
  id: string;
}

interface IEditTaskRequest extends ICreateTaskRequest {
  id: string;
}
