import { Request, Response } from "express";

export function indexWelcome(req: Request, resp: Response): Response {
	return resp.json("bienvenido");
}
