import { RUNTIME_TR_ID } from "./InterfaceTypes";

export interface IMcaData {
  connectionStatus: SocketStatus;
  connectionTimestamp: number;
  authStatus: SocketAuth;
  mcaToken?: string;
}

export enum SocketStatus {
  CONNECTING = 0,
  CONNECT = 1,
  CLOSING = 2,
  DISCONNECT,
}

export enum SocketAuth {
  LOGOUT,
  LOGIN,
}

export interface IMcaContextValue {
  ws?: WebSocket | null;
  connect?(mcaToken?: string): void;
  reconnect?(mcaToken: string): void;
  close?(): void;
  onRequest(svc_cd: string, input: any): void;
  onSubscribe(input: any): void;
  onUnSubscribe(input: any): void;
}

export type SubscribeInputItem = {
  tr_id: RUNTIME_TR_ID;
  tr_key: string;
};
