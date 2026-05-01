import { Router, Request, Response } from "express";
import { getData } from "../services/getData";
import { initGame } from "../services/initGame";
import { advanceGame } from "../services/advanceGame";
import { updateSuperLife } from "../services/updateSuperLife";
import { updateSuperPlan } from "../services/updateSuperPlan";
import { updateSpiderWoman } from "../services/updateSpiderWoman";
import { updateShip } from "../services/updateShip";
import { updateEnemy } from "../services/updateEnemy";
import { updateExposed } from "../services/updateExposed";
import { initTable } from "../services/initTable";
import { resetGame } from "../services/resetGame";
import { startTables } from "../services/startTables";
import { getHeroes } from "../services/getHeroes";
import { PlayerData } from "../types/PlayerData";
import { completeVeranke } from "../services/completeVeranke";
import { endGame } from "../services/endGame";
import { changeUatu } from "../services/changeUatu";
import { changeAron } from "../services/changeAron";
import { resetTable } from "../services/resetTable";

interface InitBody {
  players: number;
  end: number;
}

interface ValueBody {
  value: number;
}

interface TableWatcherBody {
  next: boolean;
}

interface TableNumberBody {
  table: number;
}

interface TableBody {
  table: number;
  players: PlayerData[];
  expert: boolean;
}

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.json("Hello World!");
});

router.get("/data", (_req: Request, res: Response) => {
  res.send(getData());
});

router.post("/init", (req: Request<InitBody>, res: Response) => {
  const { end } = req.body;
  res.send(initGame(end));
});

router.post("/reset", (_req: Request, res: Response) => {
  res.send(resetGame());
});

router.post("/init-table", (req: Request<TableBody>, res: Response) => {
  const { table, players, expert } = req.body;

  try {
    const data = initTable(table, players, expert);
    res.send(data);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/reset-table", (req: Request<TableNumberBody>, res: Response) => {
  const { table } = req.body;

  try {
    const data = resetTable(table);
    res.send(data);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/heroes", (_req: Request, res: Response) => {
  res.send(getHeroes());
});

router.post("/start-tables", (_req: Request, res: Response) => {
  res.send(startTables());
});

router.post("/advance", (_req: Request, res: Response) => {
  res.send(advanceGame());
});

router.post("/end", (_req: Request, res: Response) => {
  res.send(endGame());
});

router.post("/uatu", (req: Request<TableWatcherBody>, res: Response) => {
  const { next } = req.body;
  res.send(changeUatu(next));
});

router.post("/aron", (req: Request<TableWatcherBody>, res: Response) => {
  const { next } = req.body;
  res.send(changeAron(next));
});

router.post("/super-life", (req: Request<TableNumberBody, ValueBody>, res: Response) => {
  const { value, table } = req.body;

  try {
    res.send(updateSuperLife(value, table));
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: "Invalid table number" });
  }
});

router.post("/super-plan", (req: Request<TableNumberBody, ValueBody>, res: Response) => {
  const { value, table } = req.body;

  try {
    res.send(updateSuperPlan(value, table));
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: "Invalid table number" });
  }
});

router.post("/spider-woman", (req: Request<TableNumberBody, ValueBody>, res: Response) => {
  const { table, value } = req.body;

  try {
    res.send(updateSpiderWoman(value, table));
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: "Invalid table number" });
  }
});

router.post("/ship", (req: Request<TableNumberBody>, res: Response) => {
  const { table } = req.body;

  try {
    res.send(updateShip(table));
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: "Invalid table number" });
  }
});

router.post("/complete", (req: Request<TableNumberBody>, res: Response) => {
  const { table } = req.body;

  try {
    res.send(completeVeranke(table));
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: "Invalid table number" });
  }
});

router.post("/enemy", (req: Request<TableNumberBody, ValueBody>, res: Response) => {
  const { value, table } = req.body;

  try {
    res.send(updateEnemy(value, table));
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: "Invalid table number" });
  }
});

router.post("/exposed", (req: Request<TableNumberBody, ValueBody>, res: Response) => {
  const { value, table } = req.body;

  try {
    res.send(updateExposed(value, table));
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: "Invalid table number" });
  }
});

export default router;
