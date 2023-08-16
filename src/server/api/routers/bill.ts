import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

export const billRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.bill.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),

  create: protectedProcedure
    .input(z.object(
      { 
        firstName: z.string(), 
        lastName: z.string(), 
        address: z.string(), 
        hospitalName: z.string(), 
        dateOfService: z.string(), 
        billAmount: z.string(), 
      }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.bill.create({
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          address: input.address,
          hospitalName: input.hospitalName,
          dateOfService: input.dateOfService,
          billAmount: input.billAmount,
          userId: ctx.session.user.id,
        }
      })
  }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.bill.delete({
        where: {
          id: input.id,
        }
      })
  })
})