import { Injectable } from "@nestjs/common";

@Injectable()
export class AppProvider {
  getHello() {
    return { hello: "world" };
  }
}
