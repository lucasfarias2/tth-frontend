interface ICreateHabitRequest {
  name: string;
  starting_week: number;
  expected_effort: number;
  color: string;
}

interface IEditHabitRequest extends ICreateHabitRequest {
  id: string;
}
