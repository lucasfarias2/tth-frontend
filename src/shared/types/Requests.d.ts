interface ICreateHabitRequest {
  name: string;
  starting_week: number;
  expected_effort: number;
  color: string;
}

interface IEditHabitRequest extends ICreateHabitRequest {
  id?: string;
}

interface ICreateEffortRequest {
  habit: number;
  week: number;
  level: number;
}

interface IEditEffortRequest extends ICreateEffortRequest {
  id?: string;
}
