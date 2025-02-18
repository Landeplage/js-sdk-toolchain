declare module '@decentraland/Identity' {
  export type ColorString = string

  export type Snapshots = {
    face: string
    face256: string
    face128: string
    body: string
  }

  export type AvatarForUserData = {
    bodyShape: WearableId
    skinColor: ColorString
    hairColor: ColorString
    eyeColor: ColorString
    wearables: WearableId[]
    snapshots: Snapshots
  }

  export type UserData = {
    displayName: string
    publicKey: string | null
    hasConnectedWeb3: boolean
    userId: string
    version: number
    avatar: AvatarForUserData
  }

  /**
   * Return the Ethereum address of the user
   */
  export function getUserPublicKey(): Promise<string | null>

  /**
   * Return the user's data
   */
  export function getUserData(): Promise<UserData | null>
}
