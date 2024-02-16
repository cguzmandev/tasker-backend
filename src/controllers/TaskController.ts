import { Controller } from "./Controller";
import { Request, Response } from "express";
import { Task } from "../models/Task";
import { AppDataSource } from "../database/data-source";

// -----------------------------------------------------------------------------

export class TaskController implements Controller {
   async getAll(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const taskRepository = AppDataSource.getRepository(Task);

         let { page, skip } = req.query;

         let currentPage = page ? +page : 1;
         let itemsPerPage = skip ? +skip : 10;

         const [allTasks, count] = await taskRepository.findAndCount({
            skip: (currentPage - 1) * itemsPerPage,
            take: itemsPerPage,
            select: {
               title: true,
               priority: true,
            },
         });
         res.status(200).json({
            count,
            skip: itemsPerPage,
            page: currentPage,
            results: allTasks,
         });
      } catch (error) {
         res.status(500).json({
            message: "Error while getting tasks",
         });
      }
   }

   async getById(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const id = +req.params.id;

         const taskRepository = AppDataSource.getRepository(Task);
         const task = await taskRepository.findOne({
            where:{
               task_id: id
            },
            relations: {
               board: true
            }
         });

         if (!task) {
            return res.status(404).json({
               message: "Task not found",
            });
         }

         res.status(200).json(task);
      } catch (error) {
         res.status(500).json({
            message: "Error while getting task",
         });
      }
   }

   async create(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const data = req.body;

         const taskRepository = AppDataSource.getRepository(Task);

         const newTask = await taskRepository.save(data);
         
         res.status(201).json(newTask);
      } catch (error) {
         res.status(500).json({
            message: "Error while creating task",
         });
      }
   }

   async update(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const data = req.body;

         const taskRepository = AppDataSource.getRepository(Task);

         await taskRepository.save(data);

         res.status(202).json({
            message: "Task updated successfully",
         });
      } catch (error) {
         res.status(500).json({
            message: "Error while updating task" + error,
         });
      }
   }

   async delete(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const id = +req.params.id;

         const taskRepository = AppDataSource.getRepository(Task);
         await taskRepository.delete(id);

         res.status(200).json({
            message: "Task deleted successfully",
         });
      } catch (error) {
         res.status(500).json({
            message: "Error while deleting task",
         });
      }
   }
}
