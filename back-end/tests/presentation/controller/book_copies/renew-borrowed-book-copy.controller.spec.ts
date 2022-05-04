import { Controller } from "../../../../src/presentation/protocols/controller";
import { Validation } from "../../../../src/presentation/validation/protocols/validation";
import { RenewBookCopy } from "../../../../src/domain/usecases/book_copies/renew-book-copy";
import { bookCopyModelMock } from "../../../domain/mocks/bookCopy.mock";
import { BookCopyModel } from "../../../../src/domain/models/book_copy";
import {
    RenewBorrowedBookCopyController, RenewBorrowedBookCopyRequest
} from "../../../../src/presentation/controller/book_copies/renew-borrowed-book-copy.controller";
import { badRequest, serverError, ok } from "../../../../src/presentation/helpers/http-helper";

type SutType = {
    sut: Controller,
    validationStub: Validation,
    renewCopyStub: RenewBookCopy
}

class ValidationStub implements Validation {
    validate = (input: any): Error => undefined;
}

class RenewCopyStub implements RenewBookCopy {
    execute = (book_copy_id: string): Promise<BookCopyModel | Error> => Promise.resolve(bookCopyModelMock);
}

const makeSut = (): SutType => {
    const validationStub = new ValidationStub()
    const renewCopyStub = new RenewCopyStub()
    const sut = new RenewBorrowedBookCopyController(validationStub, renewCopyStub)
    return { sut, validationStub, renewCopyStub }
}

const mockRequest: RenewBorrowedBookCopyRequest = {
    book_copy_id: 'any_uuid'
}

describe('RenewBorrowedBookCopyController', () => {
    test('should call Validation with correct values', async () => {
        const { sut, validationStub } = makeSut()
        const validateSpy = jest.spyOn(validationStub, 'validate')
        await sut.handle(mockRequest)
        expect(validateSpy).toHaveBeenCalledWith(mockRequest)
    })
    test('should return badRequest response if validation fails', async () => {
        const { sut, validationStub } = makeSut()
        const error = new Error()
        jest.spyOn(validationStub, 'validate').mockReturnValueOnce(error)
        const result = await sut.handle(mockRequest)
        expect(result).toEqual(badRequest(error.message))
        expect(result.statusCode).toBe(400)
    })
    test('should call RenewCopy with correct values', async () => {
        const { sut, renewCopyStub } = makeSut()
        const renewCopySpy = jest.spyOn(renewCopyStub, 'execute')
        await sut.handle(mockRequest)
        expect(renewCopySpy).toHaveBeenCalledWith(mockRequest.book_copy_id)
    })
    test('should return badRequest response if RenewCopy fails', async () => {
        const { sut, renewCopyStub } = makeSut()
        const error = new Error()
        jest.spyOn(renewCopyStub, 'execute').mockReturnValueOnce(Promise.resolve(error))
        const result = await sut.handle(mockRequest)
        expect(result).toEqual(badRequest(error.message))
    })
    test('should return serverError if throws', async () => {
        const { sut, renewCopyStub } = makeSut()
        jest.spyOn(renewCopyStub, 'execute').mockImplementationOnce(() => {
            throw new Error()
        })
        const result = await sut.handle(mockRequest)
        expect(result).toEqual(serverError())
        expect(result.statusCode).toBe(500)
    })
    test('should return a BookCopy on success', async () => {
        const { sut } = makeSut()
        const result = await sut.handle(mockRequest)
        expect(result).toEqual(ok(bookCopyModelMock))
        expect(result.statusCode).toBe(200)
    })
})