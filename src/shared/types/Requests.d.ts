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

interface IUpdateUserRequest {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  old_password: string;
}
