import { describe, it, expect, beforeEach, vi } from "vitest";
import request from "supertest";
import express, { Express } from "express";
import gameRoutes from "../../../src/routes/gameRoutes";
import { resetGameState, updateGameState } from "../../../src/store/gameStore";
import { PhaseDict } from "../../../src/types/dicts";

// Mock socket functions with side effects only
vi.mock("../../src/sockets/socket", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    broadcastGame: vi.fn(),
    setSocketServer: vi.fn(),
  };
});

describe("gameRoutes - Integration Tests", () => {
  let app: Express;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use("/", gameRoutes);
    resetGameState();
    vi.clearAllMocks();
  });

  describe("GET /", () => {
    it("should return Hello World", async () => {
      const response = await request(app).get("/");

      expect(response.status).toBe(200);
      expect(response.body).toBe("Hello World!");
    });
  });

  describe("GET /data", () => {
    it("should return current game data", async () => {
      const response = await request(app).get("/data");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("phase");
      expect(response.body).toHaveProperty("tables");
    });
  });

  describe("POST /init", () => {
    it("should initialize game with end time", async () => {
      const endTime = Date.now() + 10000;

      const response = await request(app)
        .post("/init")
        .send({ end: endTime });

      expect(response.status).toBe(200);
      expect(response.body.phase).toBe(PhaseDict.TABLES);
      expect(response.body.end).toBe(endTime);
    });
  });

  describe("POST /reset", () => {
    it("should reset game to initial state", async () => {
      // First modify the state
      updateGameState((data) => {
        data.phase = PhaseDict.ENEMY;
      });

      const response = await request(app).post("/reset");

      expect(response.status).toBe(200);
      expect(response.body.phase).toBe(PhaseDict.INIT);
    });
  });

  describe("POST /advance", () => {
    it("should advance game phase from SHIP_OPEN to ENEMY", async () => {
      updateGameState((data) => {
        data.phase = PhaseDict.SHIP_OPEN;
      });

      const response = await request(app).post("/advance");

      expect(response.status).toBe(200);
      expect(response.body.phase).toBe(PhaseDict.ENEMY);
    });

    it("should advance game phase from SUPER_WINER to SHIP_FALL", async () => {
      updateGameState((data) => {
        data.phase = PhaseDict.SUPER_WINER;
      });

      const response = await request(app).post("/advance");

      expect(response.status).toBe(200);
      expect(response.body.phase).toBe(PhaseDict.SHIP_FALL);
    });
  });

  describe("GET /heroes", () => {
    it("should return heroes data", async () => {
      const response = await request(app).get("/heroes");

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });
  });

  describe("POST /start-tables", () => {
    it("should start tables", async () => {
      const response = await request(app).post("/start-tables");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("phase");
    });
  });

  describe("POST /end", () => {
    it("should end game", async () => {
      const response = await request(app).post("/end");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("phase");
    });
  });

  describe("POST /uatu", () => {
    it("should change Uatu state with next=true", async () => {
      const response = await request(app)
        .post("/uatu")
        .send({ next: true });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("phase");
    });

    it("should change Uatu state with next=false", async () => {
      const response = await request(app)
        .post("/uatu")
        .send({ next: false });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("phase");
    });
  });

  describe("POST /aron", () => {
    it("should change Aron state with next=true", async () => {
      const response = await request(app)
        .post("/aron")
        .send({ next: true });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("phase");
    });
  });

  describe("POST /init-table", () => {
    it("should initialize a table with players", async () => {
      updateGameState((data) => {
        data.phase = PhaseDict.TABLES;
      });

      const response = await request(app)
        .post("/init-table")
        .send({
          table: 0,
          players: [
            { name: "Player 1", hero: "Iron Man" },
            { name: "Player 2", hero: "Thor" }
          ],
          expert: false
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("tables");
      expect(response.body.tables[0]).toHaveProperty("players");
    });

    it("should initialize a table with expert mode", async () => {
      updateGameState((data) => {
        data.phase = PhaseDict.TABLES;
      });

      const response = await request(app)
        .post("/init-table")
        .send({
          table: 0,
          players: [
            { name: "Player 1", hero: "Iron Man" }
          ],
          expert: true
        });

      expect(response.status).toBe(200);
      expect(response.body.tables[0].expert).toBe(true);
    });
  });

  describe("POST /reset-table", () => {
    it("should reset a specific table", async () => {
      updateGameState((data) => {
        data.phase = PhaseDict.TABLES;
        data.tables[0] = {
          players: [{ name: "Player 1", hero: "Iron Man" }],
          expert: false,
          superLife: 10,
          superPlan: 5,
          spiderWoman: 3,
          ship: true,
          enemy: 2,
          exposed: 1,
          complete: false
        };
      });

      const response = await request(app)
        .post("/reset-table")
        .send({ table: 0 });

      expect(response.status).toBe(200);
      expect(response.body.tables[0].superLife).toBe(0);
      expect(response.body.tables[0].superPlan).toBe(0);
      expect(response.body.tables[0].ship).toBe(false);
    });
  });

  describe("POST /super-life", () => {
    it("should update super life for a table", async () => {
      updateGameState((data) => {
        data.phase = PhaseDict.SUPER_LIFE;
        data.tables[0] = {
          players: [],
          expert: false,
          superLife: 0,
          superPlan: 0,
          spiderWoman: 0,
          ship: false,
          enemy: 0,
          exposed: 0,
          complete: false
        };
      });

      const response = await request(app)
        .post("/super-life")
        .send({ value: 5, table: 0 });

      expect(response.status).toBe(200);
      expect(response.body.tables[0].superLife).toBe(5);
    });
  });

  describe("POST /super-plan", () => {
    it("should update super plan for a table", async () => {
      updateGameState((data) => {
        data.phase = PhaseDict.SUPER_PLAN;
        data.tables[0] = {
          players: [],
          expert: false,
          superLife: 0,
          superPlan: 0,
          spiderWoman: 0,
          ship: false,
          enemy: 0,
          exposed: 0,
          complete: false
        };
      });

      const response = await request(app)
        .post("/super-plan")
        .send({ value: 3, table: 0 });

      expect(response.status).toBe(200);
      expect(response.body.tables[0].superPlan).toBe(3);
    });
  });

  describe("POST /spider-woman", () => {
    it("should update spider woman for a table", async () => {
      updateGameState((data) => {
        data.phase = PhaseDict.SPIDER_WOMAN;
        data.tables[0] = {
          players: [],
          expert: false,
          superLife: 0,
          superPlan: 0,
          spiderWoman: 0,
          ship: false,
          enemy: 0,
          exposed: 0,
          complete: false
        };
      });

      const response = await request(app)
        .post("/spider-woman")
        .send({ value: 2, table: 0 });

      expect(response.status).toBe(200);
      expect(response.body.tables[0].spiderWoman).toBe(2);
    });
  });

  describe("POST /ship", () => {
    it("should update ship status for a table", async () => {
      updateGameState((data) => {
        data.phase = PhaseDict.SHIP_OPEN;
        data.tables[0] = {
          players: [],
          expert: false,
          superLife: 0,
          superPlan: 0,
          spiderWoman: 0,
          ship: false,
          enemy: 0,
          exposed: 0,
          complete: false
        };
      });

      const response = await request(app)
        .post("/ship")
        .send({ table: 0 });

      expect(response.status).toBe(200);
      expect(response.body.tables[0].ship).toBe(true);
    });
  });

  describe("POST /enemy", () => {
    it("should update enemy for a table", async () => {
      updateGameState((data) => {
        data.phase = PhaseDict.ENEMY;
        data.tables[0] = {
          players: [],
          expert: false,
          superLife: 0,
          superPlan: 0,
          spiderWoman: 0,
          ship: false,
          enemy: 0,
          exposed: 0,
          complete: false
        };
      });

      const response = await request(app)
        .post("/enemy")
        .send({ value: 4, table: 0 });

      expect(response.status).toBe(200);
      expect(response.body.tables[0].enemy).toBe(4);
    });
  });

  describe("POST /exposed", () => {
    it("should update exposed for a table", async () => {
      updateGameState((data) => {
        data.phase = PhaseDict.EXPOSED;
        data.tables[0] = {
          players: [],
          expert: false,
          superLife: 0,
          superPlan: 0,
          spiderWoman: 0,
          ship: false,
          enemy: 0,
          exposed: 0,
          complete: false
        };
      });

      const response = await request(app)
        .post("/exposed")
        .send({ value: 3, table: 0 });

      expect(response.status).toBe(200);
      expect(response.body.tables[0].exposed).toBe(3);
    });
  });

  describe("POST /complete", () => {
    it("should complete Veranke for a table", async () => {
      updateGameState((data) => {
        data.phase = PhaseDict.VERANKE;
        data.tables[0] = {
          players: [],
          expert: false,
          superLife: 0,
          superPlan: 0,
          spiderWoman: 0,
          ship: false,
          enemy: 0,
          exposed: 0,
          complete: false
        };
      });

      const response = await request(app)
        .post("/complete")
        .send({ table: 0 });

      expect(response.status).toBe(200);
      expect(response.body.tables[0].complete).toBe(true);
    });
  });

  describe("Error handling", () => {
    it("should return 400 for invalid table number in /super-life", async () => {
      const response = await request(app)
        .post("/super-life")
        .send({ value: 5, table: 999 });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
    });

    it("should return 400 for invalid table number in /super-plan", async () => {
      const response = await request(app)
        .post("/super-plan")
        .send({ value: 5, table: 999 });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
    });

    it("should return 400 for invalid table number in /spider-woman", async () => {
      const response = await request(app)
        .post("/spider-woman")
        .send({ value: 5, table: 999 });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
    });

    it("should return 400 for invalid table number in /ship", async () => {
      const response = await request(app)
        .post("/ship")
        .send({ table: 999 });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
    });

    it("should return 400 for invalid table number in /enemy", async () => {
      const response = await request(app)
        .post("/enemy")
        .send({ value: 5, table: 999 });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
    });

    it("should return 400 for invalid table number in /exposed", async () => {
      const response = await request(app)
        .post("/exposed")
        .send({ value: 5, table: 999 });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
    });

    it("should return 400 for invalid table number in /complete", async () => {
      const response = await request(app)
        .post("/complete")
        .send({ table: 999 });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
    });

    it("should return 400 for invalid table number in /reset-table", async () => {
      const response = await request(app)
        .post("/reset-table")
        .send({ table: 999 });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
    });
  });
});
