interface UserType {
  username: string
  avatar: string
}

interface AuthType extends UserType {
  id: number
  passcode: string
}

interface ColorTemplateType {
  background: string
  text: string
}

interface ChangeLogType {
  version: string //v1.02.03 // project phase, project update, patch/fix,
  date: string //yyyy-mm-dd,
  message: string
}

interface MessageType {
  date: string
  message: string
}

interface ChatType extends MessageType {
  user: UserType
}