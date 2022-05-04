export interface GiveBackCopy {
  giveBack: (params: GiveBackCopyParams) => Promise<void>
}

export type GiveBackCopyParams = {
  copyId: string
}
