export interface SelectedAction {
  data: Action,
  role: string | undefined
}

interface Action {
  action: string,
  icon: string,
  placeholder: string,
  value: string | number | undefined,
  active: boolean,
  formName: string
}
