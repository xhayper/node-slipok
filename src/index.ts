import { request, FormData } from "undici";
import {
  SlipCheckQuotaResponse,
  SlipCheckRequest,
  SlipCheckResponse,
} from "./types";

export class Client {
  #branchId: string;
  #apiKey: string;

  #baseUrl: string;

  constructor(branchId: string, apiKey: string) {
    this.#branchId = branchId;
    this.#apiKey = apiKey;
    this.#baseUrl = `https://api.slipok.com/api/line/apikey/${this.#branchId}`;
  }

  private request(
    subpath?: string,
    options?: Parameters<typeof request>[1],
  ): ReturnType<typeof request> {
    return request(this.#baseUrl + (subpath ?? ""), {
      ...options,
      headers: {
        ...options?.headers,
        "x-authorization": this.#apiKey,
        "User-Agent": "node-slipok/1.0.0",
      },
    });
  }

  public async checkSlip(
    data: string | Uint8Array,
    log?: boolean,
    amount?: number,
  ): Promise<SlipCheckResponse> {
    // @ts-expect-error
    let requestBody: SlipCheckRequest = {
      log,
      amount,
    };

    if (!requestBody.log) delete requestBody["log"];
    if (!requestBody.amount) delete requestBody["amount"];

    let req: Parameters<typeof request>[1] = {
      method: "POST",
    };

    if (typeof data === "string") {
      if (data.startsWith("http://") || data.startsWith("https://"))
        // @ts-expect-error
        requestBody.url = data;
      // @ts-expect-error
      else requestBody.data = data;

      req.body = JSON.stringify(requestBody);
      req.headers = {
        "Content-Type": "application/json",
      };
    } else {
      const formData = new FormData();
      for (const [key, value] of Object.entries(requestBody))
        formData.set(key, value);
      formData.set("files", new Blob([data]));
      req.body = formData;
    }

    const response = await this.request("", req).catch(() => {});
    if (!response) return { success: false };

    return (await response.body.json()) as SlipCheckResponse;
  }

  public async checkQuota(): Promise<SlipCheckQuotaResponse> {
    const response = await this.request("/quota").catch(() => null);

    if (response === null) return { success: false };

    return (await response.body.json()) as SlipCheckQuotaResponse;
  }
}

export {
  BankCode,
  BankAccount,
  SlipCheckRequest,
  SlipCheckResponse,
  SlipCheckQuotaResponse,
  SLIP_CHECK_ERROR_CODE,
} from "./types";
