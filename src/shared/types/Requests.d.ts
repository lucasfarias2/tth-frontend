interface ICreateHabitRequest {
  name: string;
  starting_week: number;
}

interface IEditHabitRequest extends ICreateHabitRequest {
  id: string;
}
