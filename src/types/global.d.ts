interface UserType {
  id: number
  name: string
  avatar: string
}

interface AuthType extends UserType {
  passcode: string
}

interface UserRoomType extends UserType {
  room: RoomType | null
}

interface UserRoomResponseType extends UserType {
  rooms_1: RoomUserType[]
  rooms_2: RoomUserType[]
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
  created_at: string
  message: string
}

interface ChatType extends MessageType {
  user: UserType
}

interface RoomType {
  name: string
  code: string
}

interface RoomUserType extends RoomType {
  participant: UserType | null
  participant_1_id: number | null
  participant_2_id: number | null
}

interface RoomUserResponseType extends RoomUserType {
  id: number
  room_messages: ChatType[]
  participant_1: UserType | null
  participant_2: UserType | null
}