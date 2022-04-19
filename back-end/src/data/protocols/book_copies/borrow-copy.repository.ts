export interface BorrowCopyRepository {
  borrow: (copyId: string, data: { locatedBy: string, devolutionDate: Date }) => Promise<void>
}
