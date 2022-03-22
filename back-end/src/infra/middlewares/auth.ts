import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

export const auth = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const token: string = req.headers?.['x-access-token'] as string
  if (!token) return res.status(401).json({ statusCode: 401, error: 'Unauthorized' })

  verify(token, process.env.SECRET_KEY, function (err, decoded: any) {
    if (err) return res.status(500).json({ statusCode: 500, error: 'Internal Server Error' })
    if (err?.message === 'invalid signature') return res.status(401).json({ statusCode: 401, error: 'Unauthorized' })
    next()
  })
}
