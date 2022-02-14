import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { PrismaHelper } from '../db/prisma-helper'

export const adminAuth2 = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const token: string = req.headers?.['x-access-token'] as string
  const { id } = req.params
  if (!token) return res.status(401).json({})

  const user = await PrismaHelper.client.user.findFirst({
    where: { id }
  })

  verify(token, process.env.SECRET_KEY, function (err, decoded: any) {
    if (err) return res.status(500).json()
    if (!decoded.admin || decoded.email === user.email) return res.status(403).json({})
    next()
  })
}
