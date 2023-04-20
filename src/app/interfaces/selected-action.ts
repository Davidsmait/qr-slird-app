export interface SelectedAction {
  data:{
    action: string,
    icon: string,
    placeholder: string,
    value: string | undefined,
    active: boolean
  },
  role: string | undefined
}
