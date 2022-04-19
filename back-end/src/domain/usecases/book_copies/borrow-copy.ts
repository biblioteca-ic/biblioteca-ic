export interface BorrowCopy {
	execute: (params: BorrowCopy.Params) => Promise<Error>
}

export namespace BorrowCopy {
	export type Params = {
		userId: string
		copyId: string
		bookId: string
	}
}


/**
 * Buscar historico do usuario (verificar se tem pendencias)
 * 
 */
