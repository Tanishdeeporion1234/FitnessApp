export interface FormValues {
    name: string;
    number: string;
    position: string;
    gender: string;
    address: string;
    agree: boolean;
  }
  
  export interface LoginProps {
    onLoginSuccess: () => void; 
  }
  
  export interface LoginState {
    navigate: boolean;
  }

  export interface FormValues {
    name: string;
    number: string;
    position: string;
    gender: string;
    address: string;
  }
  
  export interface User {
    name: string;
    number: string;
    position: string;
    gender: string;
    address: string;
  }
  
  export interface State {
    users: User[];
    openForm: boolean;
    openDetails: boolean;
    selectedUser: User | null;
    editMode: boolean;
    editingIndex: number | null;
  }
  export interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
  }
  
   export interface DashboardState {
    name: string;
    number: string;
    position: string;
    gender: string;
    address: string;
  }

  export interface ProfileProps {
    onSaveSuccess: () => void;
  }
  
  export interface ProfileState {
    navigate: boolean;
    initialValues: FormValues;
    isEditing: boolean;
  }
   // types.ts
export interface HeaderState {
    navigate: boolean;
    initialValues: {
      name: string;
      number: string;
      position: string;
      gender: string;
      address: string;
      agree: boolean;
    };
    isEditing: boolean;
    name: string; 
  }
  
  