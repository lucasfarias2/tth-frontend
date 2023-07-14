interface ICreateHabitRequest {
  name?: string;
  starting_week?: number;
  expected_effort?: number;
  color?: string;
  ending_week?: number | null;
}

interface ICreateTicketRequest {
  title: string;
  content: string;
  sender: string;
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

interface IEditTicketRequest {
  id?: string;
  status: TTHTicketStatus;
}

interface ICreateAnnouncementRequest {
  title: string;
  content: string;
  type: TTHAnnouncementType;
  starting_date: string;
  end_date: string;
}

interface ICreateFeatureRequest {
  title: string;
  status?: TTHFeatureStatus;
}

interface IEditAnnouncementRequest extends ICreateAnnouncementRequest {
  id?: string;
}

interface IEditFeatureRequest extends ICreateFeatureRequest {
  id?: string;
}
