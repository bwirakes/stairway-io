import { Status, Priority, ProjectCategory, ProjectStatus, AssetCategory, AccountStatus, AccountPlan } from '@prisma/client';

export interface Attachment {
  id: string;
  url: string;
  taskId: string;
}

export interface Task {
  id: string;
  title: string;
  creationDate: string; // ISO string
  deadline: string; // ISO string
  status: Status;
  priority: Priority;
  project: Project;
  owner: string; // This should be the User ID
  ownerId: string; // New field for owner ID
  notes?: string | ''; // Changed to string | null
  attachments?: Attachment[];
  projectId: string; // Already present
  accountId?: string | ''; // New field for account ID
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
}

export interface Project {
  id: string;
  name: string;
  startDate: string; // ISO string
  deadline: string; // ISO string
  status: ProjectStatus;
  projectCategory: ProjectCategory;
  description: string | null;
  ownerId: string;
  owner?: User; // Updated to reference User interface
  tasks?: Task[];
}

export interface ProjectWithTasks extends Project {
  tasks: Task[];
}

export interface Distribution {
  id: number;
  distribution_share_id?: number | null;
  heirs_id: number;
  account?: string | null;
  assets: AssetInformation[];
  asset_information_id: number;
  share_of_distribution: number;
  distribution_type: string;
  created_at: string; // ISO string
  updated_at: string; // ISO string
  heir: Heir[];
}

export interface Heir {
  id: number;
  first_name: string;
  middle_initial?: string;
  last_name: string;
  email: string;
  phone: string;
  ssn: string;
  street_address_1: string;
  street_address_2?: string;
  city: string;
  state: string;
  zipcode: string;
  target_percentage: number;
  relation: string;
  created_at: string; // ISO string
  updated_at: string; // ISO string
}

export interface Event {
  title: string;
  date: string; // e.g., '2024-10-05'
  description: string;
}

export interface AssetInformation {
  id: number;
  asset_name: string;
  account_id?: string | null;
  account_number?: string | null;
  financial_institution?: string | null;
  account_owner?: string | null;
  current_value: number;
  cost_basis: number;
  acquisition_date: string; // Changed to string to match Distribution interface
  attachments: Attachment[];
  attachment_id?: string | null;
  notes?: string;
  asset_category: AssetCategory;
  distribution_id?: number;
  distribution?: Distribution[];
  is_probate: boolean;
  sold: boolean;
  task_id?: number;
  asset_location?: string;
  user_id: string;
  asset_contact_number?: string;
  asset_contact_name?: string;
  asset_contact_email?: string;
  created_at: string; // Changed to string to match Distribution interface
  updated_at: string; // Changed to string to match Distribution interface
  account_status: AccountStatus;
  account_plan: AccountPlan;
}