export interface GiveBackCopyRepository {
  giveBackCopy: (copyId: string) => Promise<void>
}
