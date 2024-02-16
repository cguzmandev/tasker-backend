import { Controller } from "./Controller";
import { Request, Response } from "express";
import { Board } from "../models/Board";
import { AppDataSource } from "../database/data-source";

// -----------------------------------------------------------------------------

export class BoardController implements Controller {
   async getAll(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const boardRepository = AppDataSource.getRepository(Board);

         let { page, skip } = req.query;

         let currentPage = page ? +page : 1;
         let itemsPerPage = skip ? +skip : 10;

         const [allBoards, count] = await boardRepository.findAndCount({
            skip: (currentPage - 1) * itemsPerPage,
            take: itemsPerPage,
            select: {
               board_id: true,
               title: true
            },
         });
         res.status(200).json({
            count,
            skip: itemsPerPage,
            page: currentPage,
            results: allBoards,
         });
      } catch (error) {
         res.status(500).json({
            message: "Error while getting boards",
         });
      }
   }

   async getById(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const id = +req.params.id;

         const boardRepository = AppDataSource.getRepository(Board);
         const board = await boardRepository.findOne({
            where:{
               board_id: id
            },
            relations: {
               tasks: true,
               users:true,
               owner: true
            }
         });

         if (!board) {
            return res.status(404).json({
               message: "Board not found",
            });
         }

         res.status(200).json(board);
      } catch (error) {
         res.status(500).json({
            message: "Error while getting board",
         });
      }
   }

   async create(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const data = req.body;

         const boardRepository = AppDataSource.getRepository(Board);

         const newBoard = await boardRepository.save(data);
         
         res.status(201).json(newBoard);
      } catch (error) {
         res.status(500).json({
            message: "Error while creating board",
         });
      }
   }

   async update(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const data = req.body;

         const boardRepository = AppDataSource.getRepository(Board);

         await boardRepository.save(data);

         res.status(202).json({
            message: "Board updated successfully",
         });
      } catch (error) {
         res.status(500).json({
            message: "Error while updating board" + error,
         });
      }
   }

   async delete(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const id = +req.params.id;

         const boardRepository = AppDataSource.getRepository(Board);
         await boardRepository.delete(id);

         res.status(200).json({
            message: "Board deleted successfully",
         });
      } catch (error) {
         res.status(500).json({
            message: "Error while deleting board",
         });
      }
   }
}
