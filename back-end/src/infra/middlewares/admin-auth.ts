import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

export const adminAuth = (req: Request, res: Response, next: NextFunction): any => {
  const token: string = req.headers?.['x-access-token'] as string
  if (!token) return res.status(401).json({})

  verify(token, process.env.SECRET_KEY, function (err, decoded: any) {
    if (err) return res.status(500).json()
    if (!decoded.admin) return res.status(403).json({})
    next()
  })
}
