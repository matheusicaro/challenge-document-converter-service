import { Request, Response, NextFunction } from "express";
import { CONTENT_TYPES_ACCEPTED } from "../app.constants";

export interface SeverRequest extends Request {
  rawBody: string;
}

/**
 * This is a middleware to parse the body when the content-type is "text/plain" or "application/xml".
 *
 * The reason is because Express uses bodyParser when the body is not being parsed properly for these content types.
 * With that, this middleware will intercept the request and parse the body to raw body only
 * when the content-type is "text/plain" or "application/xml",
 *
 * TODO: replace this for the correct config or setup in express when receiving a text/plain.
 *
 * @matheusicaro
 */
const bodyParseToRawBody = (request: SeverRequest, _response: Response, next: NextFunction) => {
  if (
    [CONTENT_TYPES_ACCEPTED.TEXT_PLAIN, CONTENT_TYPES_ACCEPTED.XML].includes(
      request.get("content-type"),
    )
  ) {
    request.setEncoding("utf8");

    let rawBody = "";

    request.on("data", (chunk) => {
      rawBody += chunk;
    });

    request.on("end", () => {
      request.body = rawBody;

      next();
    });
  } else {
    next();
  }
};

export { bodyParseToRawBody };
