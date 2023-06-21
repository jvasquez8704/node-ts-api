import request from 'supertest';
import Server from '../src/app'
import { TaskStatus } from '../src/models/task.model';
import { HttpStatusCode } from '../src/lib/enums';
const server = new Server();
const app = server.getApplication();

describe("GET api/tasks", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(app).get("/api/tasks").send();
      expect(response.statusCode).toBe(HttpStatusCode.Success);
    });
  
    test("should respond an array", async () => {
      const response = await request(app).get("/api/tasks").send();
      expect(response.body).toBeInstanceOf(Array);
    });
});

describe("GET api/task", () => {
    test("should respond with a 200 status code", async () => {
      const rightId = '-NY7YcjMAGd7u-XkKPrS';
      const response = await request(app).get(`/api/tasks/${rightId}`).send();
      expect(response.statusCode).toBe(HttpStatusCode.Success);
    });
  
    test("should respond with 404", async () => {
      const wrongId = '1234567890';
      const response = await request(app).get(`/api/tasks/${wrongId}`).send();
      expect(response.statusCode).toBe(HttpStatusCode.NotFound);
    });
});
  
describe("POST api/tasks", () => {
    describe("given a title and description", () => {
      const newTask = {
        title: "any task without status",
        description: "some description"
      };
        // should respond with a 200 code
      test("should respond with a 201 status code", async () => {
            const response = await request(app).post("/api/tasks").send(newTask);
            expect(response.statusCode).toBe(HttpStatusCode.Created);
      });

      // should respond a json as a content type
      test("should have a Content-Type: application/json header", async () => {
        const response = await request(app).post("/api/tasks").send(newTask);
        expect(response.headers["content-type"]).toEqual(
          expect.stringContaining("json")
        );
      });
  
      // shoud respond with a json object containing a status
      test("should respond with a status", async () => {
        const response = await request(app).post("/api/tasks").send(newTask);
        expect(response.body.status).toBeDefined();
      });

      test("should respond with an initial status", async () => {
        const response = await request(app).post("/api/tasks").send(newTask);
        expect(response.body.status).toBe(TaskStatus.ToDo);
      });
    });


  
    describe("when the title and description is missing", () => {
      // should respond with a 400 code
      test("shoud respond with a 400 status code", async () => {
        const fields = [
          { title: "some title without description" },
          { description: "some description without titlte" },
        ];
  
        for (const body of fields) {
          const response = await request(app).post("/api/tasks").send(body);
          expect(response.statusCode).toBe(400);
        }
      });
    });
});

describe("PUT api/task", () => {
    const updateTask = {
        status: TaskStatus.InProgress
      };
    test("should respond with a 204 status code", async () => {
      const id = '-NYQLMa2GO24UVwaTeru';
      const response = await request(app).put(`/api/tasks/${id}`).send(updateTask);
      expect(response.statusCode).toBe(HttpStatusCode.NoContent);
    });

    test("should respond with a 400 status code", async () => {
        const id = '-NYRLJnDISMVeEkMd-he';
        const wrongStatusTask = {
            status: 'guess'
          };
        const response = await request(app).put(`/api/tasks/${id}`).send(wrongStatusTask);
        expect(response.statusCode).toBe(HttpStatusCode.BadRequest);
    });
  
    test("should respond with 404", async () => {
      const wrongId = '1234567890';
      const response = await request(app).put(`/api/tasks/${wrongId}`).send(updateTask);
      expect(response.statusCode).toBe(HttpStatusCode.NotFound);
    });
});


describe("DELETE api/task", () => {
    test("should respond with a 200 status code", async () => {
      const rightId = '-NY7YLwgci-qzpLNfJLd';
      const response = await request(app).delete(`/api/tasks/${rightId}`).send();
      expect(response.statusCode).toBe(HttpStatusCode.Success);
    });
});
  