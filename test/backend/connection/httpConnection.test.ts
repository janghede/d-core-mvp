import { describe, it, expect } from "vitest";
import { AxiosInstance } from "axios";
import { httpConnection } from "@backend/connection/httpConnection.js";
import { IHttpConnectionConfig } from "@backend/interface/httpConnection.js";

describe("httpConnection", () => {
  it("should make a GET request", async () => {
    const httpConnectionConfig: IHttpConnectionConfig = { name: "test", baseUrl: "https://reqres.in/api" };
    const path = "/user/1";

    const mockResponse = {
      data: {
        id: 1,
        name: "cerulean",
        year: 2000,
        color: "#98B2D1",
        pantone_value: "15-4020",
      },
      support: {
        url: "https://contentcaddy.io?utm_source=reqres&utm_medium=json&utm_campaign=referral",
        text: "Tired of writing endless social media content? Let Content Caddy generate it for you.",
      },
    };

    const connection = new httpConnection(httpConnectionConfig.baseUrl);
    const response = await connection.get(path);
    expect(response.data).toEqual(mockResponse);
  });
});
